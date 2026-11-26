"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function getFriendlyErrorMessage(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("user already registered") || lower.includes("already registered")) {
    return "An account with this email address already exists. Please log in instead.";
  }
  if (lower.includes("password should be at least 6 characters") || lower.includes("weak_password")) {
    return "Your password must be at least 6 characters long.";
  }
  if (lower.includes("invalid email") || lower.includes("unable to validate email")) {
    return "Please enter a valid email address.";
  }
  if (lower.includes("rate limit") || lower.includes("too many requests")) {
    return "Too many sign-up attempts. Please wait a few moments and try again.";
  }
  return message;
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password.length < 6) {
      setErrorMessage("Your password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const origin = window.location.origin;

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        setErrorMessage(getFriendlyErrorMessage(error.message));
        setLoading(false);
        return;
      }

      if (data.user) {
        // If session was returned immediately (auto-confirm enabled)
        if (data.session) {
          try {
            const { data: profile } = await supabase
              .from("profiles")
              .select("id")
              .eq("id", data.user.id)
              .maybeSingle();

            if (!profile) {
              await supabase.from("profiles").insert({
                id: data.user.id,
                email: data.user.email,
                plan: "starter",
              });
            }
          } catch (profileErr) {
            console.error("Profile creation error on signup:", profileErr);
          }

          router.push("/dashboard");
          router.refresh();
          return;
        }

        // If email confirmation is required
        setSuccessMessage(
          `We sent a confirmation link to ${data.user.email}. Please check your inbox to activate your account.`
        );
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(getFriendlyErrorMessage(msg));
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        background: "radial-gradient(75% 55% at 50% 0%, #FFF0F1 0%, rgba(255, 255, 255, 0) 75%), #ffffff",
        fontFamily: "'Google Sans', 'Product Sans', Inter, -apple-system, sans-serif",
        color: "#23222E",
      }}
    >
      {/* Brand Header */}
      <div style={{ marginBottom: "28px", textAlign: "center" }}>
        <Link href="/" aria-label="PinCraftly Home" style={{ display: "inline-block", textDecoration: "none" }}>
          <img src="/images/logo.png" alt="PinCraftly" width="195" height="36" style={{ height: "36px", width: "auto" }} />
        </Link>
      </div>

      {/* Signup Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 10px 30px rgba(35, 34, 46, 0.08)",
          padding: "32px 28px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', 'Google Sans', sans-serif",
              fontSize: "26px",
              fontWeight: 800,
              color: "#23222E",
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Create Your Account
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
            Start turning your content into on-brand pins in seconds
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div
            role="status"
            style={{
              background: "#EAF7EE",
              border: "1px solid #bbf7d0",
              borderRadius: "10px",
              padding: "14px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              color: "#15803d",
              fontSize: "13.5px",
              lineHeight: 1.45,
            }}
          >
            <svg
              viewBox="0 0 20 20"
              width="18"
              height="18"
              fill="currentColor"
              style={{ flexShrink: 0, marginTop: "1px" }}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <strong style={{ display: "block", marginBottom: "2px" }}>Check your email</strong>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            style={{
              background: "#FFF0F1",
              border: "1px solid #fecdd3",
              borderRadius: "10px",
              padding: "12px 14px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              color: "#E60023",
              fontSize: "13.5px",
              lineHeight: 1.4,
            }}
          >
            <svg
              viewBox="0 0 20 20"
              width="18"
              height="18"
              fill="currentColor"
              style={{ flexShrink: 0, marginTop: "1px" }}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                color: "#23222E",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "10px",
                border: "1.5px solid #e2e8f0",
                fontSize: "14.5px",
                fontFamily: "inherit",
                color: "#0f172a",
                outline: "none",
                transition: "border-color 0.15s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E60023")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                color: "#23222E",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "10px",
                border: "1.5px solid #e2e8f0",
                fontSize: "14.5px",
                fontFamily: "inherit",
                color: "#0f172a",
                outline: "none",
                transition: "border-color 0.15s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E60023")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <p style={{ margin: "5px 0 0", fontSize: "11.5px", color: "#94a3b8" }}>
              Must contain at least 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "6px",
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              background: loading ? "#ff667d" : "#E60023",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.15s ease, transform 0.1s ease",
              boxShadow: "0 4px 14px rgba(230, 0, 35, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseOver={(e) => {
              if (!loading) (e.currentTarget.style.background = "#C4001D");
            }}
            onMouseOut={(e) => {
              if (!loading) (e.currentTarget.style.background = "#E60023");
            }}
          >
            {loading ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Get Started Free</span>
                <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h9M8.5 4l4 4-4 4" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", textAlign: "center", fontSize: "14px", color: "#64748b" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#E60023",
              fontWeight: 700,
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link
          href="/"
          style={{
            fontSize: "13.5px",
            color: "#64748b",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#E60023")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          <span>&larr; Back to PinCraftly</span>
        </Link>
      </div>
    </div>
  );
}
