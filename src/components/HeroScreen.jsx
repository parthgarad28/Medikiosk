export default function HeroScreen({ onNext }) {
  return (
    <div className="hero-screen">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <PulseLine />

      <div className="hero-eyebrow">SwasthSethu / MediKiosk</div>
      <h1 className="hero-title">
        The history your <em>doctor</em> never has time to ask.
      </h1>
      <p className="hero-sub">
        MediKiosk listens to your patient before you walk in — in their own
        language — and hands you a structured history, not another form to read.
      </p>
      <div className="hero-meta">
        <span><b>3</b> languages, live</span>
        <span><b>~2 min</b> avg. India OPD consult</span>
        <span><b>0</b> typing required</span>
      </div>
      <div className="hero-cta">
        <button className="big-btn" onClick={onNext}>Begin</button>
      </div>
    </div>
  );
}

// A slow, looping ECG/heartbeat line — quiet ambient motion that reinforces
// "this is listening" without being a distracting animation.
function PulseLine() {
  return (
    <svg className="pulse-line" viewBox="0 0 600 60" preserveAspectRatio="none">
      <polyline
        points="0,30 120,30 145,10 165,50 190,30 600,30"
        fill="none"
        stroke="var(--teal)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
