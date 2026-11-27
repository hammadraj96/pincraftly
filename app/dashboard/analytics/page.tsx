import React from "react";
import Link from "next/link";
import { getAnalyticsAction } from "./actions";

export const metadata = {
  title: "Analytics | PinCraftly",
  description: "Real-time analytics and pin inventory metrics from your Supabase database.",
};

export default async function AnalyticsPage() {
  const result = await getAnalyticsAction();
  const data = result.data;

  const formatDate = (isoString?: string) => {
    if (!isoString) return "Recently";
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", paddingBottom: "60px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
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
            Database Insights
          </span>
          <span style={{ fontSize: "13px", color: "#64748B" }}>
            Real counts directly from Supabase • Zero simulated metrics
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "30px",
            fontWeight: 800,
            color: "#23222E",
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}
        >
          Performance &amp; Inventory Analytics
        </h1>
        <p style={{ margin: 0, fontSize: "14.5px", color: "#64748B", maxWidth: "680px" }}>
          Live metrics from your Supabase pins, boards, and websites tables.
        </p>
      </div>

      {!data || !data.hasData ? (
        /* No Data Yet View (User Requirement 2: If there is no data yet, show "No data yet" instead of fake charts) */
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px dashed #CBD5E1",
            padding: "70px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "#FFF0F1",
              color: "#E60023",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
            }}
          >
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <h2
            style={{
              margin: "0 0 8px",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "22px",
              fontWeight: 800,
              color: "#0F172A",
            }}
          >
            No data yet
          </h2>
          <p
            style={{
              margin: "0 auto 24px",
              fontSize: "14.5px",
              color: "#64748B",
              maxWidth: "460px",
              lineHeight: 1.5,
            }}
          >
            Your Supabase tables do not contain any pins or boards yet. Create your first pin draft or add a board to see real metrics here.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/dashboard/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "10px",
                background: "#E60023",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(230, 0, 35, 0.25)",
              }}
            >
              <span>Create Pins from URL</span>
            </Link>
            <Link
              href="/dashboard/boards"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "10px",
                background: "#F1F5F9",
                color: "#334155",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <span>Manage Boards</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* Real Metrics Grid (User Requirement 2: total pins, drafts, scheduled, published, total boards, total websites) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "18px",
              marginBottom: "32px",
            }}
          >
            {/* Total Pins */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(35, 34, 46, 0.03)",
              }}
            >
              <span style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                Total Pins
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "32px", fontWeight: 800, color: "#0F172A", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {data.totalPins}
                </span>
                <span style={{ fontSize: "12px", color: "#64748B" }}>in DB</span>
              </div>
            </div>

            {/* Draft Pins */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #FFE4E6",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(35, 34, 46, 0.03)",
              }}
            >
              <span style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#E60023", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                Drafts
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "32px", fontWeight: 800, color: "#E60023", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {data.draftsCount}
                </span>
                <span style={{ fontSize: "12px", color: "#E60023", fontWeight: 600 }}>Ready</span>
              </div>
            </div>

            {/* Scheduled Pins */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #BFDBFE",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(35, 34, 46, 0.03)",
              }}
            >
              <span style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                Scheduled
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "32px", fontWeight: 800, color: "#2563EB", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {data.scheduledCount}
                </span>
                <span style={{ fontSize: "12px", color: "#2563EB", fontWeight: 600 }}>Queued</span>
              </div>
            </div>

            {/* Published Pins */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #BBF7D0",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(35, 34, 46, 0.03)",
              }}
            >
              <span style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                Published
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "32px", fontWeight: 800, color: "#16A34A", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {data.publishedCount}
                </span>
                <span style={{ fontSize: "12px", color: "#16A34A", fontWeight: 600 }}>Live</span>
              </div>
            </div>

            {/* Total Boards */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(35, 34, 46, 0.03)",
              }}
            >
              <span style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                Total Boards
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "32px", fontWeight: 800, color: "#0F172A", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {data.totalBoards}
                </span>
                <span style={{ fontSize: "12px", color: "#64748B" }}>boards</span>
              </div>
            </div>

            {/* Total Websites */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(35, 34, 46, 0.03)",
              }}
            >
              <span style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                Total Websites
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontSize: "32px", fontWeight: 800, color: "#0F172A", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {data.totalWebsites}
                </span>
                <span style={{ fontSize: "12px", color: "#64748B" }}>linked</span>
              </div>
            </div>
          </div>

          {/* 5 Most Recent Pins (User Requirement 2) */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid #E2E8F0",
              padding: "24px 28px",
              boxShadow: "0 2px 10px rgba(35, 34, 46, 0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0 0 4px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0F172A",
                  }}
                >
                  Recent Pins (Latest {data.recentPins.length})
                </h3>
                <p style={{ margin: 0, fontSize: "13.5px", color: "#64748B" }}>
                  The 5 most recent pins created or modified in your workspace.
                </p>
              </div>

              <Link
                href="/dashboard/pins"
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#E60023",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>View All Pins</span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>

            {data.recentPins.length === 0 ? (
              <p style={{ margin: "16px 0", color: "#64748B", fontSize: "14px" }}>
                No recent pins recorded.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {data.recentPins.map((pin) => {
                  const isDraft = pin.status === "draft";
                  const isScheduled = pin.status === "scheduled";
                  const isPublished = pin.status === "published";

                  return (
                    <div
                      key={pin.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        background: "#F8FAFC",
                        border: "1px solid #F1F5F9",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: "260px", flex: 2 }}>
                        {pin.image_url ? (
                          <img
                            src={pin.image_url}
                            alt={pin.title}
                            style={{
                              width: "44px",
                              height: "64px",
                              borderRadius: "6px",
                              objectFit: "cover",
                              border: "1px solid #E2E8F0",
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "44px",
                              height: "64px",
                              borderRadius: "6px",
                              background: "#E2E8F0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "16px",
                              flexShrink: 0,
                            }}
                          >
                            📌
                          </div>
                        )}

                        <div>
                          <b style={{ display: "block", fontSize: "14.5px", color: "#0F172A", marginBottom: "3px" }}>
                            {pin.title}
                          </b>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#64748B" }}>
                            <span>Pin #{pin.id}</span>
                            <span>•</span>
                            <span>Board: {pin.board_name}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            background: isPublished
                              ? "#F0FDF4"
                              : isScheduled
                              ? "#EFF6FF"
                              : isDraft
                              ? "#FFF0F1"
                              : "#F1F5F9",
                            color: isPublished
                              ? "#16A34A"
                              : isScheduled
                              ? "#2563EB"
                              : isDraft
                              ? "#E60023"
                              : "#64748B",
                            border: isPublished
                              ? "1px solid #BBF7D0"
                              : isScheduled
                              ? "1px solid #BFDBFE"
                              : isDraft
                              ? "1px solid #FECDD3"
                              : "1px solid #E2E8F0",
                          }}
                        >
                          {pin.status}
                        </span>

                        <span style={{ fontSize: "12.5px", color: "#94A3B8", minWidth: "90px", textAlign: "right" }}>
                          {formatDate(pin.created_at)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
