import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const TABS = [
  { key: "impressum", to: "/impressum" },
  { key: "privacy",   to: "/privacy" },
  { key: "terms",     to: "/terms" },
];

export default function LegalNav({ active }) {
  const { t } = useLanguage();
  const labels = t.legal.nav;

  return (
    <div className="flex gap-0 border-b mb-16" style={{ borderColor: "rgba(18,18,18,0.12)" }}>
      {TABS.map(({ key, to }) => (
        <Link
          key={key}
          to={to}
          className="py-4 px-6 transition-all duration-300"
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: active === key ? "#121212" : "rgba(18,18,18,0.35)",
            borderBottom: active === key ? "1px solid #C8A96A" : "1px solid transparent",
            marginBottom: "-1px",
          }}
          data-testid={`legal-tab-${key}`}
        >
          {labels[key]}
        </Link>
      ))}
    </div>
  );
}
