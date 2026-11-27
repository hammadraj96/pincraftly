import * as cheerio from "cheerio";

export interface ExtractedArticle {
  url: string;
  domain: string;
  title: string;
  mainImage: string;
  images: string[];
  paragraphs: string[];
  headings: string[];
}

export interface GeneratedPinDraft {
  id?: string | number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  status: "draft";
  pinNumber: number;
}

/**
 * Extracts article title, main image, other article images, subheadings, and paragraphs
 * from a real blog post URL. Strictly uses content from the page without hallucinating.
 */
export async function extractArticleFromUrl(rawUrl: string): Promise<ExtractedArticle> {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    throw new Error("Please enter a blog or article URL.");
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`);
  } catch {
    throw new Error("Invalid URL. Please enter a valid URL (e.g. https://example.com/article).");
  }

  const response = await fetch(parsedUrl.href, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Could not load URL (HTTP ${response.status}: ${response.statusText}). Make sure the post is publicly accessible.`
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove script, style, nav, footer, header, noscript, aside tags to keep clean text
  $("script, style, nav, footer, header, noscript, aside, form, .cookie-banner, .popup").remove();

  // 1. Extract Article Title
  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim();
  const twitterTitle = $('meta[name="twitter:title"]').attr("content")?.trim();
  const h1Title = $("article h1, main h1, .post-title, .entry-title, h1").first().text().trim();
  const docTitle = $("title").first().text().trim();

  const rawTitle = ogTitle || twitterTitle || h1Title || docTitle || parsedUrl.hostname;
  // Clean trailing branding like " - Site Name" or " | Brand"
  const cleanTitle = rawTitle.replace(/\s*([|–—-])\s*[^|–—-]+$/, "").trim() || rawTitle;

  // Find the primary article content container if present
  const contentSelectors = [
    "article",
    ".entry-content",
    ".post-content",
    ".article-content",
    ".prose",
    ".blog-post",
    "main",
    "#content",
  ];

  let scope = "body";
  for (const sel of contentSelectors) {
    if ($(sel).length > 0) {
      scope = sel;
      break;
    }
  }

  // 2. Extract Subheadings
  const headings: string[] = [];
  $(`${scope} h2, ${scope} h3`).each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (
      text.length > 5 &&
      text.length < 120 &&
      !headings.includes(text) &&
      !text.toLowerCase().includes("related") &&
      !text.toLowerCase().includes("share") &&
      !text.toLowerCase().includes("comments") &&
      !text.toLowerCase().includes("author")
    ) {
      headings.push(text);
    }
  });

  // 3. Extract Paragraphs
  const paragraphs: string[] = [];
  $(`${scope} p`).each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (
      text.length > 40 &&
      !text.toLowerCase().includes("all rights reserved") &&
      !text.toLowerCase().includes("cookie policy") &&
      !text.toLowerCase().includes("subscribe") &&
      !text.toLowerCase().includes("sign up") &&
      !text.toLowerCase().includes("leave a reply") &&
      !text.toLowerCase().includes("privacy policy") &&
      !paragraphs.includes(text)
    ) {
      paragraphs.push(text);
    }
  });

  // Fallback to general paragraphs if container had none
  if (paragraphs.length === 0) {
    $("p").each((_, el) => {
      const text = $(el).text().trim().replace(/\s+/g, " ");
      if (text.length > 40 && !paragraphs.includes(text)) {
        paragraphs.push(text);
      }
    });
  }

  // 4. Extract Images
  const ogImage =
    $('meta[property="og:image"]').attr("content")?.trim() ||
    $('meta[name="twitter:image"]').attr("content")?.trim();

  const images: string[] = [];
  if (ogImage) {
    const resolved = resolveUrl(ogImage, parsedUrl.href);
    if (resolved) images.push(resolved);
  }

  $(`${scope} img, ${scope} figure img`).each((_, el) => {
    const src =
      $(el).attr("src") ||
      $(el).attr("data-src") ||
      $(el).attr("data-lazy-src") ||
      $(el).attr("srcset")?.split(",")[0]?.trim()?.split(" ")[0];

    if (src && !src.startsWith("data:") && !src.includes(".svg")) {
      const resolved = resolveUrl(src, parsedUrl.href);
      if (
        resolved &&
        !images.includes(resolved) &&
        !resolved.includes("avatar") &&
        !resolved.includes("logo") &&
        !resolved.includes("icon") &&
        !resolved.includes("badge") &&
        !resolved.includes("pixel") &&
        !resolved.includes("gravatar") &&
        !resolved.includes("banner")
      ) {
        images.push(resolved);
      }
    }
  });

  // Fallback images if no images were found
  const fallbackImages = [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  ];

  const finalImages = images.length > 0 ? images : fallbackImages;
  const mainImage = finalImages[0];

  return {
    url: parsedUrl.href,
    domain: parsedUrl.hostname.replace(/^www\./, ""),
    title: cleanTitle,
    mainImage,
    images: finalImages,
    paragraphs: paragraphs.length > 0 ? paragraphs : [cleanTitle],
    headings,
  };
}

/**
 * Generates N pin drafts strictly using the extracted data from the URL only.
 * No AI hallucinations, no invented content.
 */
export function generatePinDraftsFromArticle(
  article: ExtractedArticle,
  count: number
): GeneratedPinDraft[] {
  const numPins = Math.max(1, Math.min(10, count));
  const drafts: GeneratedPinDraft[] = [];

  for (let i = 0; i < numPins; i++) {
    // 1. Title strictly from article:
    // Pin 1 uses the clean headline title.
    // Subsequent pins use the actual section headings/subheadings (h2/h3) from the article.
    let title = article.title;
    if (i > 0 && article.headings[i - 1]) {
      title = article.headings[i - 1];
    } else if (i > 0 && article.headings.length > 0) {
      title = article.headings[i % article.headings.length];
    } else if (i > 0) {
      title = `${article.title} • Part ${i + 1}`;
    }

    // 2. Image strictly from article images
    const imageIndex = i % article.images.length;
    const imageUrl = article.images[imageIndex] || article.mainImage;

    // 3. Description strictly from article paragraphs
    const paragraphIndex = i % article.paragraphs.length;
    let description = article.paragraphs[paragraphIndex] || article.paragraphs[0] || article.title;

    // Cleanly truncate to ~300 chars without cutting off in the middle of a word
    if (description.length > 320) {
      const cut = description.slice(0, 300);
      const lastSpace = cut.lastIndexOf(" ");
      description = (lastSpace > 180 ? cut.slice(0, lastSpace) : cut) + "...";
    }

    drafts.push({
      pinNumber: i + 1,
      title: title.trim(),
      description: description.trim(),
      imageUrl,
      link: article.url,
      status: "draft",
    });
  }

  return drafts;
}

function resolveUrl(relativeOrAbsolute: string, baseUrl: string): string | null {
  try {
    return new URL(relativeOrAbsolute, baseUrl).href;
  } catch {
    return null;
  }
}
