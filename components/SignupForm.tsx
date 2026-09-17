"use client";

import { FormEvent, useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { captureAttribution, getAttribution } from "@/lib/attribution";

type Status = "idle" | "loading" | "done" | "error";

export default function SignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    captureAttribution();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");
    const instagram = String(data.get("ig") || "");
    const company = String(data.get("company") || ""); // honeypot

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, instagram, company, ...getAttribution() }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Try again.");
      }
      track("form_submit");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (status === "done") {
    return (
      <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5, maxWidth: 640 }}>
        You&apos;re in. I&apos;ll message you within a day to get your page set up.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="cta-form-row">
        <div className="cta-field">
          <label htmlFor="email" style={{ fontSize: 14, fontWeight: 600 }}>
            Email
          </label>
          <input id="email" name="email" type="email" required placeholder="you@yourdetailing.com" className="cta-input" />
        </div>
        <div className="cta-field">
          <label htmlFor="ig" style={{ fontSize: 14, fontWeight: 600 }}>
            Instagram handle
          </label>
          <input id="ig" name="ig" type="text" placeholder="@yourshop" className="cta-input" style={{ width: 240 }} />
        </div>
        {/* Honeypot — hidden from real visitors, catches simple bots */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="visually-hidden"
        />
        <button type="submit" disabled={status === "loading"} className="btn" style={{ height: 52, padding: "0 26px", background: "var(--ink)", color: "#fff" }}>
          {status === "loading" ? "Submitting…" : "Get early access"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" style={{ margin: "12px 0 0", fontSize: 14, color: "#FFD9D2" }}>
          {error}
        </p>
      )}
    </form>
  );
}
