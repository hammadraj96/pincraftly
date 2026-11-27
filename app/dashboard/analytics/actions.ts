"use server";

import { createClient } from "@/lib/supabase/server";

export interface AnalyticsData {
  totalPins: number;
  draftsCount: number;
  scheduledCount: number;
  publishedCount: number;
  totalBoards: number;
  totalWebsites: number;
  recentPins: {
    id: number;
    title: string;
    image_url: string;
    status: string;
    board_name: string;
    created_at: string;
  }[];
  hasData: boolean;
}

/**
 * Fetch real counts and metrics from Supabase tables only — zero invented numbers.
 */
export async function getAnalyticsAction(): Promise<{
  success: boolean;
  error?: string;
  data?: AnalyticsData;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Please log in to view analytics." };
    }

    // 1. Fetch Boards
    const { data: boardsData } = await supabase
      .from("boards")
      .select("id, name");

    const boardsList = boardsData || [];
    const boardMap = new Map<string, string>();
    boardsList.forEach((b) => boardMap.set(String(b.id), b.name));
    const totalBoards = boardsList.length;

    // 2. Fetch Pins
    const { data: pinsData, error: pinsError } = await supabase
      .from("pins")
      .select("id, title, image_url, board_id, status, created_at")
      .order("created_at", { ascending: false });

    if (pinsError) {
      console.error("Error fetching pins for analytics:", pinsError);
      return { success: false, error: pinsError.message };
    }

    const pins = pinsData || [];
    const totalPins = pins.length;
    const draftsCount = pins.filter((p) => p.status === "draft").length;
    const scheduledCount = pins.filter((p) => p.status === "scheduled").length;
    const publishedCount = pins.filter((p) => p.status === "published").length;

    // 5 Most Recent Pins
    const recentPins = pins.slice(0, 5).map((p) => ({
      id: p.id,
      title: p.title,
      image_url: p.image_url,
      status: p.status || "draft",
      board_name: boardMap.get(String(p.board_id)) || "Default Board",
      created_at: p.created_at,
    }));

    // 3. Fetch Websites count (safe fallback if table not yet created)
    let totalWebsites = 0;
    try {
      const { data: websitesData, error: webError } = await supabase
        .from("websites")
        .select("id", { count: "exact" });

      if (!webError && websitesData) {
        totalWebsites = websitesData.length;
      }
    } catch {
      totalWebsites = 0;
    }

    const hasData = totalPins > 0 || totalBoards > 0 || totalWebsites > 0;

    return {
      success: true,
      data: {
        totalPins,
        draftsCount,
        scheduledCount,
        publishedCount,
        totalBoards,
        totalWebsites,
        recentPins,
        hasData,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load analytics";
    return { success: false, error: message };
  }
}
