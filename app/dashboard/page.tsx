import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = {
    plan: "Starter",
  };

  try {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id || "")
      .maybeSingle();

    if (profileData) {
      profile = profileData;
    }
  } catch (err) {
    // profiles table fallback
  }

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #FFF7F8 100%)",
          borderRadius: "18px",
          border: "1px solid #FFE4E6",
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
            Signed in as <b style={{ color: "#0F172A" }}>{user?.email}</b>
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            href="/dashboard/create"
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: "#E60023",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(230, 0, 35, 0.25)",
              transition: "background 0.15s ease",
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Create New Pins</span>
          </Link>

          <Link
            href="/"
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
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
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #F1F5F9",
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
              <h3 style={{ margin: 0, fontSize: "14px", color: "#64748B", fontWeight: 600 }}>Active Plan</h3>
              <b style={{ fontSize: "18px", color: "#0F172A", textTransform: "capitalize" }}>
                {profile?.plan || "Starter"}
              </b>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>
            Full access to AI Pin Studio, Smart Scheduler &amp; SEO Tools.
          </p>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #F1F5F9",
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
                color: "#15803D",
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
              <h3 style={{ margin: 0, fontSize: "14px", color: "#64748B", fontWeight: 600 }}>Queue Status</h3>
              <b style={{ fontSize: "18px", color: "#0F172A" }}>Ready for Pins</b>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>
            Safe intervals and peak engagement schedule active.
          </p>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #F1F5F9",
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
              <h3 style={{ margin: 0, fontSize: "14px", color: "#64748B", fontWeight: 600 }}>Connected Storage</h3>
              <b style={{ fontSize: "18px", color: "#0F172A" }}>Supabase Live</b>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>
            Tables (profiles, websites, pins, boards) synced.
          </p>
        </div>
      </div>
    </div>
  );
}
