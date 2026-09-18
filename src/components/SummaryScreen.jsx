import { useEffect, useState } from "react";
import { DEMO_SUMMARY, UI } from "../data/script.js";

export default function SummaryScreen({ lang, onRestart }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen">
      <div className="eyebrow">Step 5</div>
      <h1 className="screen-title">{UI.summaryTitle[lang]}</h1>

      {!ready ? (
        <div className="spinner-wrap">
          <div className="spinner-line" />
          <div className="spinner-caption">{UI.summaryGenerating[lang]}</div>
        </div>
      ) : (
        <div className="record-card">
          <div className="record-tag">● ABHA-linked · FHIR R4</div>
          <Row label="Chief Complaint" value={DEMO_SUMMARY.complaint[lang]} />
          <Row label="History" value={DEMO_SUMMARY.history[lang]} />
          <Row label="Medication" value={DEMO_SUMMARY.meds[lang]} />
          <Row label="Allergies" value={DEMO_SUMMARY.allergy[lang]} />

          <div className="trust-line">
            <span>{UI.summaryFooter[lang]}</span>
          </div>
          <button className="text-link-btn" onClick={onRestart}>{UI.restart[lang]}</button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="record-row">
      <div className="record-label">{label}</div>
      <div className="record-value">{value}</div>
    </div>
  );
}
