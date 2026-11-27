"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ScheduleItem {
  id: string | number;
  pin_id: number;
  pin_title: string;
  pin_image: string;
  pin_link?: string | null;
  board_id: string;
  board_name: string;
  scheduled_time: string;
  status: "scheduled" | "published" | "cancelled";
  created_at?: string;
}

export interface DraftPinOption {
  id: number;
  title: string;
  image_url: string;
  board_id: string;
  status: string;
  created_at: string;
}

export interface BoardOption {
  id: string;
  name: string;
}

/**
 * Fetch all schedules (or scheduled pins) and draft pins available to schedule.
 */
export async function getSchedulesAction() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "Please log in to view schedules.",
        schedules: [],
        draftPins: [],
        boards: [],
      };
    }

    // 1. Fetch Boards
    const { data: boardsData } = await supabase
      .from("boards")
      .select("id, name");

    const boards: BoardOption[] = (boardsData || []).map((b) => ({
      id: String(b.id),
      name: b.name,
    }));
    const boardMap = new Map<string, string>();
    boards.forEach((b) => boardMap.set(b.id, b.name));

    // 2. Fetch all Pins
    const { data: allPins, error: pinsError } = await supabase
      .from("pins")
      .select("*")
      .order("created_at", { ascending: false });

    if (pinsError) {
      console.error("Error fetching pins for scheduler:", pinsError);
      return {
        success: false,
        error: pinsError.message,
        schedules: [],
        draftPins: [],
        boards,
      };
    }

    const pinsList = allPins || [];
    const pinMap = new Map<number, any>();
    pinsList.forEach((p) => pinMap.set(p.id, p));

    // 3. Draft pins available to be scheduled
    const draftPins: DraftPinOption[] = pinsList
      .filter((p) => p.status === "draft")
      .map((p) => ({
        id: p.id,
        title: p.title,
        image_url: p.image_url,
        board_id: p.board_id,
        status: p.status,
        created_at: p.created_at,
      }));

    // 4. Schedules: Attempt to read from schedules table first
    let schedules: ScheduleItem[] = [];
    let schedulesTableExists = false;

    try {
      const { data: schedulesData, error: schedError } = await supabase
        .from("schedules")
        .select("*")
        .order("scheduled_time", { ascending: true });

      if (!schedError && schedulesData) {
        schedulesTableExists = true;
        schedules = schedulesData.map((s: any) => {
          const matchedPin = pinMap.get(Number(s.pin_id));
          return {
            id: s.id,
            pin_id: Number(s.pin_id),
            pin_title: matchedPin?.title || s.title || `Pin #${s.pin_id}`,
            pin_image: matchedPin?.image_url || s.image_url || "",
            pin_link: matchedPin?.link || null,
            board_id: String(s.board_id || matchedPin?.board_id || ""),
            board_name: boardMap.get(String(s.board_id || matchedPin?.board_id)) || "Default Board",
            scheduled_time: s.scheduled_time || s.scheduled_at || new Date().toISOString(),
            status: s.status || "scheduled",
            created_at: s.created_at,
          };
        });
      }
    } catch {
      schedulesTableExists = false;
    }

    // If schedules table doesn't exist or is empty, extract from scheduled pins
    if (!schedulesTableExists || schedules.length === 0) {
      const scheduledPins = pinsList.filter(
        (p) => p.status === "scheduled" || p.status === "cancelled" || p.scheduled_at
      );

      schedules = scheduledPins.map((p) => ({
        id: `pin-${p.id}`,
        pin_id: p.id,
        pin_title: p.title,
        pin_image: p.image_url,
        pin_link: p.link,
        board_id: String(p.board_id),
        board_name: boardMap.get(String(p.board_id)) || "Default Board",
        scheduled_time: p.scheduled_at || p.created_at,
        status: (p.status as any) || "scheduled",
        created_at: p.created_at,
      }));
    }

    return {
      success: true,
      schedules,
      draftPins,
      boards,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load schedules";
    return {
      success: false,
      error: message,
      schedules: [],
      draftPins: [],
      boards: [],
    };
  }
}

/**
 * Schedule a draft pin:
 * 1. Updates pin in Supabase pins table to status 'scheduled' and sets scheduled_at.
 * 2. Saves/records in schedules table if present.
 */
export async function schedulePinAction(
  pinId: number | string,
  boardId: string,
  scheduledTime: string
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to schedule pins." };
    }

    const isoDate = new Date(scheduledTime).toISOString();

    // 1. Update pin in pins table
    const { data: updatedPin, error: pinUpdateError } = await supabase
      .from("pins")
      .update({
        board_id: boardId,
        status: "scheduled",
        scheduled_at: isoDate,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pinId)
      .select()
      .single();

    if (pinUpdateError) {
      console.error("Error updating pin schedule:", pinUpdateError);
      return { success: false, error: pinUpdateError.message };
    }

    // 2. Attempt to save to schedules table
    try {
      await supabase.from("schedules").insert({
        pin_id: Number(pinId),
        board_id: boardId,
        scheduled_time: isoDate,
        status: "scheduled",
        created_at: new Date().toISOString(),
      });
    } catch (schedErr) {
      console.warn("schedules table record notice:", schedErr);
    }

    revalidatePath("/dashboard/scheduler");
    revalidatePath("/dashboard/pins");

    return { success: true, pin: updatedPin };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to schedule pin";
    return { success: false, error: message };
  }
}

/**
 * Cancel a scheduled pin:
 * 1. Sets schedule status to 'cancelled'.
 * 2. Reverts the pin in pins table to 'draft' and clears scheduled_at.
 */
export async function cancelScheduleAction(
  pinId: number | string,
  scheduleId?: string | number
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to cancel schedules." };
    }

    // 1. Revert pin in pins table to 'draft'
    const { error: pinError } = await supabase
      .from("pins")
      .update({
        status: "draft",
        scheduled_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pinId);

    if (pinError) {
      console.error("Error reverting pin to draft:", pinError);
      return { success: false, error: pinError.message };
    }

    // 2. Update schedules table to status 'cancelled'
    try {
      if (scheduleId && typeof scheduleId === "number") {
        await supabase
          .from("schedules")
          .update({ status: "cancelled", updated_at: new Date().toISOString() })
          .eq("id", scheduleId);
      } else {
        await supabase
          .from("schedules")
          .update({ status: "cancelled", updated_at: new Date().toISOString() })
          .eq("pin_id", pinId);
      }
    } catch (schedErr) {
      console.warn("schedules cancel update notice:", schedErr);
    }

    revalidatePath("/dashboard/scheduler");
    revalidatePath("/dashboard/pins");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to cancel schedule";
    return { success: false, error: message };
  }
}
