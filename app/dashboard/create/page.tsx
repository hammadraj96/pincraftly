"use client";

import React, { useState, useTransition } from "react";
import { generateAndSavePinsAction, updatePinDraftAction } from "./actions";
import { ExtractedArticle, GeneratedPinDraft } from "@/lib/extractBlog";

export default function CreatePinsPage() {
  const [url, setUrl] = useState("");
  const [pinCount, setPinCount] = useState<number>(3);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const [article, setArticle] = useState<ExtractedArticle | null>(null);
  const [drafts, setDrafts] = useState<GeneratedPinDraft[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editing state
  const [editingDraftIndex, setEditingDraftIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Schedule modal state
  const [schedulingDraft, setSchedulingDraft] = useState<GeneratedPinDraft | null>(null);
  const [scheduleDate, setScheduleDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid blog post URL.");
      return;
    }

    setError(null);
    setSuccessInfo(null);

    startTransition(async () => {
      const result = await generateAndSavePinsAction(url, pinCount);
      if (!result.success) {
        setError(result.error || "Failed to generate pins from URL.");
      } else {
        setArticle(result.article || null);
        setDrafts(result.drafts || []);
        setSuccessInfo(
          `Successfully extracted "${result.article?.title}" and created ${result.drafts?.length || 0} pin drafts in Supabase!`
        );
        showToast("✨ Drafts created & saved to Supabase!");
      }
    });
  };

  const handleStartEdit = (index: number) => {
    setEditingDraftIndex(index);
    setEditTitle(drafts[index].title);
    setEditDesc(drafts[index].description);
  };

  const handleSaveEdit = async (index: number) => {
    const draft = drafts[index];
    setSavingEdit(true);

    try {
      if (draft.id) {
        await updatePinDraftAction(draft.id, {
          title: editTitle,
          description: editDesc,
        });
      }

      setDrafts((prev) => {
        const next = [...prev];
        next[index] = {
          ...next[index],
          title: editTitle,
          description: editDesc,
        };
        return next;
      });

      setEditingDraftIndex(null);
      showToast("Draft updated successfully!");
    } catch (err) {
      console.error("Error saving draft update:", err);
      showToast("Could not update draft on server, changes kept locally.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDownload = (draft: GeneratedPinDraft) => {
    try {
      const a = document.createElement("a");
      a.href = draft.imageUrl;
      a.target = "_blank";
      a.download = `pincraftly-draft-${draft.pinNumber}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloading Pin #${draft.pinNumber} image...`);
    } catch {
      window.open(draft.imageUrl, "_blank");
      showToast(`Opened Pin #${draft.pinNumber} image in new tab`);
    }
  };

  const handleConfirmSchedule = () => {
    if (!schedulingDraft) return;
    showToast(`Pin #${schedulingDraft.pinNumber} queued for ${scheduleDate.replace("T", " ")}! (Placeholder)`);
    setSchedulingDraft(null);
  };

  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto", paddingBottom: "60px" }}>
      {/* Toast Banner */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            background: "#23222E",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(35, 34, 46, 0.25)",
            fontSize: "14px",
            fontWeight: 600,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#E60023",
            }}
          />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span
            style={{
              background: "#FFF0F1",
              color: "#E60023",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: "6px",
              letterSpacing: "0.06em",
            }}
          >
            URL to Pin Studio
          </span>
          <span style={{ fontSize: "13px", color: "#64748B" }}>
            No Pinterest API needed yet • 100% accurate article data
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', 'Google Sans', sans-serif",
            fontSize: "32px",
            fontWeight: 800,
            color: "#23222E",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          Create Pins from Blog URL
        </h1>
        <p style={{ margin: 0, fontSize: "15px", color: "#64748B", maxWidth: "680px" }}>
          Paste any public blog article or website post URL. PinCraftly extracts the headline, high-res photos, and key paragraphs to generate ready-to-publish Pinterest drafts.
        </p>
      </div>

      {/* Input Generator Form */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "18px",
          border: "1px solid #E2E8F0",
          padding: "28px",
          boxShadow: "0 4px 20px rgba(35, 34, 46, 0.04)",
          marginBottom: "36px",
        }}
      >
        <form onSubmit={handleGenerate}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label
                htmlFor="blog-url"
                style={{
                  display: "block",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#0F172A",
                  marginBottom: "8px",
                }}
              >
                Blog Post or Article URL
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    color: "#94A3B8",
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <input
                  id="blog-url"
                  type="url"
                  required
                  placeholder="https://yourblog.com/top-10-home-decor-trends"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 42px",
                    borderRadius: "12px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "14.5px",
                    color: "#23222E",
                    background: "#FAFAFA",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.15s ease, background 0.15s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#E60023";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#CBD5E1";
                    e.currentTarget.style.background = "#FAFAFA";
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              {/* Pin Count Selector (1-10) */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <label
                  htmlFor="pin-count"
                  style={{ fontSize: "13.5px", fontWeight: 700, color: "#334155" }}
                >
                  Number of Pins to Generate:
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <select
                    id="pin-count"
                    value={pinCount}
                    onChange={(e) => setPinCount(Number(e.target.value))}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #CBD5E1",
                      background: "#FFFFFF",
                      color: "#0F172A",
                      fontSize: "14px",
                      fontWeight: 700,
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Pin Draft" : "Pin Drafts"}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>
                    (1 - 10 pins)
                  </span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isPending}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "12px 28px",
                  borderRadius: "12px",
                  background: isPending ? "#FCA5A5" : "#E60023",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 700,
                  border: "none",
                  cursor: isPending ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 14px rgba(230, 0, 35, 0.25)",
                  transition: "all 0.15s ease",
                  minWidth: "190px",
                }}
                onMouseOver={(e) => {
                  if (!isPending) e.currentTarget.style.background = "#C4001D";
                }}
                onMouseOut={(e) => {
                  if (!isPending) e.currentTarget.style.background = "#E60023";
                }}
              >
                {isPending ? (
                  <>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid #FFFFFF",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <span>Extracting URL...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span>Generate Pins</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px 18px",
              borderRadius: "10px",
              background: "#FEF2F2",
              border: "1px solid #FCA5A5",
              color: "#991B1B",
              fontSize: "13.5px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Success Info Message */}
        {successInfo && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px 18px",
              borderRadius: "10px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              color: "#166534",
              fontSize: "13.5px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{successInfo}</span>
          </div>
        )}
      </div>

      {/* Extracted Article Context Card */}
      {article && (
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #E2E8F0",
            padding: "20px 24px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src={article.mainImage}
              alt={article.title}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "10px",
                objectFit: "cover",
                border: "1px solid #E2E8F0",
              }}
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span
                  style={{
                    background: "#F1F5F9",
                    color: "#475569",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  {article.domain}
                </span>
                <span style={{ fontSize: "12px", color: "#64748B" }}>
                  {article.images.length} article {article.images.length === 1 ? "image" : "images"} • {article.paragraphs.length} paragraphs
                </span>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "15.5px",
                  fontWeight: 700,
                  color: "#0F172A",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {article.title}
              </h3>
            </div>
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "13px",
              color: "#E60023",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>Visit Original Post</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}

      {/* Generated Pin Drafts Section */}
      {drafts.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#23222E",
                  margin: "0 0 4px",
                }}
              >
                Generated Pin Drafts ({drafts.length})
              </h2>
              <p style={{ margin: 0, fontSize: "14px", color: "#64748B" }}>
                Generated strictly from the article's own content. Stored as drafts in your Supabase database.
              </p>
            </div>
          </div>

          {/* Drafts Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {drafts.map((draft, idx) => {
              const isEditing = editingDraftIndex === idx;

              return (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "18px",
                    border: "1px solid #E2E8F0",
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(35, 34, 46, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                >
                  {/* Pin Image Container (Pinterest 2:3 vertical style) */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "2 / 3",
                      background: "#F1F5F9",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={draft.imageUrl}
                      alt={draft.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        // fallback placeholder if image has hotlink protection
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop";
                      }}
                    />

                    {/* Overlay Badges */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          background: "#E60023",
                          color: "#FFFFFF",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                      >
                        Pin #{draft.pinNumber}
                      </span>
                      <span
                        style={{
                          background: "rgba(35, 34, 46, 0.85)",
                          backdropFilter: "blur(4px)",
                          color: "#FFFFFF",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Draft
                      </span>
                    </div>

                    {draft.id && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          right: "12px",
                          background: "rgba(255, 255, 255, 0.92)",
                          backdropFilter: "blur(4px)",
                          color: "#0F172A",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "6px",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        Supabase ID: #{draft.id}
                      </div>
                    )}
                  </div>

                  {/* Pin Content Details */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    {isEditing ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#64748B", marginBottom: "4px" }}>
                            Pin Title
                          </label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              borderRadius: "8px",
                              border: "1.5px solid #E60023",
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#23222E",
                              outline: "none",
                              fontFamily: "inherit",
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#64748B", marginBottom: "4px" }}>
                            Pin Description
                          </label>
                          <textarea
                            rows={4}
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              borderRadius: "8px",
                              border: "1.5px solid #E60023",
                              fontSize: "13px",
                              color: "#334155",
                              outline: "none",
                              fontFamily: "inherit",
                              resize: "vertical",
                            }}
                          />
                        </div>
                        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(idx)}
                            disabled={savingEdit}
                            style={{
                              flex: 1,
                              padding: "8px",
                              borderRadius: "8px",
                              background: "#E60023",
                              color: "#FFFFFF",
                              border: "none",
                              fontSize: "13px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            {savingEdit ? "Saving..." : "Save Draft"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingDraftIndex(null)}
                            style={{
                              padding: "8px 14px",
                              borderRadius: "8px",
                              background: "#F1F5F9",
                              color: "#475569",
                              border: "none",
                              fontSize: "13px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3
                          style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#0F172A",
                            margin: "0 0 10px",
                            lineHeight: 1.35,
                          }}
                        >
                          {draft.title}
                        </h3>
                        <p
                          style={{
                            margin: "0 0 18px",
                            fontSize: "13.5px",
                            color: "#475569",
                            lineHeight: 1.5,
                            flex: 1,
                          }}
                        >
                          {draft.description}
                        </p>
                      </>
                    )}

                    {/* Action Buttons: Edit, Download, Schedule */}
                    {!isEditing && (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "8px",
                          paddingTop: "14px",
                          borderTop: "1px solid #F1F5F9",
                        }}
                      >
                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleStartEdit(idx)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            padding: "8px 10px",
                            borderRadius: "8px",
                            border: "1px solid #E2E8F0",
                            background: "#FFFFFF",
                            color: "#0F172A",
                            fontSize: "12.5px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "#F8FAFC";
                            e.currentTarget.style.borderColor = "#CBD5E1";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "#FFFFFF";
                            e.currentTarget.style.borderColor = "#E2E8F0";
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                          <span>Edit</span>
                        </button>

                        {/* Download Button */}
                        <button
                          type="button"
                          onClick={() => handleDownload(draft)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            padding: "8px 10px",
                            borderRadius: "8px",
                            border: "1px solid #E2E8F0",
                            background: "#FFFFFF",
                            color: "#0F172A",
                            fontSize: "12.5px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "#F8FAFC";
                            e.currentTarget.style.borderColor = "#CBD5E1";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "#FFFFFF";
                            e.currentTarget.style.borderColor = "#E2E8F0";
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          <span>Download</span>
                        </button>

                        {/* Schedule Button */}
                        <button
                          type="button"
                          onClick={() => setSchedulingDraft(draft)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            padding: "8px 10px",
                            borderRadius: "8px",
                            border: "1px solid #FFE4E6",
                            background: "#FFF0F1",
                            color: "#E60023",
                            fontSize: "12.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "#FFE3E6";
                            e.currentTarget.style.borderColor = "#FECDD3";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "#FFF0F1";
                            e.currentTarget.style.borderColor = "#FFE4E6";
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>Schedule</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Schedule Modal Placeholder (Doesn't break the page) */}
      {schedulingDraft && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(35, 34, 46, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#FFF0F1",
                  color: "#E60023",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#23222E",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                Schedule Pin #{schedulingDraft.pinNumber}
              </h3>
            </div>

            <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#64748B" }}>
              Choose when this draft should be published to your Pinterest board. (Queue preview mode)
            </p>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Target Publication Date &amp; Time
              </label>
              <input
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid #CBD5E1",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setSchedulingDraft(null)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "8px",
                  background: "#F1F5F9",
                  color: "#475569",
                  border: "none",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSchedule}
                style={{
                  padding: "9px 18px",
                  borderRadius: "8px",
                  background: "#E60023",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
