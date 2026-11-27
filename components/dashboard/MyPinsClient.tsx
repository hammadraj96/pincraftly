"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { PinItem, BoardItem, updatePinAction, deletePinAction } from "@/app/dashboard/pins/actions";
import { schedulePinAction } from "@/app/dashboard/scheduler/actions";

interface MyPinsClientProps {
  initialPins: PinItem[];
  boards: BoardItem[];
}

export default function MyPinsClient({ initialPins, boards }: MyPinsClientProps) {
  const [pins, setPins] = useState<PinItem[]>(initialPins);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit Modal State
  const [editingPin, setEditingPin] = useState<PinItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editBoardId, setEditBoardId] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete Confirmation Modal State
  const [deletingPin, setDeletingPin] = useState<PinItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Quick Schedule Modal State
  const [schedulingPin, setSchedulingPin] = useState<PinItem | null>(null);
  const [scheduleBoardId, setScheduleBoardId] = useState<string>(
    boards[0]?.id || "1100919140101483497"
  );
  const [scheduleDateTime, setScheduleDateTime] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );
  const [isScheduling, setIsScheduling] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Filter logic
  const filteredPins = pins.filter((p) => {
    const matchesFilter =
      activeFilter === "all" ? true : p.status.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const countAll = pins.length;
  const countDrafts = pins.filter((p) => p.status === "draft").length;
  const countScheduled = pins.filter((p) => p.status === "scheduled").length;
  const countPublished = pins.filter((p) => p.status === "published").length;

  // Edit Handlers
  const handleOpenEdit = (pin: PinItem) => {
    setEditingPin(pin);
    setEditTitle(pin.title);
    setEditDesc(pin.description || "");
    setEditBoardId(pin.board_id);
  };

  const handleSaveEdit = async () => {
    if (!editingPin) return;
    setSavingEdit(true);

    try {
      const result = await updatePinAction(editingPin.id, {
        title: editTitle,
        description: editDesc,
        board_id: editBoardId,
      });

      if (result.success && result.pin) {
        setPins((prev) =>
          prev.map((p) =>
            p.id === editingPin.id
              ? {
                  ...p,
                  title: editTitle,
                  description: editDesc,
                  board_id: editBoardId,
                  board_name: boards.find((b) => b.id === editBoardId)?.name || p.board_name,
                }
              : p
          )
        );
        showToast("Pin updated successfully!");
        setEditingPin(null);
      } else {
        showToast(result.error || "Failed to update pin");
      }
    } catch {
      showToast("Error updating pin");
    } finally {
      setSavingEdit(false);
    }
  };

  // Delete Handlers
  const handleConfirmDelete = async () => {
    if (!deletingPin) return;
    setIsDeleting(true);

    try {
      const result = await deletePinAction(deletingPin.id);
      if (result.success) {
        setPins((prev) => prev.filter((p) => p.id !== deletingPin.id));
        showToast(`Pin #${deletingPin.id} was permanently removed from Supabase.`);
        setDeletingPin(null);
      } else {
        showToast(result.error || "Failed to delete pin.");
      }
    } catch {
      showToast("Error deleting pin from server.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick Schedule Handlers
  const handleOpenSchedule = (pin: PinItem) => {
    setSchedulingPin(pin);
    setScheduleBoardId(pin.board_id || boards[0]?.id || "1100919140101483497");
    setScheduleDateTime(new Date(Date.now() + 86400000).toISOString().slice(0, 16));
  };

  const handleConfirmSchedule = async () => {
    if (!schedulingPin) return;
    setIsScheduling(true);

    try {
      const result = await schedulePinAction(schedulingPin.id, scheduleBoardId, scheduleDateTime);
      if (result.success) {
        const iso = new Date(scheduleDateTime).toISOString();
        setPins((prev) =>
          prev.map((p) =>
            p.id === schedulingPin.id
              ? {
                  ...p,
                  status: "scheduled",
                  board_id: scheduleBoardId,
                  board_name: boards.find((b) => b.id === scheduleBoardId)?.name || p.board_name,
                  scheduled_at: iso,
                }
              : p
          )
        );
        showToast(`Pin #${schedulingPin.id} scheduled for ${scheduleDateTime.replace("T", " ")}!`);
        setSchedulingPin(null);
      } else {
        showToast(result.error || "Failed to schedule pin.");
      }
    } catch {
      showToast("Error scheduling pin.");
    } finally {
      setIsScheduling(false);
    }
  };

  const formatDate = (isoString?: string | null) => {
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

  const formatDateTime = (isoString?: string | null) => {
    if (!isoString) return "";
    try {
      return new Date(isoString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "";
    }
  };

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", paddingBottom: "60px" }}>
      {/* Toast message notification */}
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

      {/* Header section */}
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
              Pin Library
            </span>
            <span style={{ fontSize: "13px", color: "#64748B" }}>
              Synced live with Supabase
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
            My Pins ({pins.length})
          </h1>
        </div>

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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Create New Pins</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "14px 20px",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          boxShadow: "0 2px 6px rgba(35, 34, 46, 0.03)",
        }}
      >
        {/* Status Filter Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Pins", count: countAll },
            { id: "draft", label: "Drafts", count: countDrafts },
            { id: "scheduled", label: "Scheduled", count: countScheduled },
            { id: "published", label: "Published", count: countPublished },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  borderRadius: "8px",
                  border: isActive ? "1px solid #FECDD3" : "1px solid transparent",
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

        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "240px" }}>
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94A3B8",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search pins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px 8px 36px",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              fontSize: "13px",
              color: "#0F172A",
              outline: "none",
              background: "#F8FAFC",
            }}
          />
        </div>
      </div>

      {/* Pins Grid */}
      {filteredPins.length === 0 ? (
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px dashed #CBD5E1",
            padding: "60px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#FFF0F1",
              color: "#E60023",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>
            {searchQuery
              ? `No pins matching "${searchQuery}"`
              : activeFilter !== "all"
              ? `No ${activeFilter} pins found`
              : "No pins in your library yet"}
          </h3>
          <p style={{ margin: "0 0 22px", fontSize: "14px", color: "#64748B", maxWidth: "420px", marginInline: "auto" }}>
            {activeFilter !== "all"
              ? `You do not have any pins with status "${activeFilter}". Generate new pins or switch filters.`
              : "Generate high-converting Pinterest pin drafts automatically from any blog post URL."}
          </p>
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
            Create Pins from URL
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredPins.map((pin) => {
            const isDraft = pin.status === "draft";
            const isScheduled = pin.status === "scheduled";
            const isPublished = pin.status === "published";

            return (
              <div
                key={pin.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "18px",
                  border: "1px solid #E2E8F0",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(35, 34, 46, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                {/* 2:3 Pinterest Image Container */}
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
                    src={pin.image_url}
                    alt={pin.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop";
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Status Badge */}
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        background: isPublished
                          ? "#16A34A"
                          : isScheduled
                          ? "#2563EB"
                          : isDraft
                          ? "#E60023"
                          : "#64748B",
                        color: "#FFFFFF",
                      }}
                    >
                      {pin.status}
                    </span>

                    {/* Supabase ID */}
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 700,
                        background: "rgba(35, 34, 46, 0.8)",
                        backdropFilter: "blur(4px)",
                        color: "#FFFFFF",
                      }}
                    >
                      #{pin.id}
                    </span>
                  </div>

                  {/* Board Pill at bottom of image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      right: "10px",
                      background: "rgba(255, 255, 255, 0.94)",
                      backdropFilter: "blur(4px)",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: "#0F172A",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#E60023" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {pin.board_name || "Dreamy Bedroom Inspiration"}
                    </span>
                  </div>
                </div>

                {/* Pin Card Body */}
                <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px", color: "#94A3B8" }}>
                    <span>Created: {formatDate(pin.created_at)}</span>
                    {pin.scheduled_at && (
                      <span style={{ color: "#2563EB", fontWeight: 700 }}>
                        🕒 {formatDateTime(pin.scheduled_at)}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#0F172A",
                      lineHeight: 1.35,
                    }}
                  >
                    {pin.title}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 16px",
                      fontSize: "13px",
                      color: "#64748B",
                      lineHeight: 1.45,
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {pin.description || "No description provided."}
                  </p>

                  {/* Actions Toolbar */}
                  <div
                    style={{
                      paddingTop: "14px",
                      borderTop: "1px solid #F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    {/* Left: Edit button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(pin)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "7px 12px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF",
                        color: "#23222E",
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
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                      <span>Edit</span>
                    </button>

                    {/* Middle: Schedule button (if draft) */}
                    {isDraft && (
                      <button
                        type="button"
                        onClick={() => handleOpenSchedule(pin)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "7px 12px",
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
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = "#FFF0F1";
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Schedule</span>
                      </button>
                    )}

                    {/* Right: Delete button */}
                    <button
                      type="button"
                      onClick={() => setDeletingPin(pin)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "7px 10px",
                        borderRadius: "8px",
                        border: "1px solid #FEE2E2",
                        background: "#FEF2F2",
                        color: "#DC2626",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        marginLeft: isDraft ? 0 : "auto",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#FEE2E2";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "#FEF2F2";
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Pin Modal */}
      {editingPin && (
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
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px", fontWeight: 800 }}>
                Edit Pin #{editingPin.id}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPin(null)}
                style={{ border: "none", background: "transparent", color: "#94A3B8", cursor: "pointer", fontSize: "20px" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
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

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "13.5px",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Pinterest Board
                </label>
                <select
                  value={editBoardId}
                  onChange={(e) => setEditBoardId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "14px",
                    background: "#FFFFFF",
                    outline: "none",
                  }}
                >
                  {boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setEditingPin(null)}
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
                  onClick={handleSaveEdit}
                  disabled={savingEdit}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "8px",
                    background: "#E60023",
                    color: "#FFFFFF",
                    border: "none",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: savingEdit ? "not-allowed" : "pointer",
                  }}
                >
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (User Requirement 1: Delete must confirm first) */}
      {deletingPin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(35, 34, 46, 0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 110,
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
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#FEE2E2",
                color: "#DC2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>

            <h3
              style={{
                margin: "0 0 8px",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "20px",
                fontWeight: 800,
                color: "#0F172A",
              }}
            >
              Delete this pin?
            </h3>

            <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#64748B", lineHeight: 1.5 }}>
              Are you sure you want to delete <b>&ldquo;{deletingPin.title}&rdquo;</b> (ID: #{deletingPin.id})? This will permanently remove the row from your Supabase database.
            </p>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setDeletingPin(null)}
                disabled={isDeleting}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "#F1F5F9",
                  color: "#475569",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Keep Pin
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "#DC2626",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Schedule Modal */}
      {schedulingPin && (
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
              maxWidth: "460px",
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
              <h3 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "19px", fontWeight: 800 }}>
                Schedule Pin #{schedulingPin.id}
              </h3>
            </div>

            <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#64748B" }}>
              Select the board and publishing time for <b>&ldquo;{schedulingPin.title}&rdquo;</b>.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Destination Board
                </label>
                <select
                  value={scheduleBoardId}
                  onChange={(e) => setScheduleBoardId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
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

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Scheduled Date &amp; Time
                </label>
                <input
                  type="datetime-local"
                  value={scheduleDateTime}
                  onChange={(e) => setScheduleDateTime(e.target.value)}
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
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setSchedulingPin(null)}
                disabled={isScheduling}
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
                disabled={isScheduling}
                style={{
                  padding: "9px 20px",
                  borderRadius: "8px",
                  background: "#E60023",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  cursor: isScheduling ? "not-allowed" : "pointer",
                }}
              >
                {isScheduling ? "Saving..." : "Save to Schedule"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
