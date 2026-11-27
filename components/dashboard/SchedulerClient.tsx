"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ScheduleItem,
  DraftPinOption,
  BoardOption,
  schedulePinAction,
  cancelScheduleAction,
} from "@/app/dashboard/scheduler/actions";

interface SchedulerClientProps {
  initialSchedules: ScheduleItem[];
  draftPins: DraftPinOption[];
  boards: BoardOption[];
}

export default function SchedulerClient({
  initialSchedules,
  draftPins: initialDraftPins,
  boards,
}: SchedulerClientProps) {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules);
  const [draftPins, setDraftPins] = useState<DraftPinOption[]>(initialDraftPins);
  const [activeTab, setActiveTab] = useState<"all" | "scheduled" | "published" | "cancelled">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Schedule Modal Form State
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedPinId, setSelectedPinId] = useState<number | null>(
    initialDraftPins[0]?.id || null
  );
  const [selectedBoardId, setSelectedBoardId] = useState<string>(
    boards[0]?.id || "1100919140101483497"
  );
  const [scheduleDateTime, setScheduleDateTime] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const handleOpenScheduleModal = (preselectedPinId?: number) => {
    if (preselectedPinId) {
      setSelectedPinId(preselectedPinId);
    } else if (draftPins.length > 0) {
      setSelectedPinId(draftPins[0].id);
    }
    setScheduleDateTime(new Date(Date.now() + 86400000).toISOString().slice(0, 16));
    setScheduleModalOpen(true);
  };

  const handleSubmitSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPinId) {
      showToast("Please select a draft pin to schedule.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await schedulePinAction(selectedPinId, selectedBoardId, scheduleDateTime);
      if (result.success) {
        const pinObj = draftPins.find((p) => p.id === selectedPinId);
        const boardObj = boards.find((b) => b.id === selectedBoardId);

        const newSchedule: ScheduleItem = {
          id: `sched-${Date.now()}`,
          pin_id: selectedPinId,
          pin_title: pinObj?.title || `Pin #${selectedPinId}`,
          pin_image: pinObj?.image_url || "",
          board_id: selectedBoardId,
          board_name: boardObj?.name || "Pinterest Board",
          scheduled_time: new Date(scheduleDateTime).toISOString(),
          status: "scheduled",
          created_at: new Date().toISOString(),
        };

        setSchedules((prev) => [newSchedule, ...prev.filter((s) => s.pin_id !== selectedPinId)]);
        setDraftPins((prev) => prev.filter((p) => p.id !== selectedPinId));
        setScheduleModalOpen(false);
        showToast("✨ Pin scheduled successfully! Updated in Supabase.");
      } else {
        showToast(result.error || "Failed to schedule pin.");
      }
    } catch {
      showToast("Error processing schedule request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSchedule = async (item: ScheduleItem) => {
    setCancellingId(item.id);
    try {
      const result = await cancelScheduleAction(item.pin_id, item.id);
      if (result.success) {
        // Revert schedule item status to 'cancelled'
        setSchedules((prev) =>
          prev.map((s) => (s.id === item.id ? { ...s, status: "cancelled" } : s))
        );

        // Put pin back into draftPins list
        setDraftPins((prev) => [
          {
            id: item.pin_id,
            title: item.pin_title,
            image_url: item.pin_image,
            board_id: item.board_id,
            status: "draft",
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);

        showToast(`Schedule cancelled. Pin #${item.pin_id} reverted to draft.`);
      } else {
        showToast(result.error || "Failed to cancel schedule.");
      }
    } catch {
      showToast("Error cancelling schedule.");
    } finally {
      setCancellingId(null);
    }
  };

  const formatScheduledTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  const filteredSchedules = schedules.filter((s) => {
    if (activeTab === "all") return true;
    return s.status.toLowerCase() === activeTab;
  });

  const countActive = schedules.filter((s) => s.status === "scheduled").length;
  const countPublished = schedules.filter((s) => s.status === "published").length;
  const countCancelled = schedules.filter((s) => s.status === "cancelled").length;

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", paddingBottom: "60px" }}>
      {/* Toast Notification */}
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

      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <div>
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
              Smart Queue
            </span>
            <span style={{ fontSize: "13px", color: "#64748B" }}>
              Automated spacing &amp; queue control
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "30px",
              fontWeight: 800,
              color: "#23222E",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Pinterest Scheduler
          </h1>
        </div>

        <button
          type="button"
          onClick={() => handleOpenScheduleModal()}
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
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(230, 0, 35, 0.25)",
            transition: "background 0.15s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#C4001D";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#E60023";
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="12" y1="14" x2="12" y2="18" />
            <line x1="10" y1="16" x2="14" y2="16" />
          </svg>
          <span>Schedule a Draft Pin</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "18px 22px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
            Scheduled in Queue
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
            <span style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {countActive}
            </span>
            <span style={{ fontSize: "12px", color: "#16A34A", fontWeight: 700 }}>Active</span>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "18px 22px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
            Draft Pins Available
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
            <span style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {draftPins.length}
            </span>
            <span style={{ fontSize: "12px", color: "#E60023", fontWeight: 700 }}>Ready</span>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid #E2E8F0", padding: "18px 22px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>
            Destination Boards
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
            <span style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {boards.length}
            </span>
            <span style={{ fontSize: "12px", color: "#64748B" }}>Connected</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          padding: "8px 12px",
          marginBottom: "20px",
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "all", label: "All Schedules", count: schedules.length },
          { id: "scheduled", label: "Scheduled", count: countActive },
          { id: "published", label: "Published", count: countPublished },
          { id: "cancelled", label: "Cancelled", count: countCancelled },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background: isActive ? "#FFF0F1" : "transparent",
                color: isActive ? "#E60023" : "#64748B",
                fontSize: "13.5px",
                fontWeight: isActive ? 700 : 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "1px 6px",
                  borderRadius: "999px",
                  background: isActive ? "#E60023" : "#F1F5F9",
                  color: isActive ? "#FFFFFF" : "#64748B",
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Schedules List / Table */}
      {filteredSchedules.length === 0 ? (
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px dashed #CBD5E1",
            padding: "50px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#FFF0F1",
              color: "#E60023",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>
            {activeTab !== "all"
              ? `No ${activeTab} schedules found`
              : "Your schedule queue is empty"}
          </h3>
          <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#64748B", maxWidth: "420px", marginInline: "auto" }}>
            {draftPins.length > 0
              ? `You have ${draftPins.length} draft pins ready to be scheduled!`
              : "Generate pin drafts first from any blog post URL, then schedule them here."}
          </p>

          {draftPins.length > 0 ? (
            <button
              type="button"
              onClick={() => handleOpenScheduleModal()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "10px",
                background: "#E60023",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              Schedule a Draft Pin Now
            </button>
          ) : (
            <Link
              href="/dashboard/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "10px",
                background: "#E60023",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Create New Pins
            </Link>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {filteredSchedules.map((item) => {
            const isScheduled = item.status === "scheduled";
            const isPublished = item.status === "published";
            const isCancelled = item.status === "cancelled";
            const isCancelling = cancellingId === item.id;

            return (
              <div
                key={item.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid #E2E8F0",
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "18px",
                  boxShadow: "0 2px 8px rgba(35, 34, 46, 0.03)",
                }}
              >
                {/* Left: Pin Image & Title */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: "280px", flex: 2 }}>
                  {item.pin_image ? (
                    <img
                      src={item.pin_image}
                      alt={item.pin_title}
                      style={{
                        width: "60px",
                        height: "90px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        border: "1px solid #E2E8F0",
                        flexShrink: 0,
                      }}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "60px",
                        height: "90px",
                        borderRadius: "8px",
                        background: "#F1F5F9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#94A3B8",
                        flexShrink: 0,
                      }}
                    >
                      📌
                    </div>
                  )}

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#64748B",
                          background: "#F1F5F9",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        Pin #{item.pin_id}
                      </span>
                      {item.pin_link && (
                        <a
                          href={item.pin_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "11.5px", color: "#E60023", textDecoration: "none" }}
                        >
                          Source URL ↗
                        </a>
                      )}
                    </div>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#0F172A",
                        lineHeight: 1.35,
                      }}
                    >
                      {item.pin_title}
                    </h3>
                  </div>
                </div>

                {/* Center: Board Info */}
                <div style={{ minWidth: "160px", flex: 1 }}>
                  <span style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: "3px" }}>
                    Destination Board
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#E60023" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    <b style={{ fontSize: "14px", color: "#0F172A" }}>{item.board_name}</b>
                  </div>
                </div>

                {/* Right: Scheduled Time & Status */}
                <div style={{ minWidth: "180px", flex: 1 }}>
                  <span style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", marginBottom: "3px" }}>
                    Scheduled Time
                  </span>
                  <b style={{ fontSize: "13.5px", color: "#0F172A", display: "block" }}>
                    {formatScheduledTime(item.scheduled_time)}
                  </b>
                </div>

                {/* Status Badge */}
                <div style={{ minWidth: "110px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "11.5px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      background: isPublished
                        ? "#F0FDF4"
                        : isScheduled
                        ? "#EFF6FF"
                        : "#F1F5F9",
                      color: isPublished
                        ? "#16A34A"
                        : isScheduled
                        ? "#2563EB"
                        : "#64748B",
                      border: isPublished
                        ? "1px solid #BBF7D0"
                        : isScheduled
                        ? "1px solid #BFDBFE"
                        : "1px solid #E2E8F0",
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Actions: Cancel Action (User Requirement 2) */}
                <div style={{ minWidth: "120px", textAlign: "right" }}>
                  {isScheduled && (
                    <button
                      type="button"
                      onClick={() => handleCancelSchedule(item)}
                      disabled={isCancelling}
                      style={{
                        padding: "7px 14px",
                        borderRadius: "8px",
                        border: "1px solid #FEE2E2",
                        background: "#FEF2F2",
                        color: "#DC2626",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: isCancelling ? "not-allowed" : "pointer",
                        transition: "all 0.15s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#FEE2E2";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "#FEF2F2";
                      }}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Schedule"}
                    </button>
                  )}

                  {isCancelled && (
                    <button
                      type="button"
                      onClick={() => handleOpenScheduleModal(item.pin_id)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: "8px",
                        border: "1px solid #FFE4E6",
                        background: "#FFF0F1",
                        color: "#E60023",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Reschedule
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule Draft Pin Modal (User Requirement 2: Add Schedule form on a draft pin) */}
      {scheduleModalOpen && (
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
              borderRadius: "18px",
              padding: "28px",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                <h3 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px", fontWeight: 800 }}>
                  Schedule Pin
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setScheduleModalOpen(false)}
                style={{ border: "none", background: "transparent", color: "#94A3B8", cursor: "pointer", fontSize: "20px" }}
              >
                ✕
              </button>
            </div>

            {draftPins.length === 0 ? (
              <div style={{ padding: "20px 0", textAlign: "center" }}>
                <p style={{ margin: "0 0 16px", color: "#64748B", fontSize: "14px" }}>
                  No draft pins are currently available to schedule. Generate pins first from any blog URL.
                </p>
                <Link
                  href="/dashboard/create"
                  style={{
                    display: "inline-flex",
                    padding: "9px 18px",
                    borderRadius: "8px",
                    background: "#E60023",
                    color: "#FFFFFF",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Create New Pins
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmitSchedule}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "22px" }}>
                  {/* Draft Pin Selector */}
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      Select Draft Pin
                    </label>
                    <select
                      value={selectedPinId || ""}
                      onChange={(e) => setSelectedPinId(Number(e.target.value))}
                      required
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid #CBD5E1",
                        fontSize: "14px",
                        outline: "none",
                        background: "#FFFFFF",
                      }}
                    >
                      {draftPins.map((d) => (
                        <option key={d.id} value={d.id}>
                          Pin #{d.id}: {d.title.length > 45 ? d.title.slice(0, 45) + "..." : d.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Destination Board Picker */}
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      Destination Board
                    </label>
                    <select
                      value={selectedBoardId}
                      onChange={(e) => setSelectedBoardId(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid #CBD5E1",
                        fontSize: "14px",
                        outline: "none",
                        background: "#FFFFFF",
                      }}
                    >
                      {boards.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Scheduled Date & Time */}
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      Publication Date and Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={scheduleDateTime}
                      onChange={(e) => setScheduleDateTime(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid #CBD5E1",
                        fontSize: "14px",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setScheduleModalOpen(false)}
                    disabled={isSubmitting}
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
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: "9px 20px",
                      borderRadius: "8px",
                      background: "#E60023",
                      color: "#FFFFFF",
                      border: "none",
                      fontSize: "13.5px",
                      fontWeight: 700,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? "Scheduling..." : "Save to Schedule"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
