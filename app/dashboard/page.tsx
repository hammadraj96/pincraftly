"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  plan?: string;
  created_at?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        router.replace("/login");
        return;
      }

      setUser(authUser);

      // Fetch user profile from profiles table
      try {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .maybeSingle();

        if (profileData) {
          setProfile(profileData);
        } else {
          // Fallback if not yet created
          setProfile({
            id: authUser.id,
            email: authUser.email || "",
            plan: "starter",
          });
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error("Error logging out:", err);
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "'Google Sans', sans-serif",
          color: "#23222E",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #fecdd3",
              borderTopColor: "#E60023",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ margin: 0, fontSize: "15px", color: "#64748b" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Google Sans', 'Product Sans', Inter, -apple-system, sans-serif",
        color: "#23222E",
      }}
    >
      {/* Top Navigation */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgba(35, 34, 46, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" aria-label="PinCraftly Home" style={{ display: "flex", alignItems: "center" }}>
            <img src="/images/logo.png" alt="PinCraftly" width="160" height="30" style={{ height: "30px", width: "auto" }} />
          </Link>
          <span
            style={{
              background: "#FFF0F1",
              color: "#E60023",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: "6px",
              letterSpacing: "0.05em",
            }}
          >
            Dashboard
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "block", fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>
              {user?.email}
            </span>
            <span style={{ display: "block", fontSize: "11.5px", color: "#64748b", textTransform: "capitalize" }}>
              {profile?.plan || "Starter"} Plan
            </span>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              color: "#23222E",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: loggingOut ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#FFF0F1";
              e.currentTarget.style.color = "#E60023";
              e.currentTarget.style.borderColor = "#fecdd3";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#23222E";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>{loggingOut ? "Signing out..." : "Logout"}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Welcome Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #FFF7F8 100%)",
            borderRadius: "18px",
            border: "1px solid #ffe4e6",
            padding: "32px",
            marginBottom: "32px",
            boxShadow: "0 4px 20px rgba(230, 0, 35, 0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 800,
                color: "#E60023",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "8px",
              }}
            >
              Account Active
            </span>
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', 'Google Sans', sans-serif",
                fontSize: "30px",
                fontWeight: 800,
                color: "#23222E",
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              Welcome back!
            </h1>
            <p style={{ margin: 0, fontSize: "15px", color: "#475569" }}>
              Signed in as <b style={{ color: "#0f172a" }}>{user?.email}</b>
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              href="/"
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                color: "#23222E",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>View Landing Page</span>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Status Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #f1f5f9",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(35, 34, 46, 0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#FFF0F1",
                  color: "#E60023",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                </svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Active Plan</h3>
                <b style={{ fontSize: "18px", color: "#0f172a", textTransform: "capitalize" }}>
                  {profile?.plan || "Starter"}
                </b>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              Full access to AI Pin Studio, Smart Scheduler &amp; SEO Tools.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #f1f5f9",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(35, 34, 46, 0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#EAF7EE",
                  color: "#15803d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Queue Status</h3>
                <b style={{ fontSize: "18px", color: "#0f172a" }}>Ready for Pins</b>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              Safe intervals and peak engagement schedule active.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #f1f5f9",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(35, 34, 46, 0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#E6F7F4",
                  color: "#0E9384",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Connected Storage</h3>
                <b style={{ fontSize: "18px", color: "#0f172a" }}>Supabase Live</b>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              Tables (profiles, websites, pins, boards) synced.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
