import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function MyPinsPage() {
  const supabase = await createClient();

  const { data: pins, error } = await supabase
    .from("pins")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
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
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "30px",
              fontWeight: 800,
              color: "#23222E",
              margin: "0 0 6px",
            }}
          >
            My Pins ({pins?.length || 0})
          </h1>
          <p style={{ margin: 0, fontSize: "14.5px", color: "#64748B" }}>
            All your generated pin drafts and scheduled pins stored in Supabase.
          </p>
        </div>

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
            boxShadow: "0 2px 8px rgba(230, 0, 35, 0.25)",
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Create New Pins</span>
        </Link>
      </div>

      {(!pins || pins.length === 0) ? (
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
            No pins saved yet
          </h3>
          <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#64748B", maxWidth: "400px", marginInline: "auto" }}>
            Generate your first batch of Pinterest pins directly from any blog URL.
          </p>
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
            }}
          >
            Go to Pin Generator
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {pins.map((pin) => (
            <div
              key={pin.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(35, 34, 46, 0.04)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "2 / 3",
                  background: "#F1F5F9",
                }}
              >
                <img
                  src={pin.image_url}
                  alt={pin.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: pin.status === "published" ? "#16A34A" : "#E60023",
                    color: "#FFFFFF",
                    fontSize: "10.5px",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {pin.status}
                </span>
              </div>
              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.35,
                  }}
                >
                  {pin.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#64748B",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {pin.description || "No description"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
