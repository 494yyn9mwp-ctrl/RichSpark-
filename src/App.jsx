import { useEffect, useMemo, useState } from "react";
import { WHEEL_QUEUE } from "./wheelQueue.js";

const RUN_STARTED_AT = Date.now();
const JACKSON_MS = 20 * 60 * 1000;
const GREEN = "#39e58c";
const GOLD = "#fbbf24";
const FORM_ENDPOINT = "https://formsubmit.co/104ce28d3fddccb3efa1d247aaa6f546";

function categoryCounts(cards) {
  return cards.reduce((acc, card) => {
    acc[card.category] = (acc[card.category] || 0) + 1;
    return acc;
  }, {});
}

function saveLocal(spec) {
  const key = "wheel_specs_v01";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([spec, ...existing], null, 2));
}

async function sendSpec(spec) {
  try {
    await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `🛞 Wheel answer — ${spec.card_id} ${spec.answer}`,
        _template: "table",
        source: "The Wheel v0.1",
        spec_json: JSON.stringify(spec, null, 2),
      }),
    });
  } catch (error) {
    console.warn("Wheel send failed; local copy preserved", error);
  }
}

function buildSpec(card, answer, confidence, receipt) {
  const text = answer === "SKIP"
    ? `Skip on ${card.id}; default ${card.default} runs provisionally.`
    : `${card.question}: ${answer}) ${card.options.find((o) => o.letter === answer)?.text || answer}`;

  return {
    rule: text,
    scope: `Wheel / ${card.category}`,
    confidence,
    timestamp: new Date().toISOString(),
    receipt,
    affected_tags: card.tags,
    card_id: card.id,
    rpm: card.rpm,
    category: card.category,
    answer,
  };
}

export default function App() {
  const [screen, setScreen] = useState("lobby");
  const [deck, setDeck] = useState(WHEEL_QUEUE);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [lastSpec, setLastSpec] = useState(null);
  const [ended, setEnded] = useState(false);
  const [tick, setTick] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setTick(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const cardsLeft = Math.max(deck.length - index, 0);
  const jacksonCount = Math.min(3, (tick - RUN_STARTED_AT) / JACKSON_MS);
  const jacksonLabel = `${jacksonCount.toFixed(1)} / 3 Jacksons`;
  const card = deck[index];
  const counts = categoryCounts(deck.slice(index));
  const pitBoard = jacksonCount >= 3 && !ended;

  function reorderDeck(tags) {
    const rest = deck.slice(index + 1);
    const scored = rest.map((c, originalIndex) => ({
      card: c,
      originalIndex,
      score: c.tags.filter((tag) => tags.includes(tag)).length,
    }));
    scored.sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex);
    setDeck([...deck.slice(0, index + 1), ...scored.map((x) => x.card)]);
  }

  function next(spec) {
    setLastSpec(spec);
    if (spec) {
      saveLocal(spec);
      sendSpec(spec);
      reorderDeck(spec.affected_tags);
    }
    setAnswered((n) => n + 1);
    if (index + 1 >= deck.length) setScreen("complete");
    else setIndex((n) => n + 1);
  }

  function answer(letter) {
    const spec = buildSpec(card, letter, "HIGH", `Wheel tap ${card.id}${letter}`);
    next(spec);
  }

  function skip() {
    const spec = buildSpec(card, "SKIP", "PROVISIONAL", `Wheel skip ${card.id}; default ${card.default}`);
    next(spec);
  }

  function pit() {
    const spec = {
      rule: "PIT ended the run; baton requested.",
      scope: "Wheel run",
      confidence: "HIGH",
      timestamp: new Date().toISOString(),
      receipt: "Wheel PIT button",
      affected_tags: ["pit", "baton", "recovery"],
      answer: "PIT",
    };
    saveLocal(spec);
    sendSpec(spec);
    setEnded(true);
    setScreen("pit");
  }

  function exportLog() {
    const data = localStorage.getItem("wheel_specs_v01") || "[]";
    navigator.clipboard?.writeText(data);
    alert("Wheel log copied. Truck has the receipt.");
  }

  const shell = {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1d2b4f 0%, #0f172a 44%, #080b12 100%)",
    color: "#f8fafc",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  };
  const panel = {
    width: "100%",
    maxWidth: 520,
    minHeight: "82vh",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 30,
    padding: 24,
    background: "rgba(8, 13, 24, .78)",
    boxShadow: "0 30px 90px rgba(0,0,0,.5)",
    display: "flex",
    flexDirection: "column",
  };
  const button = {
    width: "100%",
    border: "1px solid rgba(255,255,255,.16)",
    borderRadius: 18,
    padding: "18px 16px",
    fontSize: 17,
    fontWeight: 800,
    color: "#0b1120",
    background: GREEN,
    marginTop: 12,
    textAlign: "left",
    cursor: "pointer",
  };
  const quiet = { ...button, background: "rgba(255,255,255,.08)", color: "#f8fafc" };

  if (screen === "lobby") return (
    <main style={shell}>
      <section style={panel}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🛞</div>
        <p style={{ letterSpacing: ".18em", color: GREEN, fontWeight: 900, fontSize: 12 }}>STEERING READY</p>
        <h1 style={{ fontSize: 42, lineHeight: 1.02, margin: "8px 0 14px" }}>Tap the Wheel.</h1>
        <p style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.55 }}>Questions available: <b>{deck.length}</b></p>
        <div style={{ display: "grid", gap: 10, margin: "24px 0" }}>
          {Object.entries(counts).map(([name, count]) => (
            <div key={name} style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,.07)", borderRadius: 16, padding: "14px 16px" }}>
              <span>{name}</span><b>{count}</b>
            </div>
          ))}
        </div>
        <button style={{ ...button, textAlign: "center" }} onClick={() => setScreen("card")}>ENTER STEERING</button>
        <p style={{ color: "#94a3b8", marginTop: "auto", fontSize: 12 }}>Report ID pinned here only: WHEEL-v0.1</p>
      </section>
    </main>
  );

  if (screen === "pit" || screen === "complete") return (
    <main style={shell}>
      <section style={panel}>
        <div style={{ fontSize: 48 }}>🌿</div>
        <h1 style={{ fontSize: 38, lineHeight: 1.08 }}>Run complete — porch walk.</h1>
        <p style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.55 }}>Answered {answered}. Cards left {cardsLeft}. The log is saved locally and sent to the crew inbox.</p>
        <button style={button} onClick={exportLog}>Copy Wheel log</button>
        <button style={quiet} onClick={() => { setScreen("lobby"); }}>Back to lobby</button>
        <p style={{ color: "#64748b", marginTop: "auto", fontSize: 12 }}>IDs: WHEEL-v0.1 · {lastSpec?.card_id || "PIT"}</p>
      </section>
    </main>
  );

  if (pitBoard) return (
    <main style={shell}>
      <section style={panel}>
        <p style={{ color: GOLD, fontWeight: 900, letterSpacing: ".14em" }}>PIT BOARD</p>
        <h1 style={{ fontSize: 40, lineHeight: 1.05 }}>Pit board’s out — porch?</h1>
        <p style={{ color: "#cbd5e1", fontSize: 18 }}>You can wave it off. PIT always ends the run.</p>
        <button style={button} onClick={() => setTick(Date.now() - 2.5 * JACKSON_MS)}>Wave it off — keep running</button>
        <button style={quiet} onClick={pit}>PIT</button>
        <p style={{ color: "#94a3b8", marginTop: "auto" }}>{cardsLeft} cards left · {jacksonLabel}</p>
      </section>
    </main>
  );

  return (
    <main style={shell}>
      <section style={panel}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "#94a3b8", fontSize: 13, fontWeight: 800 }}>
          <span>{card.rpm} RPM · {card.category}</span>
          <span>{cardsLeft} left · {jacksonLabel}</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: 34, lineHeight: 1.08, marginBottom: 20 }}>{card.question}</h1>
          {card.options.map((option) => (
            <button key={option.letter} style={button} onClick={() => answer(option.letter)}>
              {option.letter}) {option.text}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button style={{ ...quiet, textAlign: "center", marginTop: 0 }} onClick={skip}>Skip = {card.default}</button>
          <button style={{ ...quiet, textAlign: "center", marginTop: 0, color: "#fecaca" }} onClick={pit}>PIT</button>
        </div>
        <p style={{ color: "#64748b", fontSize: 12, marginTop: 16 }}>ID: {card.id} · Tags: {card.tags.join(", ")}</p>
      </section>
    </main>
  );
}
