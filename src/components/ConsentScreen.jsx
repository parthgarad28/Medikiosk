import { UI, LANGS } from "../data/script.js";

export default function ConsentScreen({ lang, agreed, setAgreed, onNext, speak, speaking }) {
  const voiceLang = LANGS.find((l) => l.code === lang).voice;

  return (
    <div className="screen">
      <div className="eyebrow">Step 2</div>
      <h1 className="screen-title">{UI.consentTitle[lang]}</h1>

      <div className="consent-block">
        <button className="audio-line" onClick={() => speak(UI.consentText[lang], voiceLang)}>
          <span className={`audio-dot ${speaking ? "pulsing" : ""}`} />
          <span>{speaking ? "Playing..." : UI.consentPlay[lang]}</span>
        </button>
        <p className="consent-text">{UI.consentText[lang]}</p>
      </div>

      <button className="consent-check-row" onClick={() => setAgreed(!agreed)}>
        <span className={`checkbox ${agreed ? "checked" : ""}`}>
          {agreed && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
        </span>
        <span>{UI.consentAgree[lang]}</span>
      </button>

      <button className="big-btn" disabled={!agreed} onClick={onNext}>{UI.continueBtn[lang]}</button>
    </div>
  );
}
