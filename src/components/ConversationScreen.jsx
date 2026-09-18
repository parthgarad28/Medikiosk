import { useEffect, useRef, useState } from "react";
import { Mic, Square, AlertCircle, Volume2 } from "lucide-react";
import { QUESTIONS, CLOSING_LINE, UI, LANGS } from "../data/script.js";

export default function ConversationScreen({ lang, speech, onDone }) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [typedFallback, setTypedFallback] = useState("");
  const chatEndRef = useRef(null);
  const lastSpokenFor = useRef({ index: -1, lang: null });

  const voiceLang = LANGS.find((l) => l.code === lang).voice;
  const currentQ = QUESTIONS[qIndex];
  const finished = qIndex >= QUESTIONS.length;

  useEffect(() => {
    if (finished) {
      speech.speak(CLOSING_LINE[lang], voiceLang);
      return;
    }
    const already = lastSpokenFor.current.index === qIndex && lastSpokenFor.current.lang === lang;
    if (!already) {
      speech.speak(currentQ.text[lang], voiceLang);
      lastSpokenFor.current = { index: qIndex, lang };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, lang, finished]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [qIndex, answers]);

  function recordAnswer(text) {
    if (!text || !text.trim()) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: text }));
    setTypedFallback("");
    setTimeout(() => setQIndex((i) => i + 1), 500);
  }

  function handleMicClick() {
    if (speech.listening) {
      speech.stopListening();
      if (speech.liveTranscript.trim()) recordAnswer(speech.liveTranscript);
      return;
    }
    speech.stopSpeaking();
    speech.setError(null);
    speech.startListening(voiceLang, (finalText) => recordAnswer(finalText));
  }

  const history = QUESTIONS.slice(0, qIndex).map((q) => ({ question: q.text[lang], answer: answers[q.id] }));

  return (
    <div className="conv-screen">
      <div className="conv-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Live Intake</div>
          <h1 className="screen-title small">{UI.interviewTitle[lang]}</h1>
        </div>
        <button
          className="replay-btn"
          onClick={() => speech.speak(finished ? CLOSING_LINE[lang] : currentQ.text[lang], voiceLang)}
          title="Replay question aloud"
        >
          <Volume2 size={14} />
          <span className={`ai-avatar ${speech.speaking ? "pulsing" : ""}`} />
        </button>
      </div>

      {speech.error && (
        <div className="error-banner"><AlertCircle size={14} /><span>{speech.error}</span></div>
      )}

      <div className="chat-log">
        {history.map((h, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <Turn speaker="MediKiosk">{h.question}</Turn>
            <Turn speaker="Patient" role="patient">{h.answer}</Turn>
          </div>
        ))}
        {!finished && <Turn speaker="MediKiosk">{currentQ.text[lang]}</Turn>}
        {finished && <Turn speaker="MediKiosk">{CLOSING_LINE[lang]}</Turn>}
        {speech.listening && <Turn speaker="Patient" role="patient" pending>{speech.liveTranscript || "listening..."}</Turn>}
        <div ref={chatEndRef} />
      </div>

      {!finished ? (
        <div className="mic-area">
          {speech.supported ? (
            <>
              <div className="mic-row">
                <button className={`mic-btn ${speech.listening ? "listening" : ""}`} onClick={handleMicClick}>
                  {speech.listening ? <Square size={18} color="#fff" /> : <Mic size={20} color="#fff" />}
                </button>
                <span className="mic-hint">{speech.listening ? UI.listening[lang] + " — tap to stop" : UI.tapToSpeak[lang]}</span>
              </div>
              <FallbackTyper value={typedFallback} setValue={setTypedFallback} onSubmit={recordAnswer} />
            </>
          ) : (
            <FallbackTyper value={typedFallback} setValue={setTypedFallback} onSubmit={recordAnswer} />
          )}
        </div>
      ) : (
        <button className="big-btn" onClick={onDone}>{UI.generateSummary[lang]}</button>
      )}
    </div>
  );
}

function FallbackTyper({ value, setValue, onSubmit }) {
  return (
    <form className="fallback-form" style={{ marginTop: 14 }} onSubmit={(e) => { e.preventDefault(); if (value.trim()) onSubmit(value.trim()); }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="or type instead..." />
      <button type="submit">→</button>
    </form>
  );
}

function Turn({ speaker, role = "ai", children, pending }) {
  if (!children) return null;
  return (
    <div className={`turn ${role}`}>
      <div className="turn-speaker">{speaker}</div>
      <div className={`turn-text ${pending ? "pending" : ""}`}>{children}</div>
    </div>
  );
}
