"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface DashboardShellProps {
  user: {
    id: string;
    email?: string;
  } | null;
  profile?: {
    id?: string;
    email?: string;
    plan?: string;
  } | null;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    name: "Create Pin",
    href: "/dashboard/create",
    badge: "New",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    name: "My Pins",
    href: "/dashboard/pins",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    name: "Scheduler",
    href: "/dashboard/scheduler",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <circle cx="12" cy="15" r="2" />
      </svg>
    ),
  },
  {
    name: "Boards",
    href: "/dashboard/boards",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export default function DashboardShell({ user, profile, children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error("Error signing out:", err);
      setLoggingOut(false);
    }
  };

  const planName = profile?.plan || "Starter";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
        fontFamily: "'Google Sans', 'Product Sans', Inter, -apple-system, sans-serif",
        color: "#23222E",
      }}
    >
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(35, 34, 46, 0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#FFFFFF",
          borderRight: "1px solid #E2E8F0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 50,
          transition: "transform 0.25s ease",
        }}
        className={mobileMenuOpen ? "mobile-sidebar-open" : "mobile-sidebar"}
      >
        {/* Brand Logo Header */}
        <div
          style={{
            padding: "20px 22px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img
              src="/images/logo.png"
              alt="PinCraftly"
              width="155"
              height="30"
              style={{ height: "30px", width: "auto" }}
            />
          </Link>
          <span
            style={{
              background: "#FFF0F1",
              color: "#E60023",
              fontSize: "10px",
              fontWeight: 800,
              textTransform: "uppercase",
              padding: "2px 7px",
              borderRadius: "5px",
              letterSpacing: "0.05em",
            }}
          >
            PRO
          </span>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#94A3B8",
              letterSpacing: "0.06em",
              padding: "0 12px 10px",
            }}
          >
            Menu
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(item.href);

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? "#E60023" : "#475569",
                      background: isActive ? "#FFF0F1" : "transparent",
                      border: isActive ? "1px solid #FFE4E6" : "1px solid transparent",
                      transition: "all 0.15s ease",
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "#F8FAFC";
                        e.currentTarget.style.color = "#0F172A";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#475569";
                      }
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? "#E60023" : "#64748B",
                      }}
                    >
                      {item.icon}
                    </span>
                    <span style={{ flex: 1 }}>{item.name}</span>
                    {item.badge && (
                      <span
                        style={{
                          background: "#E60023",
                          color: "#FFFFFF",
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "1px 6px",
                          borderRadius: "999px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer Info Card */}
        <div style={{ padding: "16px", borderTop: "1px solid #F1F5F9" }}>
          <div
            style={{
              background: "#FFF7F8",
              border: "1px solid #FFE4E6",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#16A34A",
                  boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.2)",
                }}
              />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#0F172A" }}>
                Auto-Sync Ready
              </span>
            </div>
            <p style={{ margin: "0 0 10px", fontSize: "11.5px", color: "#64748B", lineHeight: 1.4 }}>
              Turn blog articles into Pinterest pins in 1 click.
            </p>
            <Link
              href="/dashboard/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                width: "100%",
                padding: "7px 12px",
                borderRadius: "8px",
                background: "#E60023",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 700,
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#C4001D";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#E60023";
              }}
            >
              <span>+ Generate Pins</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <header
          style={{
            height: "64px",
            background: "#FFFFFF",
            borderBottom: "1px solid #E2E8F0",
            padding: "0 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 30,
            boxShadow: "0 1px 2px rgba(35, 34, 46, 0.03)",
          }}
        >
          {/* Left: Mobile Toggle & Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="dashboard-mobile-toggle"
              aria-label="Toggle Navigation"
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                background: "#FFFFFF",
                color: "#23222E",
                cursor: "pointer",
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <span style={{ color: "#64748B", fontWeight: 500 }}>PinCraftly</span>
              <span style={{ color: "#CBD5E1" }}>/</span>
              <span
                style={{
                  color: "#0F172A",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                {pathname?.split("/")[2] || "Dashboard"}
              </span>
            </div>
          </div>

          {/* Right: User Email, Plan Badge, & Logout Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "#FFF0F1",
                  color: "#E60023",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 800,
                  border: "1px solid #FFE4E6",
                }}
              >
                {(user?.email?.[0] || "U").toUpperCase()}
              </div>
              <div style={{ textAlign: "right" }} className="dashboard-user-info">
                <span
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.2,
                  }}
                >
                  {user?.email || "Account"}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#E60023",
                    background: "#FFF0F1",
                    padding: "1px 6px",
                    borderRadius: "4px",
                    marginTop: "2px",
                    textTransform: "capitalize",
                  }}
                >
                  {planName} Plan
                </span>
              </div>
            </div>

            <div style={{ width: "1px", height: "24px", background: "#E2E8F0" }} />

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 14px",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                background: "#FFFFFF",
                color: "#23222E",
                fontSize: "13px",
                fontWeight: 600,
                cursor: loggingOut ? "not-allowed" : "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#FFF0F1";
                e.currentTarget.style.color = "#E60023";
                e.currentTarget.style.borderColor = "#FECDD3";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.color = "#23222E";
                e.currentTarget.style.borderColor = "#E2E8F0";
              }}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>{loggingOut ? "Signing out..." : "Logout"}</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: "28px", maxWidth: "1280px", width: "100%", margin: "0 auto" }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .mobile-sidebar {
            position: fixed !important;
            transform: translateX(-100%);
          }
          .mobile-sidebar-open {
            position: fixed !important;
            transform: translateX(0);
          }
          .dashboard-mobile-toggle {
            display: inline-flex !important;
          }
          .dashboard-user-info {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
