"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface PinItem {
  id: number;
  title: string;
  description: string | null;
  link: string | null;
  image_url: string;
  board_id: string;
  board_name?: string;
  status: "draft" | "scheduled" | "published" | "cancelled";
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export interface BoardItem {
  id: string;
  name: string;
  description?: string;
  privacy?: string;
}

/**
 * Fetch all pins for the current logged-in user, newest first.
 * Joins board names from boards table.
 */
export async function getPinsAction(statusFilter?: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to view your pins.", pins: [], boards: [] };
    }

    // 1. Fetch boards for lookup mapping
    const { data: boardsData } = await supabase
      .from("boards")
      .select("id, name, description, privacy");

    const boards: BoardItem[] = boardsData || [];
    const boardMap = new Map<string, string>();
    boards.forEach((b) => boardMap.set(String(b.id), b.name));

    // 2. Fetch pins
    let query = supabase
      .from("pins")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data: pinsData, error: pinsError } = await query;

    if (pinsError) {
      console.error("Error fetching pins:", pinsError);
      return { success: false, error: pinsError.message, pins: [], boards };
    }

    const pins: PinItem[] = (pinsData || []).map((p: any) => ({
      ...p,
      board_name: boardMap.get(String(p.board_id)) || "Default Board",
    }));

    return {
      success: true,
      pins,
      boards,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load pins";
    return { success: false, error: message, pins: [], boards: [] };
  }
}

/**
 * Update a pin draft or pin details (title, description, board).
 */
export async function updatePinAction(
  pinId: number | string,
  updates: {
    title?: string;
    description?: string;
    board_id?: string;
    status?: "draft" | "scheduled" | "published" | "cancelled";
  }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to update pins." };
    }

    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (updates.title !== undefined) payload.title = updates.title.trim();
    if (updates.description !== undefined) payload.description = updates.description.trim();
    if (updates.board_id !== undefined) payload.board_id = updates.board_id;
    if (updates.status !== undefined) payload.status = updates.status;

    const { data, error } = await supabase
      .from("pins")
      .update(payload)
      .eq("id", pinId)
      .select()
      .single();

    if (error) {
      console.error("Error updating pin:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/dashboard/pins");
    revalidatePath("/dashboard/scheduler");
    return { success: true, pin: data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update pin";
    return { success: false, error: message };
  }
}

/**
 * Delete a pin from Supabase after user confirmation.
 */
export async function deletePinAction(pinId: number | string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to delete pins." };
    }

    // 1. Delete matching schedules row if schedules table exists
    try {
      await supabase.from("schedules").delete().eq("pin_id", pinId);
    } catch {
      // schedules table may not exist
    }

    // 2. Delete from pins table
    const { error } = await supabase.from("pins").delete().eq("id", pinId);

    if (error) {
      console.error("Error deleting pin:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/dashboard/pins");
    revalidatePath("/dashboard/scheduler");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete pin";
    return { success: false, error: message };
  }
}
