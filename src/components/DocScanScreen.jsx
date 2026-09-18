import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { UI } from "../data/script.js";

const EXTRACTED = [
  { key: "Medicine", value: "Atorvastatin 10mg" },
  { key: "Dosage", value: "Once daily, night" },
  { key: "Prescribed", value: "12 Mar 2024" },
  { key: "Clinic", value: "City Care Clinic" },
];

export default function DocScanScreen({ lang, onNext }) {
  const [state, setState] = useState("idle"); // idle | scanning | done

  useEffect(() => {
    if (state !== "scanning") return;
    const t = setTimeout(() => setState("done"), 1900);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <div className="screen">
      <div className="eyebrow">Step 4</div>
      <h1 className="screen-title">{UI.docScanTitle[lang]}</h1>
      <p className="screen-sub">{UI.docScanSub[lang]}</p>

      <div className="scan-stage">
        <div className="scan-photo">
          <div className="scan-photo-icon"><FileText size={16} color="var(--teal-dark)" /></div>
          <div>
            <div className="scan-photo-label">{state === "idle" ? "Waiting for a document" : "Prescription_OldClinic.jpg"}</div>
            {state !== "idle" && <div className="scan-photo-name">Photographed prescription</div>}
          </div>
        </div>

        {state === "scanning" && <div className="scan-line-anim" />}

        {state === "done" && (
          <div style={{ marginTop: 6 }}>
            {EXTRACTED.map((row, i) => (
              <div key={row.key} className="extract-line" style={{ animationDelay: `${i * 0.15}s` }}>
                <span className="extract-key">{row.key}</span>
                <span className="extract-val">{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {state === "done" ? (
        <button className="big-btn" onClick={onNext}>{UI.continueBtn[lang]}</button>
      ) : (
        <>
          <button className="big-btn" disabled={state === "scanning"} onClick={() => setState("scanning")}>
            {state === "scanning" ? UI.scanning[lang] : UI.scanBtn[lang]}
          </button>
          <button className="text-link-btn" onClick={onNext}>{UI.skipDocs[lang]}</button>
        </>
      )}
    </div>
  );
}
