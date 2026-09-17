"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Demo.module.css";
import { SITE } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { SERVICES, VEHICLES, SAME_DAY_SLOTS, DROPOFF_SLOTS, money, computePriceRange, upsellTotal } from "@/lib/services";
import { SELECT_SERVICE_EVENT } from "./HeroServiceChips";

const STEP_LIST = [
  { title: "Taps your link", body: "From Instagram, Google, or your site. Picks a service." },
  { title: "Picks the vehicle", body: "Size adjusts the price automatically." },
  { title: "Chooses a package", body: "Your packages and prices for that service." },
  { title: "Picks film, finish, or condition", body: "Plus photos when the job needs them." },
  { title: "Adds any extras", body: "Optional add-ons, priced and picked from a list you set." },
  { title: "Sees a price, picks a time", body: "A real range and your open slots, including drop-offs." },
  { title: "Pays a deposit", body: "Set per service. Locks the spot and cuts no-shows." },
  { title: "You get the booking", body: "Details and photos land on your phone. Big jobs wait for your approval." },
];

const LAST_STEP = STEP_LIST.length - 1; // 7

type Decision = "approve" | "adjust" | null;

type State = {
  step: number;
  service: string | null;
  vehicle: string | null;
  pkg: string | null;
  opt: string | null;
  upsells: string[];
  slot: string | null;
  photos: number;
  decision: Decision;
};

const INITIAL_STATE: State = { step: 0, service: null, vehicle: null, pkg: null, opt: null, upsells: [], slot: null, photos: 0, decision: null };

function PhotoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function CheckIcon({ size = 28, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("service");
    if (param && SERVICES.some((svc) => svc.id === param)) {
      setS({ ...INITIAL_STATE, service: param, step: 1 });
    }
  }, []);

  useEffect(() => {
    function onSelect(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      if (!SERVICES.some((svc) => svc.id === id)) return;
      setS({ ...INITIAL_STATE, service: id, step: 1 });
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const service = SERVICES.find((x) => x.id === s.service);
  const vehicle = VEHICLES.find((x) => x.id === s.vehicle);
  const pkg = service?.packages.find((x) => x.id === s.pkg);
  const opt = service?.options.find((x) => x.id === s.opt);
  const { low, high } = computePriceRange(vehicle, pkg, opt);
  const upTotal = upsellTotal(service, s.upsells);
  const displayLow = low + upTotal;
  const displayHigh = high + upTotal;
  const selectedUpsells = service ? service.upsells.filter((u) => s.upsells.includes(u.id)) : [];
  const approve = service ? service.needsApproval(s.pkg, s.opt) : false;
  const deposit = service?.deposit ?? 0;
  const slots = service?.multiDay ? DROPOFF_SLOTS : SAME_DAY_SLOTS;

  const canNext = [!!s.service, !!s.vehicle, !!s.pkg, !!s.opt, true, !!s.slot, true, true][s.step];
  const nextLabels = ["Continue", "Continue", "Continue", "Continue", "See my price", "Continue to deposit", `Pay ${money(deposit)} deposit (demo)`, ""];
  const showNav = s.step < LAST_STEP;
  const showBack = s.step > 0 && s.step < LAST_STEP;

  const titles = [
    "What do you need?",
    "What's the vehicle?",
    "Pick a package",
    service?.optionTitle ?? "Pick an option",
    "Want to add anything?",
    "Your price and a time",
    "Lock in your spot",
    "You're booked",
  ];

  useEffect(() => {
    if (s.step > 0 && !startedRef.current) {
      startedRef.current = true;
      track("demo_start", { service: s.service ?? "" });
    }
    if (s.step === LAST_STEP) {
      track("demo_complete", { service: s.service ?? "", needs_approval: approve });
      shopRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.step]);

  function pickService(id: string) {
    setS((prev) => ({ ...prev, service: id, pkg: null, opt: null, upsells: [], slot: null, photos: 0, decision: null }));
  }
  function next() {
    if (!canNext) return;
    setS((prev) => ({ ...prev, step: Math.min(LAST_STEP, prev.step + 1) }));
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
  function toggleUpsell(id: string) {
    setS((prev) => ({
      ...prev,
      upsells: prev.upsells.includes(id) ? prev.upsells.filter((x) => x !== id) : [...prev.upsells, id],
    }));
  }
  function decide(decision: "approve" | "adjust") {
    setS((prev) => ({ ...prev, decision }));
  }

  const stepLabel = s.step < LAST_STEP ? `Step ${s.step + 1} of ${LAST_STEP}` : "Done";
  const progress = Math.min(100, ((s.step + 1) / LAST_STEP) * 100) + "%";
  const waitingNote = s.step === 0 ? "Nothing to do yet. The customer is picking options on their own." : `Still nothing to answer. The customer is on step ${s.step + 1} by themselves.`;
  const photoCountLabel = s.photos + (s.photos === 1 ? " photo" : " photos");

  const approvePending = s.step === LAST_STEP && approve && !s.decision;
  const approveDone = s.step === LAST_STEP && approve && !!s.decision;
  const approveDoneText =
    s.decision === "adjust"
      ? "Jordan gets a text to approve your updated price before the appointment."
      : `Price confirmed at ${money(displayHigh)}. Jordan just got a text.`;
  const bookedNote = !approve
    ? "You'll get a reminder text the day before."
    : s.decision === "approve"
      ? `Update: the shop confirmed your price at ${money(displayHigh)}.`
      : s.decision === "adjust"
        ? "Update: the shop sent an updated price. You'll approve it before anything changes."
        : "You'll get a text as soon as the shop confirms your final price.";

  return (
    <div className={styles.stage}>
      <div aria-live="polite" className="visually-hidden">
        {titles[s.step]} — {stepLabel}
      </div>

      {/* Step list (desktop) */}
      <div className={styles.stepsFull}>
        <h2 className="h3-card" style={{ fontSize: 40, marginBottom: 8 }}>
          Try it like a customer
        </h2>
        <p className="body" style={{ margin: "0 0 20px", color: "var(--muted-on-dark)" }}>
          This is what your customers would see from your link. Tap through it, then watch what
          shows up on your phone.
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

      {/* Customer phone */}
      <div className={`${styles.phoneCol} ${styles.customerCol}`}>
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
              {titles[s.step]}
            </h3>

            {s.step === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SERVICES.map((svc) => {
                  const on = s.service === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => pickService(svc.id)}
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
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{svc.label}</span>
                      <span className="small" style={{ color: "var(--muted)" }}>
                        {svc.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {s.step === 1 && (
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

            {s.step === 2 && service && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {service.packages.map((p) => {
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

            {s.step === 3 && service && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {service.options.map((o) => {
                  const on = s.opt === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setS((prev) => ({ ...prev, opt: o.id }))}
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
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{o.label}</span>
                      <span className="small" style={{ color: "var(--muted)" }}>
                        {o.sub}
                      </span>
                    </button>
                  );
                })}
                {service.photos && (
                  <>
                    <div style={{ fontSize: 14, fontWeight: 600, paddingTop: 6 }}>{service.photoPrompt}</div>
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
                  </>
                )}
              </div>
            )}

            {s.step === 4 && service && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="small" style={{ color: "var(--muted)", marginTop: -6 }}>
                  Optional — add as many as you&apos;d like.
                </div>
                {service.upsells.map((u) => {
                  const on = s.upsells.includes(u.id);
                  return (
                    <button
                      key={u.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleUpsell(u.id)}
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        minHeight: 64,
                        borderRadius: 14,
                        background: on ? "var(--accent-soft)" : "var(--surface)",
                        border: `2px solid ${on ? "var(--accent)" : "var(--line)"}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          flex: "0 0 22px",
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: `2px solid ${on ? "var(--accent)" : "var(--line)"}`,
                          background: on ? "var(--accent)" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-hidden="true"
                      >
                        {on && <CheckIcon size={14} color="#fff" />}
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}>
                        <span style={{ fontSize: 16, fontWeight: 600 }}>{u.label}</span>
                        <span className="small" style={{ color: "var(--muted)" }}>
                          {u.sub}
                        </span>
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, flexShrink: 0 }}>+{money(u.price)}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {s.step === 5 && service && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ borderRadius: 16, background: "var(--ground)", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <div className="small" style={{ color: "var(--muted)" }}>
                    {service.label} · {vehicle?.label} · {pkg?.label} · {opt?.label}
                    {selectedUpsells.length > 0 ? ` · +${selectedUpsells.length} extra${selectedUpsells.length > 1 ? "s" : ""}` : ""}
                  </div>
                  <div style={{ fontFamily: "var(--font-display), sans-serif", fontSize: 44, fontWeight: 700, lineHeight: 1 }}>
                    {money(displayLow)}–{money(displayHigh)}
                  </div>
                  <div className="small" style={{ color: "var(--muted)" }}>
                    {approve
                      ? "The shop confirms the final price from your details and photos, usually within minutes. You can still hold a spot now."
                      : "Final price confirmed when you arrive. Any change needs your OK first."}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, paddingTop: 2 }}>{service.multiDay ? "Pick a drop-off day" : "Pick a time"}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
                  {slots.map((t) => {
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

            {s.step === 6 && service && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ borderRadius: 16, border: "1px solid var(--line)", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Service</span>
                    <span style={{ fontWeight: 600 }}>{service.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Vehicle</span>
                    <span style={{ fontWeight: 600 }}>{vehicle?.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Package</span>
                    <span style={{ fontWeight: 600 }}>{pkg?.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>{service.optionHeading}</span>
                    <span style={{ fontWeight: 600 }}>{opt?.label}</span>
                  </div>
                  {selectedUpsells.map((u) => (
                    <div key={u.id} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ color: "var(--muted)" }}>{u.label}</span>
                      <span style={{ fontWeight: 600 }}>{money(u.price)}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Time</span>
                    <span style={{ fontWeight: 600 }}>{s.slot}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ color: "var(--muted)" }}>Estimate</span>
                    <span style={{ fontWeight: 600 }}>
                      {money(displayLow)}–{money(displayHigh)}
                    </span>
                  </div>
                  <div style={{ height: 1, background: "var(--line-soft)" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 16 }}>
                    <span style={{ fontWeight: 600 }}>Due now (deposit)</span>
                    <span style={{ fontWeight: 700 }}>{money(deposit)}</span>
                  </div>
                </div>
                <div className="small" style={{ color: "var(--muted)" }}>
                  Your deposit comes off the final bill. If the vehicle differs from what you
                  described, you&apos;ll approve any price change before work starts. Free
                  cancellation up to {SITE.cancellationWindowHours} hours before.
                </div>
              </div>
            )}

            {s.step === 7 && service && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 56, height: 56, borderRadius: 28, background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckIcon />
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>
                  Booked: {service.label.toLowerCase()}, {s.slot}. {money(deposit)} deposit paid.
                </div>
                <div className="small" style={{ color: "var(--muted)" }}>
                  {bookedNote}
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

      {/* Shop phone */}
      <div className={`${styles.phoneCol} ${styles.shopCol}`}>
        <div className={styles.phoneLabel}>Shop&apos;s phone</div>
        <div className={styles.detailerFrame} ref={shopRef}>
          {s.step !== LAST_STEP && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "24px 8px", alignItems: "center", textAlign: "center" }}>
              <BellIcon />
              <div style={{ fontSize: 15, fontWeight: 600 }}>You&apos;re on a job</div>
              <div className="small" style={{ color: "var(--muted-on-dark)" }}>
                {waitingNote}
              </div>
            </div>
          )}
          {s.step === LAST_STEP && service && (
            <div className={styles.bookingCard} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: "var(--signal)" }} />
                <div style={{ fontSize: 15, fontWeight: 600 }}>{approve ? "New booking: needs your price OK" : "New booking"}</div>
              </div>
              <div style={{ borderRadius: 14, background: "var(--ground)", color: "var(--ink)", padding: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  {SITE.customerName} · {s.slot}
                </div>
                <div style={{ fontWeight: 700 }}>{service.label}</div>
                <div>
                  {vehicle?.label} · {pkg?.label}
                </div>
                <div>
                  {service.optionHeading}: {opt?.label}
                  {service.photos ? ` · ${photoCountLabel}` : ""}
                </div>
                {selectedUpsells.length > 0 && <div>Extras: {selectedUpsells.map((u) => u.label).join(", ")}</div>}
                <div>
                  Estimate: {money(displayLow)}–{money(displayHigh)}
                </div>
                <div style={{ fontWeight: 600, color: "var(--accent)" }}>{money(deposit)} deposit paid</div>
              </div>
              {approvePending && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="small" style={{ color: "var(--muted-on-dark)" }}>
                    Big job. Check the details and photos, then confirm the final price:
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => decide("approve")}
                      style={{ flexGrow: 1, minHeight: 46, borderRadius: 12, border: "none", background: "var(--signal)", color: "var(--ink)", fontSize: 14, fontWeight: 600 }}
                    >
                      Approve {money(displayHigh)}
                    </button>
                    <button
                      type="button"
                      onClick={() => decide("adjust")}
                      style={{ flexGrow: 1, minHeight: 46, borderRadius: 12, border: "2px solid var(--muted-on-dark)", background: "transparent", color: "var(--ground)", fontSize: 14, fontWeight: 600 }}
                    >
                      Adjust price
                    </button>
                  </div>
                </div>
              )}
              {approveDone && (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: 12, borderRadius: 12, background: "#1F3A35" }}>
                  <CheckIcon size={20} color="var(--signal)" />
                  <div className="small" style={{ color: "var(--ground)" }}>
                    {approveDoneText}
                  </div>
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
          Prices here are examples. Your page uses your own services, packages, and prices.
        </div>
      </div>
    </div>
  );
}
