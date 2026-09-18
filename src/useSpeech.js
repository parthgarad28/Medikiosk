import { useCallback, useEffect, useRef, useState } from "react";

// Wraps the browser's built-in SpeechSynthesis (text -> voice) and
// SpeechRecognition (voice -> text) APIs. No external API, no key needed.
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [error, setError] = useState(null);
  const [voicesReady, setVoicesReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const recognitionRef = useRef(null);
  const keepAliveRef = useRef(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const check = () => {
      if (window.speechSynthesis.getVoices().length > 0) setVoicesReady(true);
    };
    check();
    window.speechSynthesis.onvoiceschanged = check;
  }, []);

  // Chrome (and mobile Safari) block programmatic audio until a REAL user
  // click has played at least one sound. Call this from your very first
  // button's onClick (e.g. the "Begin" button) to unlock speech for the
  // rest of the session — otherwise speak() can silently do nothing.
  const unlockAudio = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    const warmup = new SpeechSynthesisUtterance(" ");
    warmup.volume = 0;
    window.speechSynthesis.speak(warmup);
    setUnlocked(true);
  }, []);

  const speak = useCallback((text, voiceLang) => {
    if (!("speechSynthesis" in window)) {
      setError("This browser doesn't support text-to-speech. Use Chrome.");
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voiceLang;
    utter.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang === voiceLang) || voices.find((v) => v.lang.startsWith(voiceLang.split("-")[0]));
    if (match) utter.voice = match;
    else if (voices.length > 0 && voiceLang !== "en-IN" && voiceLang !== "en-US") {
      setError(`No ${voiceLang} voice found on this device — using the default voice instead.`);
    }

    utter.onstart = () => {
      setSpeaking(true);
      // Chrome has a long-standing bug where speechSynthesis silently stops
      // after ~15 seconds unless you keep "poking" it with pause/resume.
      keepAliveRef.current = setInterval(() => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    };
    utter.onend = () => { setSpeaking(false); clearInterval(keepAliveRef.current); };
    utter.onerror = (e) => {
      setSpeaking(false);
      clearInterval(keepAliveRef.current);
      if (e.error === "not-allowed" || e.error === "interrupted") {
        setError("Speech was blocked by the browser. Tap the screen once, then try again.");
      } else {
        setError("Speech playback failed: " + e.error);
      }
    };

    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utter);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    clearInterval(keepAliveRef.current);
    setSpeaking(false);
  }, []);

  const supported = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

  const startListening = useCallback((voiceLang, onFinalResult) => {
    setError(null);
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError("Voice input isn't supported in this browser. Use Chrome, or type your answer.");
      return;
    }
    const recognition = new SR();
    recognition.lang = voiceLang;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => { setListening(true); setLiveTranscript(""); };
    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) text += event.results[i][0].transcript;
      setLiveTranscript(text);
      if (event.results[event.results.length - 1].isFinal) onFinalResult(text);
    };
    recognition.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setError("Microphone permission was blocked. Click the lock icon in the address bar and allow the microphone.");
      } else if (e.error === "no-speech") {
        setError("Didn't catch that — try again and speak right after tapping the mic.");
      } else if (e.error === "language-not-supported") {
        setError(`Speech recognition doesn't support ${voiceLang} on this device — try English, or type your answer.`);
      } else {
        setError("Voice input error: " + e.error);
      }
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    try { recognition.start(); } catch (err) { setError("Could not start listening: " + err.message); }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  return { speak, stopSpeaking, speaking, startListening, stopListening, listening, liveTranscript, supported, error, setError, voicesReady, unlockAudio, unlocked };
}
