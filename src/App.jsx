import { useState } from "react";
import HeroScreen from "./components/HeroScreen.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import LanguageScreen from "./components/LanguageScreen.jsx";
import ConsentScreen from "./components/ConsentScreen.jsx";
import ConversationScreen from "./components/ConversationScreen.jsx";
import DocScanScreen from "./components/DocScanScreen.jsx";
import SummaryScreen from "./components/SummaryScreen.jsx";
import { useSpeech } from "./useSpeech.js";

const STEPS = ["hero", "language", "consent", "conversation", "docs", "summary"];

export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("mr");
  const [agreed, setAgreed] = useState(false);
  const speech = useSpeech();

  const stepName = STEPS[step];
  const goTo = (name) => setStep(STEPS.indexOf(name));

  function restart() {
    setAgreed(false);
    setStep(0);
  }

  return (
    <div className="app-bg">
      <div className="kiosk-frame">
        <div className="kiosk-topbar">
          <div className="brand"><span className="brand-mark">✦</span> SwasthSethu</div>
          {stepName !== "hero" && (
            <div className="progress-trail">
              <span className="step-label">{step} / {STEPS.length - 1}</span>
              {STEPS.slice(1).map((_, i) => (
                <span key={i} className={`dot ${i < step ? "active" : ""}`} />
              ))}
            </div>
          )}
        </div>

        {stepName !== "hero" && stepName !== "language" && (
          <LanguageSwitcher lang={lang} onChange={setLang} />
        )}

        <div className="kiosk-body">
          {stepName === "hero" && (
            <HeroScreen
              onNext={() => {
                speech.unlockAudio(); // first real click in the app — unlocks speech for everything after
                goTo("language");
              }}
            />
          )}
          {stepName === "language" && (
            <LanguageScreen lang={lang} setLang={setLang} onNext={() => goTo("consent")} />
          )}
          {stepName === "consent" && (
            <ConsentScreen
              lang={lang}
              agreed={agreed}
              setAgreed={setAgreed}
              onNext={() => goTo("conversation")}
              speak={speech.speak}
              speaking={speech.speaking}
            />
          )}
          {stepName === "conversation" && (
            <ConversationScreen lang={lang} speech={speech} onDone={() => goTo("docs")} />
          )}
          {stepName === "docs" && <DocScanScreen lang={lang} onNext={() => goTo("summary")} />}
          {stepName === "summary" && <SummaryScreen lang={lang} onRestart={restart} />}
        </div>
      </div>
    </div>
  );
}
