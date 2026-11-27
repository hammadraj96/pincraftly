"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BoardWithCount,
  createBoardAction,
  updateBoardAction,
  deleteBoardAction,
} from "@/app/dashboard/boards/actions";

interface BoardsClientProps {
  initialBoards: BoardWithCount[];
}

export default function BoardsClient({ initialBoards }: BoardsClientProps) {
  const [boards, setBoards] = useState<BoardWithCount[]>(initialBoards);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Create Board Form State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Edit Board Modal State
  const [editingBoard, setEditingBoard] = useState<BoardWithCount | null>(null);
  const [editName, setEditName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Delete Board Modal State
  const [deletingBoard, setDeletingBoard] = useState<BoardWithCount | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) {
      showToast("Please enter a board name.");
      return;
    }

    setIsCreating(true);
    try {
      const result = await createBoardAction(newBoardName);
      if (result.success && result.board) {
        const created: BoardWithCount = {
          id: String(result.board.id),
          name: result.board.name,
          description: result.board.description || null,
          privacy: result.board.privacy || "PUBLIC",
          account_id: result.board.account_id || null,
          is_pinterest_linked: false,
          pinterest_board_id: null,
          pin_count: 0,
          created_at: result.board.created_at || new Date().toISOString(),
        };

        setBoards((prev) => [created, ...prev]);
        setNewBoardName("");
        setShowCreateForm(false);
        showToast(`✨ Board "${created.name}" created successfully in Supabase!`);
      } else {
        showToast(result.error || "Failed to create board.");
      }
    } catch {
      showToast("Error creating board.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleOpenEdit = (board: BoardWithCount) => {
    setEditingBoard(board);
    setEditName(board.name);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBoard || !editName.trim()) return;

    setIsEditing(true);
    try {
      const result = await updateBoardAction(editingBoard.id, editName);
      if (result.success) {
        setBoards((prev) =>
          prev.map((b) => (b.id === editingBoard.id ? { ...b, name: editName.trim() } : b))
        );
        showToast(`Board renamed to "${editName.trim()}".`);
        setEditingBoard(null);
      } else {
        showToast(result.error || "Failed to rename board.");
      }
    } catch {
      showToast("Error updating board.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingBoard) return;

    setIsDeleting(true);
    try {
      const result = await deleteBoardAction(deletingBoard.id);
      if (result.success) {
        setBoards((prev) => prev.filter((b) => b.id !== deletingBoard.id));
        showToast(
          `Board "${deletingBoard.name}" deleted. Its pins were kept safe and unlinked.`
        );
        setDeletingBoard(null);
      } else {
        showToast(result.error || "Failed to delete board.");
      }
    } catch {
      showToast("Error deleting board.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (isoString: string) => {
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
              Boards Manager
            </span>
            <span style={{ fontSize: "13px", color: "#64748B" }}>
              Synced with Supabase database
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
            Pinterest Boards ({boards.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{showCreateForm ? "Close Form" : "Create Board"}</span>
        </button>
      </div>

      {/* Create Board Form (User Requirement 1: name only for now) */}
      {showCreateForm && (
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1.5px solid #FFE4E6",
            padding: "24px",
            marginBottom: "28px",
            boxShadow: "0 4px 20px rgba(230, 0, 35, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <span style={{ fontSize: "14px", fontWeight: 800, color: "#E60023" }}>+</span>
            <h3 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "18px", fontWeight: 800, color: "#0F172A" }}>
              Create New Board
            </h3>
          </div>

          <form onSubmit={handleCreateBoard}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: "260px" }}>
                <input
                  type="text"
                  placeholder="e.g. Scandinavian Living Room Ideas, Summer Fashion, Cozy Recipes"
                  required
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "14px",
                    outline: "none",
                    color: "#23222E",
                    background: "#FAFAFA",
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

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="submit"
                  disabled={isCreating}
                  style={{
                    padding: "11px 22px",
                    borderRadius: "10px",
                    background: isCreating ? "#FCA5A5" : "#E60023",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 700,
                    border: "none",
                    cursor: isCreating ? "not-allowed" : "pointer",
                    boxShadow: "0 2px 8px rgba(230, 0, 35, 0.2)",
                  }}
                >
                  {isCreating ? "Creating..." : "Save Board"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  style={{
                    padding: "11px 16px",
                    borderRadius: "10px",
                    background: "#F1F5F9",
                    color: "#475569",
                    fontSize: "14px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Boards Grid */}
      {boards.length === 0 ? (
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
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>
            No boards found
          </h3>
          <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#64748B", maxWidth: "400px", marginInline: "auto" }}>
            Create your first Pinterest board to organize your generated pins and scheduling queues.
          </p>
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            style={{
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
            Create a Board
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "22px",
          }}
        >
          {boards.map((board) => (
            <div
              key={board.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                padding: "24px",
                boxShadow: "0 2px 10px rgba(35, 34, 46, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              <div>
                {/* Board Top Tags */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {board.is_pinterest_linked ? (
                      <span
                        style={{
                          background: "#FFF0F1",
                          color: "#E60023",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Pinterest Synced
                      </span>
                    ) : (
                      <span
                        style={{
                          background: "#F1F5F9",
                          color: "#475569",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        Workspace Board
                      </span>
                    )}

                    <span
                      style={{
                        background: "#F8FAFC",
                        color: "#64748B",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      {board.privacy}
                    </span>
                  </div>

                  {/* Pin Count Badge */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#0F172A",
                      background: "#F8FAFC",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    📌 {board.pin_count} {board.pin_count === 1 ? "pin" : "pins"}
                  </span>
                </div>

                {/* Board Name */}
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.3,
                  }}
                >
                  {board.name}
                </h3>

                {/* Board Meta (Pinterest Board ID & Created Date) */}
                <div style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>Pinterest ID: </span>
                    <span style={{ fontFamily: "monospace", color: "#0F172A" }}>
                      {board.pinterest_board_id ? `#${board.pinterest_board_id}` : "Not linked to Pinterest yet"}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 600 }}>Created: </span>
                    <span>{formatDate(board.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Edit Name & Delete with confirmation */}
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: "1px solid #F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleOpenEdit(board)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    background: "#FFFFFF",
                    color: "#0F172A",
                    fontSize: "13px",
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
                  <span>Edit Name</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingBoard(board)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 12px",
                    borderRadius: "8px",
                    border: "1px solid #FEE2E2",
                    background: "#FEF2F2",
                    color: "#DC2626",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
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
          ))}
        </div>
      )}

      {/* Edit Board Modal */}
      {editingBoard && (
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
              boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "20px", fontWeight: 800 }}>
                Edit Board Name
              </h3>
              <button
                type="button"
                onClick={() => setEditingBoard(null)}
                style={{ border: "none", background: "transparent", color: "#94A3B8", cursor: "pointer", fontSize: "20px" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Board Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #CBD5E1",
                    fontSize: "14.5px",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#E60023")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#CBD5E1")}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setEditingBoard(null)}
                  disabled={isEditing}
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
                  disabled={isEditing}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "8px",
                    background: "#E60023",
                    color: "#FFFFFF",
                    border: "none",
                    fontSize: "13.5px",
                    fontWeight: 700,
                    cursor: isEditing ? "not-allowed" : "pointer",
                  }}
                >
                  {isEditing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Board Confirmation Modal (User Requirement 1: Deleting a board must not delete its pins) */}
      {deletingBoard && (
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
              maxWidth: "450px",
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
              Delete board &ldquo;{deletingBoard.name}&rdquo;?
            </h3>

            <p style={{ margin: "0 0 14px", fontSize: "14px", color: "#64748B", lineHeight: 1.5 }}>
              This will permanently delete this board from Supabase.
            </p>

            <div
              style={{
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                borderRadius: "10px",
                padding: "10px 14px",
                marginBottom: "20px",
                fontSize: "12.5px",
                color: "#166534",
                fontWeight: 600,
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <b>Pins are safe:</b> Any pins on this board ({deletingBoard.pin_count} pins) will remain saved and unlinked.
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setDeletingBoard(null)}
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
                Cancel
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
                }}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Board"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
