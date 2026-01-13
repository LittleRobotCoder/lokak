"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "err";

export default function RegistrationForm() {
  const [state, setState] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    ticketType: "General",
    notes: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof typeof state>(k: K, v: string) {
    setState((s) => ({ ...s, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // basic client validation
    if (
      !state.fullName ||
      !state.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)
    ) {
      setStatus("err");
      return;
    }
    setStatus("loading");
    try {
      // Prefer explicit env var; otherwise try a sensible local-dev fallback to port 4000
      const envBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
      let url = "";
      if (envBase) {
        url = envBase.replace(/\/$/, "") + "/api/register";
      } else if (typeof window !== "undefined") {
        // If running locally, try the backend at the same host on port 4000
        const proto = window.location.protocol;
        const host = window.location.hostname || "localhost";
        url = `${proto}//${host}:4000/api/register`;
      } else {
        url = `/api/register`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (res.ok) {
        setStatus("ok");
        setState({
          fullName: "",
          email: "",
          phone: "",
          organization: "",
          role: "",
          ticketType: "General",
          notes: "",
        });
      } else {
        // Try to surface server-provided error messages
        try {
          const body = await res.json();
          console.warn("Registration failed", body);
        } catch (e) {
          // ignore
        }
        setStatus("err");
      }
    } catch (err) {
      console.error("Registration submit error", err);
      setStatus("err");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-white/10 bg-black/40 p-6 grid gap-4 max-w-xl"
    >
      <h2 className="text-xl font-semibold">Register for Lokakṣema 2026</h2>

      <input
        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
        placeholder="Full Name *"
        value={state.fullName}
        onChange={(e) => update("fullName", e.target.value)}
        required
      />

      <input
        type="email"
        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
        placeholder="Email Address *"
        value={state.email}
        onChange={(e) => update("email", e.target.value)}
        required
      />

      <input
        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
        placeholder="Phone Number"
        value={state.phone}
        onChange={(e) => update("phone", e.target.value)}
      />

      <input
        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
        placeholder="Organization"
        value={state.organization}
        onChange={(e) => update("organization", e.target.value)}
      />

      <input
        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
        placeholder="Role / Title"
        value={state.role}
        onChange={(e) => update("role", e.target.value)}
      />

      <select
        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
        value={state.ticketType}
        onChange={(e) => update("ticketType", e.target.value)}
      >
        {["General", "Student", "Speaker", "Volunteer", "Sponsor", "Other"].map(
          (x) => (
            <option key={x} value={x}>
              {x}
            </option>
          )
        )}
      </select>

      <textarea
        rows={4}
        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
        placeholder="Notes (accessibility, dietary requirements, etc.)"
        value={state.notes}
        onChange={(e) => update("notes", e.target.value)}
      />

      <button
        disabled={status === "loading"}
        className="mt-2 rounded-xl text-white px-5 py-3 text-sm font-medium transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:opacity-60 bg-gradient-to-br from-[#6C63FF] to-[#402A95] hover:shadow-[0_8px_24px_rgba(108,99,255,0.4),0_4px_12px_rgba(0,216,255,0.2)]"
        type="submit"
      >
        {status === "loading" ? "Submitting…" : "Register"}
      </button>

      {status === "ok" && (
        <p className="text-sm text-emerald-400">
          Thanks! Your registration was received.
        </p>
      )}
      {status === "err" && (
        <p className="text-sm text-rose-400">
          Please check required fields and try again.
        </p>
      )}

      <p className="text-xs text-neutral-400">
        We will handle your data according to our Privacy Policy.
      </p>
    </form>
  );
}
