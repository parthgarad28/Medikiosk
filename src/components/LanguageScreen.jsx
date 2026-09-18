import { LANGS, UI } from "../data/script.js";

export default function LanguageScreen({ lang, setLang, onNext }) {
  return (
    <div className="screen">
      <div className="eyebrow">Step 1</div>
      <h1 className="screen-title">{UI.chooseLanguage[lang]}</h1>
      <p className="screen-sub">{UI.chooseLanguageSub[lang]}</p>

      <div className="lang-list">
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={`lang-row ${lang === l.code ? "selected" : ""}`}
            onClick={() => setLang(l.code)}
          >
            <span>
              <span className="lang-row-label">{l.label}</span>
              <span className="lang-row-sub">{l.sub}</span>
            </span>
            <span className="mark">●</span>
          </button>
        ))}
      </div>

      <div className="hint-row">
        <span>You can switch language anytime, even mid-conversation.</span>
      </div>

      <button className="big-btn" onClick={onNext}>{UI.continueBtn[lang]}</button>
    </div>
  );
}
