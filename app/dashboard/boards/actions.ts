"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface BoardWithCount {
  id: string;
  name: string;
  description: string | null;
  privacy: string;
  account_id: string | null;
  is_pinterest_linked: boolean;
  pinterest_board_id: string | null;
  pin_count: number;
  created_at: string;
  updated_at?: string;
}

/**
 * Fetch all boards from Supabase, computing real pin counts per board.
 */
export async function getBoardsAction() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to manage boards.", boards: [] };
    }

    // 1. Fetch boards from boards table
    const { data: boardsData, error: boardsError } = await supabase
      .from("boards")
      .select("*")
      .order("created_at", { ascending: false });

    if (boardsError) {
      console.error("Error fetching boards:", boardsError);
      return { success: false, error: boardsError.message, boards: [] };
    }

    // 2. Fetch all pins to calculate real pin counts
    const { data: pinsData } = await supabase
      .from("pins")
      .select("id, board_id");

    const pinCountMap = new Map<string, number>();
    (pinsData || []).forEach((p: any) => {
      if (p.board_id) {
        const key = String(p.board_id);
        pinCountMap.set(key, (pinCountMap.get(key) || 0) + 1);
      }
    });

    const boards: BoardWithCount[] = (boardsData || []).map((b: any) => {
      const isLinked = !!(b.account_id || /^\d{15,22}$/.test(String(b.id)));
      return {
        id: String(b.id),
        name: b.name,
        description: b.description || null,
        privacy: b.privacy || "PUBLIC",
        account_id: b.account_id || null,
        is_pinterest_linked: isLinked,
        pinterest_board_id: isLinked ? String(b.id) : null,
        pin_count: pinCountMap.get(String(b.id)) || 0,
        created_at: b.created_at || new Date().toISOString(),
        updated_at: b.updated_at,
      };
    });

    return { success: true, boards };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load boards";
    return { success: false, error: message, boards: [] };
  }
}

/**
 * Create a new board in Supabase boards table.
 */
export async function createBoardAction(name: string) {
  try {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return { success: false, error: "Board name is required." };
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to create boards." };
    }

    // Generate unique board ID (Pinterest-style numeric string or local ID)
    const newBoardId = `board_${Date.now()}`;

    const { data: newBoard, error: insertError } = await supabase
      .from("boards")
      .insert({
        id: newBoardId,
        name: trimmedName,
        privacy: "PUBLIC",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error creating board in Supabase:", insertError);
      return { success: false, error: insertError.message };
    }

    revalidatePath("/dashboard/boards");
    revalidatePath("/dashboard/pins");
    revalidatePath("/dashboard/scheduler");
    revalidatePath("/dashboard/analytics");

    return { success: true, board: newBoard };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create board";
    return { success: false, error: message };
  }
}

/**
 * Edit a board name in Supabase.
 */
export async function updateBoardAction(boardId: string, name: string) {
  try {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return { success: false, error: "Board name cannot be empty." };
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to edit boards." };
    }

    const { data: updatedBoard, error: updateError } = await supabase
      .from("boards")
      .update({
        name: trimmedName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", boardId)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating board in Supabase:", updateError);
      return { success: false, error: updateError.message };
    }

    revalidatePath("/dashboard/boards");
    revalidatePath("/dashboard/pins");
    revalidatePath("/dashboard/scheduler");
    revalidatePath("/dashboard/analytics");

    return { success: true, board: updatedBoard };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update board";
    return { success: false, error: message };
  }
}

/**
 * Delete a board from Supabase with safety guarantee:
 * Deleting a board must NOT delete its pins — sets their board_id to null (or '' if not-null constraint active).
 */
export async function deleteBoardAction(boardId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to delete boards." };
    }

    // 1. Unlink pins belonging to this board (DO NOT DELETE THE PINS)
    try {
      const nullRes = await supabase
        .from("pins")
        .update({
          board_id: null,
          updated_at: new Date().toISOString(),
        })
        .eq("board_id", boardId);

      // If pins.board_id has a NOT NULL constraint, fallback to empty string
      if (nullRes.error && nullRes.error.code === "23502") {
        await supabase
          .from("pins")
          .update({
            board_id: "",
            updated_at: new Date().toISOString(),
          })
          .eq("board_id", boardId);
      }
    } catch (unlinkErr) {
      console.warn("Unlinking pins notice:", unlinkErr);
    }

    // 2. Delete the board row from boards table
    const { error: deleteError } = await supabase
      .from("boards")
      .delete()
      .eq("id", boardId);

    if (deleteError) {
      console.error("Error deleting board from Supabase:", deleteError);
      return { success: false, error: deleteError.message };
    }

    revalidatePath("/dashboard/boards");
    revalidatePath("/dashboard/pins");
    revalidatePath("/dashboard/scheduler");
    revalidatePath("/dashboard/analytics");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete board";
    return { success: false, error: message };
  }
}
