"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Demo.module.css";
import { SITE } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import {
  VEHICLES,
  PACKAGES,
  CONDITIONS,
  TIME_SLOTS,
  money,
  computePriceRange,
  needsApproval,
  depositFor,
} from "@/lib/pricing";

const STEP_TITLES = [
  "What are we detailing?",
  "Pick a package",
  "How does it look right now?",
  "Your price and a time",
  "Lock in your spot",
  "You're booked",
];

const STEP_LIST = [
  { title: "Taps your link", body: "From Instagram, Google, or your site. Picks their vehicle." },
  { title: "Chooses a package", body: "Your packages, your prices, adjusted by vehicle size." },
  { title: "Describes condition", body: "Quick condition pick plus photos, so the price holds up." },
  { title: "Sees a price, picks a time", body: "A real range and your open slots on the same screen." },
  { title: "Pays a deposit", body: "Locks the spot and cuts no-shows." },
  { title: "You get the booking", body: "Details and photos land on your phone. Big jobs wait for your approval." },
];

type State = {
  step: number;
  vehicle: string | null;
  pkg: string | null;
  cond: string | null;
  slot: string | null;
  photos: number;
};

const INITIAL_STATE: State = { step: 0, vehicle: null, pkg: null, cond: null, slot: null, photos: 0 };

function PhotoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C9C6BF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </svg>
  );
}

export default function Demo() {
  const [s, setS] = useState<State>(INITIAL_STATE);
  const startedRef = useRef(false);
  const detailerRef = useRef<HTMLDivElement>(null);

  const vehicle = VEHICLES.find((x) => x.id === s.vehicle);
  const pkg = PACKAGES.find((x) => x.id === s.pkg);
  const cond = CONDITIONS.find((x) => x.id === s.cond);
  const { low, high } = computePriceRange(vehicle, pkg, cond);
  const approve = needsApproval(s.pkg, s.cond);
  const deposit = depositFor(s.pkg);

  const canNext = [!!s.vehicle, !!s.pkg, !!s.cond, !!s.slot, true, true][s.step];
  const nextLabels = ["Continue", "Continue", "See my price", "Continue to deposit", `Pay ${money(deposit)} deposit (demo)`, ""];
  const showNav = s.step < 5;
  const showBack = s.step > 0 && s.step < 5;

  useEffect(() => {
    if (s.step > 0 && !startedRef.current) {
      startedRef.current = true;
      track("demo_start");
    }
    if (s.step === 5) {
      track("demo_complete", { needs_approval: approve });
      detailerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.step]);

  function next() {
    if (!canNext) return;
    setS((prev) => ({ ...prev, step: Math.min(5, prev.step + 1) }));
  }
  function back() {
    setS((prev) => ({ ...prev, step: Math.max(0, prev.step - 1) }));
  }
  function restart() {
    setS(INITIAL_STATE);
    startedRef.current = false;
  }
  function addPhoto() {
    setS((prev) => ({ ...prev, photos: Math.min(3, prev.photos + 1) }));
  }

  const stepLabel = s.step < 5 ? `Step ${s.step + 1} of 5` : "Done";
  const progress = Math.min(100, ((s.step + 1) / 5) * 100) + "%";
  const mobileLine = s.step < 5 ? `Step ${s.step + 1} of 5: ${STEP_LIST[s.step].title}` : "Done: " + STEP_LIST[5].title;
  const waitingNote = s.step === 0 ? "Nothing to do yet. The customer is picking options on their own." : `Still nothing to answer. The customer is on step ${s.step + 1} by themselves.`;

  return (
    <div className={styles.stage}>
      <div aria-live="polite" className="visually-hidden">
        {STEP_TITLES[s.step]} — {stepLabel}
      </div>

      {/* Step list (desktop) */}
      <div className={styles.stepsFull}>
        <h2 className="h3-card" style={{ fontSize: 40, marginBottom: 8 }}>
          Try it like a customer
        </h2>
        <p className="body" style={{ margin: "0 0 20px", color: "var(--muted-on-dark)" }}>
          Tap through the phone. The right side shows what lands on the detailer&apos;s phone.
        </p>
        {STEP_LIST.map((item, i) => {
          const active = i === s.step;
          const done = i < s.step;
          return (
            <div key={item.title} className={styles.stepRow} style={{ background: active ? "var(--bezel)" : "transparent" }}>
              <div
                className={styles.stepDot}
                style={{
                  background: active || done ? "var(--signal)" : "var(--dot-idle)",
                  color: active || done ? "var(--ink)" : "var(--ground)",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{item.title}</div>
                <div className="small" style={{ color: "var(--muted-on-dark)" }}>
                  {item.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collapsed step line (mobile) */}
      <div className={styles.stepsMobile}>
        <span>{mobileLine}</span>
      </div>

      {/* Customer phone */}
      <div className={styles.phoneCol}>
        <div className={styles.phoneLabel}>Customer&apos;s phone</div>
        <div className={styles.customerFrame}>
          <div className={styles.customerScreen}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{SITE.businessName}</div>
              <div className="small" style={{ color: "var(--muted)" }}>
                {stepLabel}
              </div>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: progress }} />
            </div>
            <h3 className="h3-card" style={{ marginTop: 4 }}>
              {STEP_TITLES[s.step]}
            </h3>

            {s.step === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {VEHICLES.map((v) => {
                  const on = s.vehicle === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setS((prev) => ({ ...prev, vehicle: v.id }))}
                      className={styles.optionBtn}
                      style={{ background: on ? "var(--accent-soft)" : "var(--surface)", border: `2px solid ${on ? "var(--accent)" : "var(--line)"}` }}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            )}

            {s.step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PACKAGES.map((p) => {
                  const on = s.pkg === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setS((prev) => ({ ...prev, pkg: p.id }))}
                      className={styles.optionBtn}
                      style={{
                        background: on ? "var(--accent-soft)" : "var(--surface)",
                        border: `2px solid ${on ? "var(--accent)" : "var(--line)"}`,
                        minHeight: 64,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 16, fontWeight: 600 }}>{p.label}</span>
                        <span className="small" style={{ color: "var(--muted)" }}>
                          {p.time}
                        </span>
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>from {money(p.base)}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {s.step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CONDITIONS.map((c) => {
                  const on = s.cond === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setS((prev) => ({ ...prev, cond: c.id }))}
                      className={styles.optionBtn}
                      style={{
                        background: on ? "var(--accent-soft)" : "var(--surface)",
                        border: `2px solid ${on ? "var(--accent)" : "var(--line)"}`,
                        minHeight: 58,
                        padding: "10px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{c.label}</span>
                      <span className="small" style={{ color: "var(--muted)" }}>
                        {c.sub}
                      </span>
                    </button>
                  );
                })}
                <div style={{ fontSize: 14, fontWeight: 600, paddingTop: 6 }}>Add photos (helps lock your price)</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
                  {[0, 1, 2].map((i) => {
                    const filled = i < s.photos;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={addPhoto}
                        aria-label={filled ? `Photo ${i + 1} added` : "Add photo"}
                        style={{
                          height: 74,
                          borderRadius: 12,
                          border: `2px dashed ${filled ? "var(--accent)" : "#B9B5AE"}`,
                          background: filled ? "var(--accent-soft)" : "var(--surface)",
                          color: filled ? "var(--accent)" : "var(--muted)",
                          fontSize: 13,
                          fontWeight: 600,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 4,
                        }}
                      >
                        <PhotoIcon />
                        <span>{filled ? "Added" : "Add photo"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {s.step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ borderRadius: 16, background: "var(--ground)", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <div className="small" style={{ color: "var(--muted)" }}>
                    {vehicle?.label} · {pkg?.label} · {cond?.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-display), sans-serif", fontSize: 44, fontWeight: 700, lineHeight: 1 }}>
                    {money(low)}–{money(high)}
                  </div>
                  <div className="small" style={{ color: "var(--muted)" }}>
                    {approve
                      ? "The detailer confirms the final price from your photos, usually within minutes. You can still hold a time now."
                      : "Final price confirmed at the car. Any change needs your OK first."}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, paddingTop: 2 }}>Pick a time</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
                  {TIME_SLOTS.map((t) => {
                    const on = s.slot === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setS((prev) => ({ ...prev, slot: t }))}
                        style={{
                          minHeight: 50,
                          borderRadius: 12,
                          background: on ? "var(--accent-soft)" : "var(--surface)",
                          border: `2px solid ${on ? "var(--accent)" : "var(--line)"}`,
                          color: "var(--ink)",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {s.step === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ borderRadius: 16, border: "1px solid var(--line)", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Vehicle</span>
                    <span style={{ fontWeight: 600 }}>{vehicle?.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Package</span>
                    <span style={{ fontWeight: 600 }}>{pkg?.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Time</span>
                    <span style={{ fontWeight: 600 }}>{s.slot}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Estimate</span>
                    <span style={{ fontWeight: 600 }}>
                      {money(low)}–{money(high)}
                    </span>
                  </div>
                  <div style={{ height: 1, background: "var(--line-soft)" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 16 }}>
                    <span style={{ fontWeight: 600 }}>Due now (deposit)</span>
                    <span style={{ fontWeight: 700 }}>{money(deposit)}</span>
                  </div>
                </div>
                <div className="small" style={{ color: "var(--muted)" }}>
                  Your deposit comes off the final bill. If the car&apos;s condition differs from your photos, you&apos;ll approve any price change before work starts. Free cancellation up to{" "}
                  {SITE.cancellationWindowHours} hrs before.
                </div>
              </div>
            )}

            {s.step === 5 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 56, height: 56, borderRadius: 28, background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckIcon />
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>
                  Booked for {s.slot}. {money(deposit)} deposit paid.
                </div>
                <div className="small" style={{ color: "var(--muted)" }}>
                  {approve ? "You'll get a text as soon as the detailer confirms your final price." : "You'll get a reminder text the day before."}
                </div>
                <button
                  type="button"
                  onClick={restart}
                  style={{ marginTop: 6, padding: "12px 16px", minHeight: 44, borderRadius: 12, border: "2px solid var(--ink)", background: "var(--surface)", color: "var(--ink)", fontSize: 14, fontWeight: 600 }}
                >
                  Run the demo again
                </button>
              </div>
            )}

            <div style={{ flexGrow: 1 }} />
            {showNav && (
              <div style={{ display: "flex", gap: 8 }}>
                {showBack && (
                  <button
                    type="button"
                    onClick={back}
                    style={{ flex: "0 0 88px", minHeight: 52, borderRadius: 14, border: "2px solid var(--line)", background: "var(--surface)", color: "var(--ink)", fontSize: 15, fontWeight: 600 }}
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={next}
                  style={{
                    flexGrow: 1,
                    minHeight: 52,
                    borderRadius: 14,
                    border: "none",
                    background: "var(--accent)",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    opacity: canNext ? 1 : 0.4,
                  }}
                >
                  {nextLabels[s.step]}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailer phone */}
      <div className={styles.phoneCol}>
        <div className={styles.phoneLabel}>Detailer&apos;s phone</div>
        <div className={styles.detailerFrame} ref={detailerRef}>
          {s.step !== 5 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "24px 8px", alignItems: "center", textAlign: "center" }}>
              <BellIcon />
              <div style={{ fontSize: 15, fontWeight: 600 }}>You&apos;re on a job</div>
              <div className="small" style={{ color: "var(--muted-on-dark)" }}>
                {waitingNote}
              </div>
            </div>
          )}
          {s.step === 5 && (
            <div className={styles.bookingCard} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: "var(--signal)" }} />
                <div style={{ fontSize: 15, fontWeight: 600 }}>{approve ? "New booking: needs your price OK" : "New booking"}</div>
              </div>
              <div style={{ borderRadius: 14, background: "var(--ground)", color: "var(--ink)", padding: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  {SITE.customerName} · {s.slot}
                </div>
                <div>
                  {vehicle?.label} · {pkg?.label}
                </div>
                <div>
                  Condition: {cond?.label} · {s.photos} {s.photos === 1 ? "photo" : "photos"}
                </div>
                <div>
                  Estimate: {money(low)}–{money(high)}
                </div>
                <div style={{ fontWeight: 600, color: "var(--accent)" }}>{money(deposit)} deposit paid</div>
              </div>
              {approve && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="small" style={{ color: "var(--muted-on-dark)" }}>
                    Big job. Check the photos and confirm the final price:
                  </div>
                  <ApproveRow amount={money(high)} />
                </div>
              )}
              {!approve && (
                <div className="small" style={{ color: "var(--muted-on-dark)" }}>
                  Standard job, booked instantly. It&apos;s on your calendar.
                </div>
              )}
            </div>
          )}
        </div>
        <div className="small" style={{ color: "var(--muted-on-dark)", maxWidth: 300, textAlign: "center" }}>
          Demo pricing is an example. Detailers set their own packages and prices.
        </div>
      </div>
    </div>
  );
}

function ApproveRow({ amount }: { amount: string }) {
  const [approved, setApproved] = useState(false);
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        type="button"
        onClick={() => setApproved(true)}
        style={{ flexGrow: 1, minHeight: 46, borderRadius: 12, border: "none", background: "var(--signal)", color: "var(--ink)", fontSize: 14, fontWeight: 600 }}
      >
        {approved ? "Approved" : `Approve ${amount}`}
      </button>
      <button
        type="button"
        style={{ flexGrow: 1, minHeight: 46, borderRadius: 12, border: "2px solid var(--muted-on-dark)", background: "transparent", color: "var(--ground)", fontSize: 14, fontWeight: 600 }}
      >
        Adjust price
      </button>
    </div>
  );
}
