"use client";

import { SERVICES } from "@/lib/services";

export const SELECT_SERVICE_EVENT = "select-service";

export default function HeroServiceChips() {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", paddingTop: 12 }}>
      <span style={{ fontSize: 14, color: "var(--muted)", marginRight: 4 }}>Jump into the demo for:</span>
      {SERVICES.map((svc) => (
        <a
          key={svc.id}
          href="#demo"
          className="chip"
          onClick={() => {
            window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: svc.id }));
          }}
        >
          {svc.label}
        </a>
      ))}
    </div>
  );
}
