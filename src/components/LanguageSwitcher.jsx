import { LANGS } from "../data/script.js";

export default function LanguageSwitcher({ lang, onChange }) {
  return (
    <div className="lang-switcher">
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={`lang-pill ${lang === l.code ? "active" : ""}`}
          onClick={() => onChange(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
