import { useState } from "react";

const ANIM_CSS = `
@keyframes twinkle {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.85; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes spinRev {
  to { transform: rotate(-360deg); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes fillBar {
  from { width: 0%; }
  to { width: 100%; }
}
@keyframes countAnim {
  from { transform: scale(1.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes overlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scanUp {
  from { top: 105%; }
  to { top: -5%; }
}
@keyframes ripple {
  0% { box-shadow: 0 0 0 0 rgba(0,229,255,0.4); }
  100% { box-shadow: 0 0 0 20px rgba(0,229,255,0); }
}
* { box-sizing: border-box; margin: 0; padding: 0; }
`;

const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  x: ((i * 37.1 + 13) % 100).toFixed(2),
  y: ((i * 67.3 + 7) % 100).toFixed(2),
  size: ((i % 3) * 0.7 + 0.5).toFixed(1),
  opacity: (((i % 5) * 0.12) + 0.15).toFixed(2),
  dur: (((i % 4) * 0.9) + 1.4).toFixed(1),
  delay: ((i % 9) * 0.35).toFixed(1),
  color: i % 11 === 0 ? "#FFD700" : i % 7 === 0 ? "#7B90C8" : "white",
}));

const DESTS = [
  {
    id: "greece",
    icon: "🏛️",
    name: "Ancient Greece",
    tagline: "Myths. Heroes. Monsters.",
    sub: "Olympics · The Odyssey · Democracy",
    year: "~500 BC",
    color: "#3DA8FF",
    glow: "rgba(61,168,255,0.32)",
  },
  {
    id: "rome",
    icon: "🦅",
    name: "Ancient Rome",
    tagline: "Conquer. Build. Rule.",
    sub: "Gladiators · Caesar · The Colosseum",
    year: "~44 BC",
    color: "#FF4A4A",
    glow: "rgba(255,74,74,0.32)",
  },
  {
    id: "classics",
    icon: "📜",
    name: "What is Classics?",
    tagline: "The greatest subject. Ever.",
    sub: "Language · History · Philosophy",
    year: "3000 BC → 500 AD",
    color: "#FFD700",
    glow: "rgba(255,215,0,0.32)",
  },
];

function StarField() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {STARS.map(s => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            background: s.color,
            opacity: s.opacity,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Vortex() {
  const rings = [
    { size: 168, dur: "4s",   color: "#00E5FF", dir: "spin" },
    { size: 136, dur: "3.1s", color: "#7B2FBE", dir: "spinRev" },
    { size: 104, dur: "2.3s", color: "#FFD700", dir: "spin" },
    { size: 72,  dur: "1.6s", color: "#FF4A4A", dir: "spinRev" },
  ];
  return (
    <div style={{
      position: "relative",
      width: 200,
      height: 200,
      margin: "0 auto",
      animation: "float 5s ease-in-out infinite",
    }}>
      {rings.map((r, i) => {
        const offset = (200 - r.size) / 2;
        return (
          <div key={i} style={{
            position: "absolute",
            top: offset,
            left: offset,
            width: r.size,
            height: r.size,
            borderRadius: "50%",
            border: `2px solid ${r.color}`,
            animation: `${r.dir} ${r.dur} linear infinite`,
            boxShadow: `0 0 8px ${r.color}, inset 0 0 6px ${r.color}33`,
          }} />
        );
      })}
      <div style={{
        position: "absolute",
        top: 72, left: 72,
        width: 56, height: 56,
        borderRadius: "50%",
        background: "radial-gradient(circle, #fff 0%, #00E5FF 35%, #7B2FBE 65%, transparent 100%)",
        animation: "pulse 2.5s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        lineHeight: 1,
      }}>
        ⏱️
      </div>
    </div>
  );
}

function GaugeCircle({ label, pct, color }) {
  const r = 29;
  const circ = 2 * Math.PI * r;
  const filled = circ * (pct / 100);
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#0F1A35" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r}
          fill="none" stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ - filled}`}
          transform="rotate(-90 36 36)"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
        <text x="36" y="41" textAnchor="middle" fill={color} fontSize="11"
          fontFamily="monospace" fontWeight="bold">{pct}%</text>
      </svg>
      <div style={{
        color: "#1E3060",
        fontSize: 7,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginTop: -3,
      }}>
        {label}
      </div>
    </div>
  );
}

function SidePanel({ gauges }) {
  return (
    <div style={{
      width: 94,
      flexShrink: 0,
      background: "#060C1E",
      border: "1px solid #152040",
      borderRadius: 10,
      padding: "10px 8px",
    }}>
      <div style={{
        textAlign: "center",
        color: "#1A2E50",
        fontSize: 7,
        letterSpacing: "0.1em",
        borderBottom: "1px solid #0F1A35",
        paddingBottom: 6,
        marginBottom: 8,
      }}>
        ▸ GAUGES ◂
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {gauges.map(g => <GaugeCircle key={g.label} {...g} />)}
      </div>
    </div>
  );
}

function DestCard({ dest, onTravel, disabled }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={() => !disabled && onTravel(dest)}
      style={{
        flex: 1,
        background: hovered
          ? `linear-gradient(160deg, ${dest.color}1A, ${dest.color}30, #060C1E)`
          : "#060C1E",
        border: `2px solid ${hovered ? dest.color : dest.color + "55"}`,
        borderRadius: 14,
        padding: "22px 14px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.22s ease",
        boxShadow: hovered
          ? `0 0 30px ${dest.glow}, 0 0 70px ${dest.glow.replace("0.32", "0.08")}`
          : `0 0 12px ${dest.glow}`,
        transform: pressed ? "scale(0.96)" : hovered && !disabled ? "translateY(-4px) scale(1.02)" : "none",
        opacity: disabled ? 0.4 : 1,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        minHeight: 220,
      }}
    >
      <div style={{
        fontSize: 46,
        lineHeight: 1,
        animation: hovered ? "pulse 1s ease-in-out infinite" : "none",
      }}>
        {dest.icon}
      </div>

      <div style={{
        color: dest.color,
        fontSize: 13,
        fontWeight: "bold",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontFamily: "monospace",
        textShadow: hovered ? `0 0 14px ${dest.color}` : "none",
        transition: "text-shadow 0.3s",
        lineHeight: 1.35,
      }}>
        {dest.name}
      </div>

      <div style={{
        color: "#A8BCD8",
        fontSize: 12,
        fontStyle: "italic",
        fontFamily: "Georgia, serif",
      }}>
        "{dest.tagline}"
      </div>

      <div style={{
        color: "#304868",
        fontSize: 9,
        letterSpacing: "0.07em",
        fontFamily: "monospace",
      }}>
        {dest.sub}
      </div>

      <div style={{
        padding: "3px 10px",
        background: `${dest.color}15`,
        border: `1px solid ${dest.color}45`,
        borderRadius: 5,
        color: dest.color,
        fontSize: 8,
        letterSpacing: "0.1em",
        fontFamily: "monospace",
      }}>
        📅 {dest.year}
      </div>

      <div style={{
        marginTop: "auto",
        padding: "8px 16px",
        background: hovered ? dest.color : `${dest.color}15`,
        color: hovered ? "#000" : dest.color,
        fontWeight: "bold",
        fontSize: 9,
        letterSpacing: "0.12em",
        borderRadius: 7,
        fontFamily: "monospace",
        transition: "all 0.22s",
        border: `1px solid ${dest.color}`,
        animation: hovered ? "ripple 1.5s ease-out infinite" : "none",
      }}>
        ▶ ENGAGE TIME DRIVE
      </div>
    </button>
  );
}

function TravelOverlay({ dest, countdown, done }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: "rgba(3,5,18,0.94)",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      animation: "overlayIn 0.3s ease",
    }}>
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${dest.color}, transparent)`,
        animation: "scanUp 2s linear infinite",
        opacity: 0.65,
      }} />

      <div style={{ fontSize: 76, animation: "pulse 0.9s ease-in-out infinite", marginBottom: 18 }}>
        {dest.icon}
      </div>

      <div style={{
        color: dest.color,
        fontSize: 22,
        fontWeight: "bold",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        fontFamily: "monospace",
        textShadow: `0 0 18px ${dest.color}, 0 0 38px ${dest.color}70`,
        marginBottom: 8,
        animation: "pulse 1.8s ease-in-out infinite",
      }}>
        ⚡ TIME TRAVEL INITIATED ⚡
      </div>

      <div style={{
        color: "#3A5880",
        fontSize: 10,
        letterSpacing: "0.28em",
        fontFamily: "monospace",
        marginBottom: 40,
        textTransform: "uppercase",
      }}>
        DESTINATION LOCKED → {dest.name.toUpperCase()}
      </div>

      {!done ? (
        <div
          key={countdown}
          style={{
            fontSize: 100,
            color: dest.color,
            fontWeight: "bold",
            fontFamily: "monospace",
            textShadow: `0 0 30px ${dest.color}`,
            lineHeight: 1,
            animation: "countAnim 0.45s ease-out",
            marginBottom: 32,
          }}
        >
          {countdown}
        </div>
      ) : (
        <div style={{
          fontSize: 19,
          color: "#00FF88",
          fontFamily: "monospace",
          letterSpacing: "0.22em",
          animation: "overlayIn 0.5s ease",
          marginBottom: 32,
        }}>
          🚀 ARRIVING IN THE ANCIENT WORLD...
        </div>
      )}

      <div style={{ width: 340, height: 5, background: "#0F1A35", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          borderRadius: 3,
          background: `linear-gradient(90deg, ${dest.color}, white)`,
          animation: "fillBar 3s linear forwards",
          boxShadow: `0 0 8px ${dest.color}`,
        }} />
      </div>
      <div style={{
        marginTop: 10,
        color: "#182840",
        fontSize: 8,
        letterSpacing: "0.15em",
        fontFamily: "monospace",
      }}>
        TEMPORAL SYNCHRONISATION IN PROGRESS
      </div>
    </div>
  );
}

export default function App() {
  const [traveling, setTraveling] = useState(false);
  const [overlay, setOverlay] = useState(null);

  const handleTravel = (dest) => {
    if (traveling) return;
    setTraveling(true);
    setOverlay({ dest, countdown: 3, done: false });

    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(timer);
        setOverlay(prev => prev ? { ...prev, countdown: 0, done: true } : null);
        setTimeout(() => {
          setOverlay(null);
          setTraveling(false);
        }, 2100);
      } else {
        setOverlay(prev => prev ? { ...prev, countdown: count } : null);
      }
    }, 1000);
  };

  const leftGauges = [
    { label: "FLUX CORE",  pct: 87,  color: "#00E5FF" },
    { label: "CHRONO PWR", pct: 64,  color: "#FFD700" },
    { label: "TIME SEAL",  pct: 95,  color: "#00FF88" },
  ];
  const rightGauges = [
    { label: "PARADOX",   pct: 100, color: "#00FF88" },
    { label: "STABILITY", pct: 73,  color: "#FF4A4A" },
    { label: "SIGNAL",    pct: 91,  color: "#7B2FBE" },
  ];

  return (
    <>
      <style>{ANIM_CSS}</style>
      <div style={{
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 18%, #0C1245 0%, #060816 55%, #020408 100%)",
        fontFamily: "monospace",
        overflow: "hidden",
      }}>
        <StarField />

        {overlay && (
          <TravelOverlay
            dest={overlay.dest}
            countdown={overlay.countdown}
            done={overlay.done}
          />
        )}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 920, margin: "0 auto", padding: "16px 16px 0" }}>

          {/* STATUS BAR */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#050B1C",
            border: "1px solid #152040",
            borderRadius: 8,
            padding: "8px 18px",
            marginBottom: 20,
          }}>
            <div style={{ display: "flex", gap: 18 }}>
              {[
                { label: "POWER", color: "#00FF88" },
                { label: "FLUX",  color: "#FFD700" },
                { label: "WARP",  color: "#00E5FF" },
              ].map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{
                    width: 7, height: 7,
                    borderRadius: "50%",
                    background: s.color,
                    boxShadow: `0 0 5px ${s.color}`,
                    animation: "pulse 2s ease-in-out infinite",
                    animationDelay: `${i * 0.6}s`,
                  }} />
                  <span style={{ color: "#1C3458", fontSize: 8, letterSpacing: "0.07em" }}>
                    {s.label}: ONLINE
                  </span>
                </div>
              ))}
            </div>
            <div style={{
              color: "#00E5FF",
              fontSize: 8,
              letterSpacing: "0.22em",
              animation: "blink 1.4s step-end infinite",
            }}>
              ▶ TEMPORAL ENGINE ACTIVE ◀
            </div>
            <div style={{ color: "#1C3458", fontSize: 8, letterSpacing: "0.05em" }}>
              COORD: 51.5°N / 0.1°W
            </div>
          </div>

          {/* TITLE */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ color: "#182C50", fontSize: 9, letterSpacing: "0.4em", marginBottom: 10 }}>
              ── TEMPORAL NAVIGATION SYSTEM v3.14 ──
            </div>
            <h1 style={{
              fontSize: "clamp(1.7rem, 4vw, 3rem)",
              fontWeight: 900,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              margin: "0 0 12px",
              background: "linear-gradient(90deg, #FFD700 0%, #00E5FF 48%, #FFD700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              The Classics Time Machine
            </h1>
            <p style={{
              color: "#5A7298",
              fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
              letterSpacing: "0.05em",
            }}>
              🚀 Strap in. You're about to travel{" "}
              <span style={{ color: "#00E5FF" }}>2,500 years</span> into the past. Do you dare?
            </p>
          </div>

          {/* MAIN DASHBOARD */}
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
            <SidePanel gauges={leftGauges} />
            <div style={{ flex: 1, textAlign: "center" }}>
              <Vortex />
              <div style={{
                color: "#182C50",
                fontSize: 9,
                letterSpacing: "0.3em",
                marginTop: 12,
                textTransform: "uppercase",
              }}>
                ▼ Select your destination below ▼
              </div>
            </div>
            <SidePanel gauges={rightGauges} />
          </div>

          {/* DESTINATION CARDS */}
          <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
            {DESTS.map(d => (
              <DestCard key={d.id} dest={d} onTravel={handleTravel} disabled={traveling} />
            ))}
          </div>

          {/* BOTTOM STATUS METERS */}
          <div style={{
            background: "#050B1C",
            border: "1px solid #152040",
            borderRadius: 10,
            padding: "12px 20px",
            marginBottom: 20,
          }}>
            <div style={{
              textAlign: "center",
              color: "#182C50",
              fontSize: 7,
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}>
              ── SHIP DIAGNOSTICS ──
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                { label: "ADVENTURE LEVEL",  pct: 100, color: "#00FF88" },
                { label: "FUN QUOTIENT",      pct: 97,  color: "#FFD700" },
                { label: "HISTORY UNLOCKED",  pct: 0,   color: "#00E5FF" },
                { label: "DANGER RATING",     pct: 42,  color: "#FF4A4A" },
              ].map(m => (
                <div key={m.label} style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "#6A88B0", fontSize: 8, letterSpacing: "0.05em" }}>{m.label}</span>
                    <span style={{ color: m.color, fontSize: 8, textShadow: `0 0 6px ${m.color}` }}>{m.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: "#0F1A35", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      width: `${m.pct}%`,
                      height: "100%",
                      background: m.color,
                      borderRadius: 2,
                      boxShadow: `0 0 6px ${m.color}`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <footer style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #152040",
          background: "#030610",
          padding: "14px 20px",
          textAlign: "center",
        }}>
          <p style={{
            color: "#7A9CC8",
            fontSize: 12,
            letterSpacing: "0.15em",
            fontFamily: "monospace",
            textShadow: "0 0 12px rgba(122,156,200,0.4)",
          }}>
            My great classics — a learning experience of classics
          </p>
        </footer>
      </div>
    </>
  );
}
