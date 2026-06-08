import { useState } from "react";

const QUESTIONS = [
  { section: "Agency", sectionLabel: "Let's start with you.", question: "When was the last time you made a conscious decision that significantly changed the direction of your life?", options: [{ letter: "A", text: "Recently — I can point to it clearly." }, { letter: "B", text: "A while back, but it still echoes." }, { letter: "C", text: "Honestly, I'm not sure I've made one like that yet." }] },
  { section: "Agency", sectionLabel: "Let's start with you.", question: "When was the last time you bet on yourself before you felt ready?", options: [{ letter: "A", text: "Within the last year." }, { letter: "B", text: "A few years ago." }, { letter: "C", text: "It's been a long time." }] },
  { section: "Agency", sectionLabel: "Let's start with you.", question: "Think about a win you're proud of. What played the biggest role?", options: [{ letter: "A", text: "I took action before I had all the answers." }, { letter: "B", text: "I stayed consistent longer than most people would." }, { letter: "C", text: "Someone else pushed me to do it." }] },
  { section: "Agency", sectionLabel: "Let's start with you.", question: "When life improved in a meaningful way, what usually caused it?", options: [{ letter: "A", text: "A decision I made." }, { letter: "B", text: "A habit I changed." }, { letter: "C", text: "A circumstance outside my control." }] },
  { section: "Agency", sectionLabel: "Let's start with you.", question: "Have you ever surprised yourself with what you were capable of?", options: [{ letter: "A", text: "More than once." }, { letter: "B", text: "Once or twice." }, { letter: "C", text: "Not really." }] },
  { section: "Agency", sectionLabel: "Let's start with you.", question: "When you look back at your biggest positive changes, what was usually the spark?", options: [{ letter: "A", text: "I got fed up and decided enough was enough." }, { letter: "B", text: "Someone believed in me before I believed in myself." }, { letter: "C", text: "I stumbled into it — right place, right time." }] },
  { section: "Pain", sectionLabel: "Let's get honest.", question: "How often does your income feel like an accurate reflection of your value as a person?", options: [{ letter: "A", text: "Rarely or never." }, { letter: "B", text: "Sometimes, but not consistently." }, { letter: "C", text: "It used to, but not anymore." }] },
  { section: "Pain", sectionLabel: "Let's get honest.", question: "How long have you felt like you're capable of more than your current situation shows?", options: [{ letter: "A", text: "A year or two." }, { letter: "B", text: "Several years." }, { letter: "C", text: "Honestly, most of my adult life." }] },
  { section: "Pain", sectionLabel: "Let's get honest.", question: "Which of these feels most true about you right now?", options: [{ letter: "A", text: "I know I can make more — I just don't know where to focus." }, { letter: "B", text: "I start things but rarely stick with them long enough." }, { letter: "C", text: "I consume way more information than I actually implement." }, { letter: "D", text: "I secretly worry I'm not as capable as I think I am." }] },
  { section: "Pain", sectionLabel: "Let's get honest.", question: "Have you been waiting for the world to notice how valuable you are?", options: [{ letter: "A", text: "Honestly, yes — I always felt like it was only a matter of time." }, { letter: "B", text: "Maybe — I've expected things to work out more than I've made them work out." }, { letter: "C", text: "No — but I still haven't figured out how to make it happen myself." }] },
  { section: "Pain", sectionLabel: "Let's get honest.", question: "If nothing changes in the next five years — same income, same patterns, same waiting — how does that feel to sit with right now?", options: [{ letter: "A", text: "Uncomfortable but manageable." }, { letter: "B", text: "Honestly terrifying." }, { letter: "C", text: "Like something I absolutely refuse to accept." }, { letter: "D", text: "I can't even let myself think about it." }] },
  { section: "Mirror", sectionLabel: "Now let's find you.", question: "When you walk into a room full of strangers, what do you naturally notice first?", options: [{ letter: "A", text: "Who seems interesting." }, { letter: "B", text: "Who seems uncomfortable." }, { letter: "C", text: "How people are interacting." }, { letter: "D", text: "What's possible here." }] },
  { section: "Mirror", sectionLabel: "Now let's find you.", question: "People tend to come to you for…", options: [{ letter: "A", text: "Practical advice." }, { letter: "B", text: "Encouragement." }, { letter: "C", text: "New ideas." }, { letter: "D", text: "Calm during chaos." }] },
  { section: "Mirror", sectionLabel: "Now let's find you.", question: "Which compliment sticks with you the longest?", options: [{ letter: "A", text: "\"You're smart.\"" }, { letter: "B", text: "\"You helped me.\"" }, { letter: "C", text: "\"You inspired me.\"" }, { letter: "D", text: "\"You saw something nobody else saw.\"" }] },
  { section: "Mirror", sectionLabel: "Now let's find you.", question: "What frustrates you most when talking with people?", options: [{ letter: "A", text: "They won't take action." }, { letter: "B", text: "They won't think for themselves." }, { letter: "C", text: "They can't see what's possible." }, { letter: "D", text: "They quit too early." }, { letter: "E", text: "They blame everyone else for where they are." }] },
  { section: "Mirror", sectionLabel: "Now let's find you.", question: "When you help someone solve a problem, what feels best?", options: [{ letter: "A", text: "Giving them the exact fix so they can move on." }, { letter: "B", text: "Asking the one question that makes everything click for them." }, { letter: "C", text: "Showing them a completely different way to see the situation." }, { letter: "D", text: "Being the calm presence while they work through it themselves." }] },
  { section: "Mirror", sectionLabel: "Now let's find you.", question: "Have you ever explained your idea to someone, watched their eyes glaze over, and thought — they'll understand when they see it working?", options: [{ letter: "A", text: "Yes — more times than I can count." }, { letter: "B", text: "Once or twice." }, { letter: "C", text: "No — I usually wait until I have proof before I share." }] },
  { section: "Mirror", sectionLabel: "Now let's find you.", question: "If you could spend the next five years becoming known for one thing, what would feel most meaningful?", options: [{ letter: "A", text: "Solving important problems." }, { letter: "B", text: "Improving people's lives." }, { letter: "C", text: "Creating something remarkable." }, { letter: "D", text: "Opening people's eyes to new possibilities." }] },
  { section: "Outcome", sectionLabel: "Let's talk about what's on the other side.", question: "If your income was handled — not wealthy, just handled — what's the first area where you'd feel relief?", options: [{ letter: "A", text: "Unexpected bills and emergencies — handled without panic." }, { letter: "B", text: "I'm able to keep pace without feeling behind everyone else." }, { letter: "C", text: "I'm able to fully show up for the people I love." }, { letter: "D", text: "The feeling that time is running out finally quiets down." }] },
  { section: "Outcome", sectionLabel: "Let's talk about what's on the other side.", question: "Imagine it's one year from now and something finally clicked. What changed first?", options: [{ letter: "A", text: "My income." }, { letter: "B", text: "My confidence." }, { letter: "C", text: "My consistency." }, { letter: "D", text: "My clarity." }] },
  { section: "Outcome", sectionLabel: "Let's talk about what's on the other side.", question: "What would financial freedom actually feel like on a random Wednesday morning?", options: [{ letter: "A", text: "Waking up without dread." }, { letter: "B", text: "Making a decision without checking my bank account first." }, { letter: "C", text: "Feeling like my life finally matches who I actually am." }, { letter: "D", text: "All of the above." }] },
  { section: "Outcome", sectionLabel: "Let's talk about what's on the other side.", question: "If the financial result was guaranteed, what conversation would you have first?", options: [{ letter: "A", text: "The one with myself about what I actually want next." }, { letter: "B", text: "The one with someone I love about the future we're about to build." }, { letter: "C", text: "The one where I finally give something up that looks good but keeps me stuck." }, { letter: "D", text: "Honestly — I'm not sure I believe I deserve the guarantee yet." }] },
  { section: "Outcome", sectionLabel: "Let's talk about what's on the other side.", question: "How often do you trust yourself to figure things out after you start?", options: [{ letter: "A", text: "Almost always — I find a way." }, { letter: "B", text: "Sometimes, but I second-guess myself a lot." }, { letter: "C", text: "Rarely — I need to feel ready first." }] },
];

const DIAGNOSES = {
  focus: {
    headline: "You don't have an opportunity problem.",
    subheadline: "You have a focus problem.",
    evidence: "Your answers showed curiosity, range, and genuine capability. You can see ten paths at once — which means you've been standing at the intersection instead of walking down any of them. That's not confusion. That's too much opportunity with no commitment mechanism.",
    cost: "Every month spent searching for the perfect path is a month not collecting feedback from the imperfect one.",
    reflection: "What's interesting about your answers is that none of them pointed to a lack of ability. They pointed to a surplus of possibility. You're not stuck because you can't — you're stuck because you can see too many versions of forward at once. The people who win aren't the ones who find the perfect path. They're the ones who pick one and let it teach them. You already have everything you need to start. What you need now is a smaller target.",
  },
  action: {
    headline: "You don't have a knowledge problem.",
    subheadline: "You have an action problem.",
    evidence: "Your answers pointed toward someone who understands the landscape — but stops before shipping. You've likely started more than you've finished. Not because you're lazy. Because putting something real into the world means it can fail for real. And that's a different kind of scary.",
    cost: "The gap between knowing and doing doesn't close with more information. It closes with one imperfect move.",
    reflection: "You've been in the research phase long enough that it's starting to feel like progress. It isn't. Your answers showed someone who knows what needs to happen — but keeps finding reasons why right now isn't quite the moment. Here's what's true: the version of you that knows what to do next exists. They're just on the other side of one shipped thing. Not a perfect thing. A real thing. The cost of waiting isn't just time. It's the compounding confidence you'd be building if you'd already started.",
  },
  trust: {
    headline: "You don't have a capability problem.",
    subheadline: "You have a trust problem.",
    evidence: "Your answers showed real wins in your past — moments where you figured things out, stayed consistent, surprised yourself. But somewhere you stopped trusting that those moments were repeatable. You've been waiting to feel ready again. That feeling isn't coming before you start.",
    cost: "Certainty isn't the prerequisite. It's the reward. And it only shows up on the other side of the first step.",
    reflection: "Your past answers told a story your present answers forgot. You've surprised yourself before. You've figured things out after you started. You've stayed consistent when it was hard. That person didn't leave — they just got quieter while you waited to feel certain again. Certainty doesn't work that way. It never did. The version of you that trusted yourself enough to move? They're still in there. They just need one small proof point to come back online.",
  },
  belief: {
    headline: "You don't have a strategy problem.",
    subheadline: "You have a belief problem.",
    evidence: "Your answers revealed someone who has seen their own potential clearly for a long time — but has been quietly waiting for the world to confirm it. You've expected things to work out more than you've made them work out. That's not weakness. That's what happens when you're wired for big things but haven't built the structure to carry them yet.",
    cost: "Nobody is coming to confirm what you already know about yourself. That part is yours to claim.",
    reflection: "You saw your potential so clearly. You just assumed the world would see it too. That's not arrogance — that's a kind of faith. But faith without a structure to carry it eventually becomes waiting. And waiting has a cost you've probably already felt. The world doesn't discover people. It responds to them. The difference between where you are and where you know you could be isn't talent — it's the decision to stop waiting for confirmation that was never coming anyway.",
  },
};

const REFLECTIONS = {
  "focus+Catalyst": "You keep telling yourself you're exploring. What you're actually doing is avoiding the grief of choosing. Because the moment you choose one path, every other path becomes unavailable for a while — and that's uncomfortable for someone who can see possibilities everywhere. You're like a magnifying glass moving across a field on a sunny day. The light is powerful enough to start a fire. But it only works if it stays still. The frustrating part? You've probably already known which idea deserves your full attention. You've just been hoping another one would come along and make the decision easier.",

  "focus+Builder": "Your workbench is covered in half-finished projects, and you keep starting new ones instead of finishing what's already there. A carpenter who never delivers a cabinet doesn't have a skill problem. They have a completion problem. The version of you that ships things is more valuable than the version that knows how. You probably already know which project deserves to be finished first. You've known for a while. The question isn't when you'll be ready. It's what you're protecting yourself from by staying busy.",

  "focus+Guide": "You care about everyone's problem equally — which means, in practice, you've been helping everyone a little and no one enough. A guide who tries to walk every trail simultaneously isn't guiding. They're wandering with good intentions. The people who need you most don't need you everywhere. They need you to pick them. When you specialize, you don't abandon everyone else. You finally become useful enough to actually change something.",

  "focus+Explorer": "You have a habit of falling in love with horizons. The problem with horizons is that they move. Every time you get close enough to discover whether something will actually work, another possibility appears in the distance. From far away, all roads look equally promising — that's why standing at the intersection feels productive. But roads only reveal themselves to people willing to look foolish long enough to walk them. You don't need a better map. You need enough courage to stop shopping for one.",

  "action+Catalyst": "You're exceptional at seeing what other people need to do next. You've probably given someone advice in the last week that changed how they saw their situation. What you haven't done is apply that same clarity to your own next move. There's a word for someone who can diagnose everyone else's problem but not their own. That word is stuck. You already know what the first step is. The question is why you're still describing it instead of taking it.",

  "action+Builder": "You have a private collection of unfinished potential. Projects. Ideas. Plans. Little monuments to versions of yourself that were going to start soon. A builder can spend years studying architecture without ever creating a house someone can walk into. Eventually the learning stops being preparation and starts becoming camouflage. The market cannot reward what only exists in your head. And your confidence will never come from thinking about the work. It comes from surviving the embarrassment of doing it badly at first.",

  "action+Guide": "You've walked with people through hard things — and they came out the other side changed. But you've been giving that away in conversations with no next step, no price, and no trail anyone can follow. At some point, the generosity stops being generosity. It becomes a way to feel useful without being accountable. The help you're already giving is worth paying for. The only thing missing is a door people can walk through to get to it.",

  "action+Explorer": "You've been collecting insights the way some people collect books they never read. Shelf after shelf of valuable territory — mapped, charted, understood — but not yet shared. At some point, the explorer has to stop exploring long enough to show someone else what they found. That's not settling. That's the whole point of the expedition. What you already know right now is worth more than you're currently charging for it. Which is nothing.",

  "trust+Catalyst": "You've sparked real things in real people — you know what it feels like when something clicks for someone because of something you said. But you've started requiring certainty before you show up, and that's not how sparks work. A lighter that only works when conditions are perfect isn't much of a lighter. The version of you that creates shifts never waited to feel ready. They showed up, struck the flint, and trusted the fire to follow. That version isn't gone. They just got quiet while you were waiting for permission that was never coming.",

  "trust+Builder": "You've built things and figured it out every time. Not because you had a perfect plan — because you started and adjusted. But now you're requiring the blueprint to be complete before you break ground, and that's not how you've ever actually built anything that mattered. Think about the first time you did something hard. You didn't know how it was going to end. You just started. The path revealed itself. Your past is full of proof. Your present is full of hesitation. Those two things don't belong together.",

  "trust+Guide": "You've mistaken confidence for a requirement. It was never a requirement. It was a side effect. A GPS doesn't know where you're going because it's confident — it knows because it's moving and recalculating. What's interesting is that your answers suggest you've already been the person you're trying to become. You just don't trust that version of yourself anymore. You're waiting for a feeling that used to come after action to somehow arrive before it. That's not how it worked then. It's not how it works now.",

  "trust+Explorer": "You've always found your way by moving first and orienting after. That's been your method your whole life — and it's worked. But lately you've been standing at the trailhead, waiting for certainty that has never once arrived before you started moving. A compass only points direction when you're in motion. Standing still, it just spins. The clarity you're waiting for isn't out there somewhere. It's on the other side of the first move you keep not making.",

  "belief+Catalyst": "You've spent a long time believing your moment was coming. Not in an arrogant way — in a knowing way. Like there was always supposed to be more than this. Somewhere along the line you made a quiet agreement with life: you'd keep believing in your potential, and life would eventually prove you right. Years passed. The belief stayed. The proof never arrived. Imagine a musician rehearsing for a sold-out concert that never gets scheduled. At some point the problem isn't the music. It's that nobody booked the venue. Potential isn't a destination. It's a responsibility. And responsibilities get heavier every year they're postponed.",

  "belief+Builder": "You know exactly what you're capable of building — not as a fantasy, but as a felt sense that's been with you for years. But you've been waiting for someone else to recognize it first before you commit to it fully. A chef who only cooks when someone compliments the food will never open a restaurant. The quality of what you build isn't the question. It never has been. The question is whether you're going to keep requiring external proof before you apply internal knowledge. You already have everything you need. The only thing missing is your own permission.",

  "belief+Guide": "You've been one of the most valuable people in a lot of rooms. You just haven't charged for it. Conversations that changed people's directions. Quiet moments of clarity that nobody saw but the person who needed it. Real transformations that happened because you showed up. That's not a hobby. That's a practice. A therapist who gives their best work for free isn't being generous. They're being afraid. What you've been doing informally is already a product. It just doesn't have a front door yet. And until it does, the people who need it most can't find it.",

  "belief+Explorer": "You keep speaking about your potential like it's a future event. But you've been aware of it for years. Maybe decades. At some point 'I'm meant for more' stops being an insight and starts becoming a debt. An explorer who spends twenty years mapping a continent eventually has to publish the map — otherwise the expedition becomes a hiding place. The uncomfortable question is this: how much of your waiting is actually uncertainty… and how much of it is fear that you'll discover you're capable of exactly what you've suspected all along?",
};

function getReflection(diagKey, typeKey) {
  return REFLECTIONS[`${diagKey}+${typeKey}`] || null;
}


function getDiagnosisKey(answers) {
  const scores = { focus: 0, action: 0, trust: 0, belief: 0 };

  // Q8 (index 8) — "Which feels most true right now?"
  const q8 = answers[8];
  if (q8?.letter === "A") scores.focus += 3;
  if (q8?.letter === "B") scores.action += 3;
  if (q8?.letter === "C") scores.action += 3;
  if (q8?.letter === "D") scores.belief += 3;

  // Q9 (index 9) — "Have you been waiting for the world to notice?"
  const q9 = answers[9];
  if (q9?.letter === "A") scores.belief += 2;
  if (q9?.letter === "B") scores.belief += 2;
  if (q9?.letter === "C") scores.focus += 2;

  // Q1 (index 1) — "Last time you bet on yourself before ready?"
  const q1 = answers[1];
  if (q1?.letter === "C") scores.trust += 2;
  if (q1?.letter === "A") scores.action += 1;

  // Q3 (index 3) — "When life improved, what caused it?"
  const q3 = answers[3];
  if (q3?.letter === "C") scores.belief += 2;
  if (q3?.letter === "A") scores.trust += 1;

  // Q4 (index 4) — "Have you ever surprised yourself?"
  const q4 = answers[4];
  if (q4?.letter === "C") scores.trust += 2;
  if (q4?.letter === "A") scores.trust += 1;

  // Q2 (index 2) — "What played biggest role in your win?"
  const q2 = answers[2];
  if (q2?.letter === "C") scores.belief += 2;
  if (q2?.letter === "A") scores.action += 1;

  // Q11 (index 11) — "What do you notice in a room of strangers?"
  const q11 = answers[11];
  if (q11?.letter === "D") scores.focus += 2;

  // Q17 (index 17) — "Become known for one thing?"
  const q17 = answers[17];
  if (q17?.letter === "D") scores.focus += 2;

  // Q22 (index 22) — "Trust yourself to figure it out after you start?"
  const q22 = answers[22];
  if (q22?.letter === "C") scores.trust += 3;
  if (q22?.letter === "B") scores.trust += 1;

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return winner;
}

const TYPES = {
  Catalyst: { label: "The Catalyst", emoji: "🔥", description: "You don't just see potential — you ignite it in others. Your gift is the reframe. You walk into a stuck situation and within minutes people see it differently. That's rare. And it's worth money.", firstStep: "Document one reframe you gave someone this week. That's your content, your product, and your brand all in one." },
  Builder: { label: "The Builder", emoji: "🔧", description: "You think in systems. When something's broken you see the fix before anyone else does. You're the person people call when it actually matters — not for opinions, but for solutions.", firstStep: "Write down the three problems you solve better than anyone you know. That's your offer waiting to happen." },
  Guide: { label: "The Guide", emoji: "🧭", description: "People trust you before you've earned it — because they can feel that you actually care. You don't just give advice. You walk with people. That's a gift most people would pay a lot for.", firstStep: "Identify one transformation you've helped someone through. That story is your sales page." },
  Explorer: { label: "The Explorer", emoji: "🗺️", description: "You're wired for discovery. New ideas, new angles, new possibilities — you see connections others miss entirely. You're not scattered. You're ahead of the curve.", firstStep: "Pick the one topic you keep coming back to no matter what. That's your niche. Start there." },
};

function getType(answers) {
  const scores = { Catalyst: 0, Builder: 0, Guide: 0, Explorer: 0 };
  answers.forEach((ans, i) => {
    if (!ans) return;
    const l = ans.letter;
    if (i >= 11 && i <= 17) {
      if (l === "D") scores.Catalyst += 2;
      if (l === "A") scores.Builder += 2;
      if (l === "B" || l === "C") scores.Guide += 2;
    }
    if (i === 13 && l === "C") scores.Catalyst += 3;
    if (i === 14 && l === "C") scores.Catalyst += 3;
    if (i === 12 && l === "A") scores.Builder += 2;
    if (i === 12 && l === "D") scores.Guide += 2;
    if (i === 16 && l === "D") scores.Explorer += 3;
    if (i === 2 && l === "A") scores.Builder += 1;
    if (i === 2 && l === "B") scores.Guide += 1;
    if (i === 5 && l === "B") scores.Guide += 1;
    if (i === 5 && l === "A") scores.Catalyst += 1;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

const SECTION_COLORS = {
  Agency: { bg: "#111116", accent: "#e94560", label: "SECTION 1" },
  Pain:   { bg: "#111116", accent: "#f5a623", label: "SECTION 2" },
  Mirror: { bg: "#111116", accent: "#0f9b58", label: "SECTION 3" },
  Outcome:{ bg: "#111116", accent: "#7b61ff", label: "SECTION 4" },
};

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [diagKey, setDiagnosisKey_state] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offerClicked, setOfferClicked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const question = QUESTIONS[currentQ];
  const progress = (currentQ / QUESTIONS.length) * 100;
  const sectionColor = question ? SECTION_COLORS[question.section] : SECTION_COLORS.Agency;
  const isMulti = question?.multiSelect;
  const hasAnswer = isMulti ? multiSelected.length > 0 : selected !== null;

  async function fetchAIResult(type, diagKey, diag, allAnswers) {
    setLoading(true);
    const summary = allAnswers.map((a, i) => `Q${i+1}: ${QUESTIONS[i]?.question} → ${a?.text}`).join("\n");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          system: `You are RichSpark — a warm, direct, no-BS guide who helps people have their oh-shit moment about their income potential. Your tone is a campfire conversation: honest, a little funny, deeply human. Never corporate. Never generic. Never encouraging in a hollow way. You are the friend who tells the truth with warmth. Keep total response under 180 words. Return only plain text, no markdown, no bullet points, no quotes.`,
          messages: [{
            role: "user",
            content: `This person completed a diagnostic. Their type is ${type} and their core blockage is: ${diag.subheadline}

Here are their specific answers:
${summary}

Write them 3-4 sentences that:
1. Reflect back something SPECIFIC from their actual answers — not a generic observation. Reference what they actually said.
2. Name the specific cost of staying where they are based on what they revealed.
3. End with one sentence that opens a door without pushing them through it.

The goal: they read this and think "how did it know that?" Make it feel uncomfortably accurate. No fluff. No generic encouragement. Make it feel like it was written by someone who actually read every answer.`,
          }],
        }),
      });
      const data = await response.json();
      const text = data?.content?.[0]?.text || "";
      if (!text) {
        // API unavailable — use 16-combination fallback reflection
        setAiResult(getReflection(diagKey, type) || diag.reflection);
      } else {
        setAiResult(text);
      }
    } catch (e) {
      // API unavailable — use 16-combination fallback reflection
      setAiResult(getReflection(diagKey, type) || diag.reflection);
    }
    setLoading(false);
  }

  function handleSelect(option) {
    if (isMulti) {
      setMultiSelected(prev => prev.find(o => o.letter === option.letter) ? prev.filter(o => o.letter !== option.letter) : [...prev, option]);
    } else {
      setSelected(option);
    }
  }

  function handleNext() {
    if (!hasAnswer) return;
    const answer = isMulti ? { letter: multiSelected.map(o => o.letter).join("+"), text: multiSelected.map(o => o.text).join(" / ") } : selected;
    const newAnswers = [...answers, answer];
    setAnimating(true);
    setTimeout(() => {
      setAnswers(newAnswers);
      setSelected(null);
      setMultiSelected([]);
      setAnimating(false);
      if (currentQ + 1 >= QUESTIONS.length) {
        const type = getType(newAnswers);
        const diagKey = getDiagnosisKey(newAnswers);
        const diag = DIAGNOSES[diagKey];
        setResult(type);
        setDiagnosis(diag);
        setDiagnosisKey_state(diagKey);
        fetchAIResult(type, diagKey, diag, newAnswers);
        setScreen("pivot");
      } else {
        setCurrentQ(currentQ + 1);
      }
    }, 300);
  }

  function resetAll() {
    setScreen("intro"); setCurrentQ(0); setAnswers([]); setSelected(null);
    setMultiSelected([]); setResult(null); setDiagnosis(null); setDiagnosisKey_state(null); setAiResult(null); setOfferClicked(false);
  }

  const tag = (color) => ({ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: color || "#e94560", marginBottom: "8px", fontFamily: "'Courier New', monospace" });
  const accent = sectionColor?.accent || "#e94560";

  if (screen === "intro") return (
    <div style={{ minHeight: "100vh", background: "#111116", color: "#f0f0f0", fontFamily: "'Georgia',serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "620px", textAlign: "center", padding: "40px 20px" }}>
        <span style={{ fontSize: "48px", marginBottom: "24px", display: "block", animation: "pulse 2s infinite" }}>🔥</span>
        <h1 style={{ fontSize: "clamp(26px,6vw,46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.02em" }}>
          You saw your potential so clearly.<br />
          <span style={{ color: "#e94560" }}>You just assumed the world would see it too.</span>
        </h1>
        <p style={{ fontSize: "clamp(15px,3vw,18px)", color: "#aaa", lineHeight: 1.7, marginBottom: "16px", fontStyle: "italic" }}>
          This diagnostic won't tell you what to do.<br />
          It'll show you what's been standing between<br />who you are and what you're capable of.
        </p>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "40px", lineHeight: 1.7 }}>
          Certainty doesn't come before the first step.<br />It shows up after. This is the first step.
        </p>
        <button style={{ background: "#e94560", color: "#fff", border: "none", borderRadius: "4px", padding: "16px 40px", fontSize: "16px", fontFamily: "'Georgia',serif", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}
          onClick={() => setScreen("quiz")}>I'm ready →</button>
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`}</style>
    </div>
  );

  if (screen === "quiz") return (
    <div style={{ minHeight: "100vh", background: sectionColor.bg, color: "#f0f0f0", fontFamily: "'Georgia',serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", transition: "background 0.8s ease", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "620px" }}>
        <div style={{ width: "100%", height: "3px", background: "#222", borderRadius: "2px", marginBottom: "32px", overflow: "hidden" }}>
          <div style={{ height: "100%", background: accent, width: `${progress}%`, transition: "width 0.4s ease, background 0.8s ease", borderRadius: "2px" }} />
        </div>
        <div style={tag(accent)}>{SECTION_COLORS[question.section]?.label} — {question.section}</div>
        <div style={{ fontSize: "13px", color: "#666", marginBottom: "28px", fontStyle: "italic" }}>{question.sectionLabel}</div>
        <div style={{ fontSize: "clamp(18px,4vw,24px)", fontWeight: 600, lineHeight: 1.4, marginBottom: "32px", opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)", transition: "opacity 0.3s,transform 0.3s" }}>
          {question.question}
        </div>
        {question.options.map(opt => {
          const isSel = isMulti ? multiSelected.some(o => o.letter === opt.letter) : selected?.letter === opt.letter;
          return (
            <button key={opt.letter} onClick={() => handleSelect(opt)}
              style={{ display: "block", width: "100%", textAlign: "left", background: isSel ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)", border: isSel ? `1px solid ${accent}` : "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "16px 20px", marginBottom: "12px", cursor: "pointer", color: "#f0f0f0", fontSize: "clamp(14px,2.5vw,16px)", fontFamily: "'Georgia',serif", lineHeight: 1.5, transition: "all 0.2s", opacity: animating ? 0 : 1 }}>
              <span style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{ display: "inline-block", width: "24px", height: "24px", borderRadius: "50%", background: isSel ? accent : "rgba(255,255,255,0.1)", color: "#fff", fontSize: "12px", fontFamily: "'Courier New',monospace", textAlign: "center", lineHeight: "24px", marginRight: "12px", flexShrink: 0, transition: "background 0.2s" }}>{opt.letter}</span>
                <span>{opt.text}</span>
              </span>
            </button>
          );
        })}
        <button onClick={handleNext}
          style={{ marginTop: "24px", width: "100%", background: hasAnswer ? accent : "#333", color: hasAnswer ? "#fff" : "#666", border: "none", borderRadius: "4px", padding: "16px", fontSize: "15px", fontFamily: "'Georgia',serif", cursor: hasAnswer ? "pointer" : "default", letterSpacing: "0.05em", transition: "all 0.3s" }}>
          {currentQ + 1 >= QUESTIONS.length ? "See my result →" : "Next →"}
        </button>
        <div style={{ textAlign: "center", marginTop: "16px", color: "#444", fontSize: "12px", fontFamily: "monospace" }}>{currentQ + 1} / {QUESTIONS.length}</div>
      </div>
    </div>
  );

  if (screen === "pivot") {
    const type = TYPES[result] || TYPES.Catalyst;
    const diag = diagnosis || DIAGNOSES.focus;
    return (
      <div style={{ minHeight: "100vh", background: "#111116", color: "#f0f0f0", fontFamily: "'Georgia',serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", position: "relative" }}>
        <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "620px" }}>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>

            {/* PIVOT LINE */}
            <p style={{ fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: "16px", fontFamily: "monospace" }}>That's interesting, isn't it.</p>
            <h2 style={{ fontSize: "clamp(22px,5vw,36px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "40px", letterSpacing: "-0.02em" }}>
              Want to see what's<br /><span style={{ color: "#e94560" }}>around the next corner?</span>
            </h2>

            {/* SCREENSHOT PULL QUOTE */}
            <div style={{ background: "linear-gradient(135deg, rgba(245,166,35,0.08), rgba(233,69,96,0.08))", border: "1px solid rgba(245,166,35,0.25)", borderRadius: "16px", padding: "32px 28px", marginBottom: "24px" }}>
              <div style={tag("#f5a623")}>What we see</div>
              <div style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: 700, color: "#fff", lineHeight: 1.25, marginTop: "12px", marginBottom: "8px" }}>{diag.headline}</div>
              <div style={{ fontSize: "clamp(18px,3.5vw,24px)", fontWeight: 600, color: "#f5a623", lineHeight: 1.3, marginBottom: "20px" }}>{diag.subheadline}</div>
              <div style={{ width: "40px", height: "2px", background: "rgba(245,166,35,0.4)", margin: "0 auto 20px" }} />
              <p style={{ fontSize: "15px", color: "#ccc", lineHeight: 1.8, marginBottom: "16px", textAlign: "left" }}>{diag.evidence}</p>
              <p style={{ fontSize: "14px", color: "#f5a623", lineHeight: 1.7, fontStyle: "italic", textAlign: "left" }}>"{diag.cost}"</p>
            </div>

            {/* TYPE AS EVIDENCE */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "28px 24px", marginBottom: "20px", textAlign: "left" }}>
              <div style={tag("#777")}>Your natural wiring — the evidence</div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "36px" }}>{type.emoji}</span>
                <div style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: 700, color: "#fff" }}>{type.label}</div>
              </div>
              <p style={{ fontSize: "15px", color: "#ccc", lineHeight: 1.7, marginBottom: "20px" }}>{type.description}</p>
              <div style={tag("#0f9b58")}>Your first move</div>
              <p style={{ fontSize: "15px", color: "#ddd", lineHeight: 1.7, marginTop: "8px" }}>{type.firstStep}</p>
            </div>

            {/* AI PERSONAL MESSAGE */}
            {loading && (
              <div style={{ background: "rgba(233,69,96,0.05)", border: "1px solid rgba(233,69,96,0.1)", borderRadius: "8px", padding: "24px", marginBottom: "20px", textAlign: "center", color: "#666", fontSize: "14px", fontStyle: "italic" }}>
                Reading your answers...
              </div>
            )}
            {aiResult && !loading && (
              <div style={{ background: "rgba(233,69,96,0.07)", border: "1px solid rgba(233,69,96,0.2)", borderRadius: "12px", padding: "24px", marginBottom: "20px", textAlign: "left" }}>
                <div style={tag("#e94560")}>Your personal reflection</div>
                <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#ddd", fontStyle: "italic", marginTop: "12px" }}>{aiResult}</p>
              </div>
            )}


            {/* CLOSING LINE */}
            <p style={{ color: "#444", fontSize: "13px", lineHeight: 1.9, marginBottom: "32px" }}>
              If overnight success was how it was going to work —<br />
              it already would have happened.<br />
              <span style={{ color: "#777" }}>This is your path. Let's build it.</span>
            </p>

            {offerClicked ? (
              <div style={{ background: "rgba(233,69,96,0.1)", border: "1px solid rgba(233,69,96,0.3)", borderRadius: "8px", padding: "20px", marginBottom: "12px", textAlign: "center" }}>
                <div style={{ fontSize: "15px", color: "#e94560", fontWeight: 600, marginBottom: "8px" }}>You're in the right place. 🔥</div>
                <div style={{ fontSize: "14px", color: "#aaa", lineHeight: 1.7 }}>The full diagnostic experience is coming soon. Drop your email at <span style={{ color: "#e94560" }}>richspark.com</span> and you'll be first to know.</div>
              </div>
            ) : (
              <button onClick={() => setOfferClicked(true)}
                style={{ width: "100%", background: "#e94560", color: "#fff", border: "none", borderRadius: "4px", padding: "18px", fontSize: "16px", fontFamily: "'Georgia',serif", cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "12px" }}>
                I'm ready to go deeper →
              </button>
            )}
            <button onClick={resetAll}
              style={{ width: "100%", background: "transparent", border: "1px solid #2a2a2a", color: "#444", borderRadius: "4px", padding: "14px", fontSize: "14px", fontFamily: "'Georgia',serif", cursor: "pointer" }}>
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }
}
