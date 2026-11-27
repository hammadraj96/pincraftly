"use server";

import { createClient } from "@/lib/supabase/server";
import {
  extractArticleFromUrl,
  generatePinDraftsFromArticle,
  ExtractedArticle,
  GeneratedPinDraft,
} from "@/lib/extractBlog";

export interface GenerateResult {
  success: boolean;
  error?: string;
  article?: ExtractedArticle;
  drafts?: GeneratedPinDraft[];
  savedCount?: number;
}

export async function generateAndSavePinsAction(
  rawUrl: string,
  pinCount: number = 3
): Promise<GenerateResult> {
  try {
    const supabase = await createClient();

    // 1. Authenticate user via RLS server client
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "You must be signed in to create pins. Please log in and try again.",
      };
    }

    // 2. Fetch and extract data from the blog URL server-side
    const article = await extractArticleFromUrl(rawUrl);

    // 3. Generate pin drafts using extracted data only — no invented content
    const rawDrafts = generatePinDraftsFromArticle(article, pinCount);

    // 4. Check or create websites row for this blog URL
    let websiteId: string | number | null = null;
    try {
      const { data: existingWebsite, error: findError } = await supabase
        .from("websites")
        .select("id")
        .eq("url", article.url)
        .maybeSingle();

      if (!findError && existingWebsite) {
        websiteId = existingWebsite.id;
      } else if (!findError) {
        // Attempt to create websites row linked to the logged-in user
        const { data: createdWebsite, error: insertWebError } = await supabase
          .from("websites")
          .insert({
            url: article.url,
            user_id: user.id,
          })
          .select("id")
          .maybeSingle();

        if (!insertWebError && createdWebsite) {
          websiteId = createdWebsite.id;
        }
      }
    } catch (webErr) {
      console.warn("Websites table lookup/insert notice:", webErr);
    }

    // 5. Look up default board_id from boards table (required by pins constraint)
    let boardId = "1100919140101483497";
    try {
      const { data: boards } = await supabase
        .from("boards")
        .select("id, name")
        .limit(1);

      if (boards && boards.length > 0 && boards[0].id) {
        boardId = String(boards[0].id);
      }
    } catch (boardErr) {
      console.warn("Boards table lookup notice:", boardErr);
    }

    // 6. Save drafts to Supabase pins table with status 'draft'
    const savedDrafts: GeneratedPinDraft[] = [];

    for (const draft of rawDrafts) {
      const pinPayload: Record<string, any> = {
        title: draft.title,
        description: draft.description,
        link: article.url,
        image_url: draft.imageUrl,
        board_id: boardId,
        status: "draft",
      };

      // If user_id or website_id can be associated
      if (user?.id) pinPayload.user_id = user.id;
      if (websiteId) pinPayload.website_id = websiteId;

      let { data: insertedPin, error: insertPinError } = await supabase
        .from("pins")
        .insert(pinPayload)
        .select()
        .single();

      // If user_id or website_id columns don't exist in schema cache (PGRST204),
      // retry with the existing table columns
      if (insertPinError && insertPinError.code === "PGRST204") {
        delete pinPayload.user_id;
        delete pinPayload.website_id;
        const retry = await supabase
          .from("pins")
          .insert(pinPayload)
          .select()
          .single();

        insertedPin = retry.data;
        insertPinError = retry.error;
      }

      if (insertPinError) {
        console.error("Pins table insert error:", insertPinError.message);
        // Include draft in preview even if table insert had a constraint warning
        savedDrafts.push(draft);
      } else if (insertedPin) {
        savedDrafts.push({
          ...draft,
          id: insertedPin.id,
        });
      }
    }

    return {
      success: true,
      article,
      drafts: savedDrafts,
      savedCount: savedDrafts.filter((d) => d.id !== undefined).length,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate pins from URL";
    console.error("Error in generateAndSavePinsAction:", err);
    return {
      success: false,
      error: message,
    };
  }
}

export async function updatePinDraftAction(
  pinId: number | string,
  updates: { title?: string; description?: string; imageUrl?: string }
) {
  try {
    const supabase = await createClient();
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (updates.title !== undefined) updatePayload.title = updates.title;
    if (updates.description !== undefined) updatePayload.description = updates.description;
    if (updates.imageUrl !== undefined) updatePayload.image_url = updates.imageUrl;

    const { data, error } = await supabase
      .from("pins")
      .update(updatePayload)
      .eq("id", pinId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, pin: data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update draft";
    return { success: false, error: message };
  }
}
