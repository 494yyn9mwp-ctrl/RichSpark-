import { useState } from "react";

const GREEN = "#00C896";

const QUESTIONS = [
  // SECTION: EVIDENCE
  { section: "Evidence", sectionLabel: "Before we talk about your future, let's talk about your history. People leave clues. So do you.", question: "When was the last time you made a conscious decision that significantly changed the direction of your life?", options: [{ letter: "A", text: "Recently — I can point to it clearly." }, { letter: "B", text: "A while back, but it still echoes." }, { letter: "C", text: "Honestly, I'm not sure I've made one like that yet." }] },
  { section: "Evidence", sectionLabel: "Before we talk about your future, let's talk about your history. People leave clues. So do you.", question: "When was the last time you bet on yourself before you felt ready?", options: [{ letter: "A", text: "Within the last year." }, { letter: "B", text: "A few years ago." }, { letter: "C", text: "It's been a long time." }] },
  { section: "Evidence", sectionLabel: "Before we talk about your future, let's talk about your history. People leave clues. So do you.", question: "Think about a win you're proud of. What played the biggest role?", options: [{ letter: "A", text: "I took action before I had all the answers." }, { letter: "B", text: "I stayed consistent longer than most people would." }, { letter: "C", text: "Someone else pushed me to do it." }] },
  { section: "Evidence", sectionLabel: "Before we talk about your future, let's talk about your history. People leave clues. So do you.", question: "When life improved in a meaningful way, what usually caused it?", options: [{ letter: "A", text: "A decision I made." }, { letter: "B", text: "A habit I changed." }, { letter: "C", text: "A circumstance outside my control." }] },
  { section: "Evidence", sectionLabel: "Before we talk about your future, let's talk about your history. People leave clues. So do you.", question: "Have you ever surprised yourself with what you were capable of?", options: [{ letter: "A", text: "More than once." }, { letter: "B", text: "Once or twice." }, { letter: "C", text: "Not really." }] },
  { section: "Evidence", sectionLabel: "Before we talk about your future, let's talk about your history. People leave clues. So do you.", question: "When you look back at your biggest positive changes, what was usually the spark?", options: [{ letter: "A", text: "I got fed up and decided enough was enough." }, { letter: "B", text: "Someone believed in me before I believed in myself." }, { letter: "C", text: "I stumbled into it — right place, right time." }] },
  // SECTION: FRICTION
  { section: "Friction", sectionLabel: "This is where most people get uncomfortable. Good. That's where the signal lives.", question: "How often does your income feel like an accurate reflection of your value as a person?", options: [{ letter: "A", text: "Rarely or never." }, { letter: "B", text: "Sometimes, but not consistently." }, { letter: "C", text: "It used to, but not anymore." }] },
  { section: "Friction", sectionLabel: "This is where most people get uncomfortable. Good. That's where the signal lives.", question: "How long have you felt like you're capable of more than your current situation shows?", options: [{ letter: "A", text: "A year or two." }, { letter: "B", text: "Several years." }, { letter: "C", text: "Honestly, most of my adult life." }] },
  { section: "Friction", sectionLabel: "This is where most people get uncomfortable. Good. That's where the signal lives.", question: "Which of these feels most true about you right now?", options: [{ letter: "A", text: "I know I can make more — I just don't know where to focus." }, { letter: "B", text: "I start things but rarely stick with them long enough." }, { letter: "C", text: "I consume way more information than I actually implement." }, { letter: "D", text: "I secretly worry I'm not as capable as I think I am." }] },
  { section: "Friction", sectionLabel: "This is where most people get uncomfortable. Good. That's where the signal lives.", question: "Which sentence bothers you most?", options: [{ letter: "A", text: "You already know your next move." }, { letter: "B", text: "Nobody is coming." }, { letter: "C", text: "The life you want requires a different version of you." }, { letter: "D", text: "You've waited longer than you're willing to admit." }] },
  { section: "Friction", sectionLabel: "This is where most people get uncomfortable. Good. That's where the signal lives.", question: "If nothing changes in the next five years — same income, same patterns, same waiting — how does that feel to sit with right now?", options: [{ letter: "A", text: "Uncomfortable but manageable." }, { letter: "B", text: "Honestly terrifying." }, { letter: "C", text: "Like something I absolutely refuse to accept." }, { letter: "D", text: "I can't even let myself think about it." }] },
  // SECTION: MIRROR
  { section: "Mirror", sectionLabel: "The problem is getting clearer. But the interesting part isn't just what's in the way — it's who you are when it isn't.", question: "When you walk into a room full of strangers, what do you naturally notice first?", options: [{ letter: "A", text: "Who seems interesting." }, { letter: "B", text: "Who seems uncomfortable." }, { letter: "C", text: "How people are interacting." }, { letter: "D", text: "What's possible here." }] },
  { section: "Mirror", sectionLabel: "The problem is getting clearer. But the interesting part isn't just what's in the way — it's who you are when it isn't.", question: "People tend to come to you for…", options: [{ letter: "A", text: "Practical solutions." }, { letter: "B", text: "Encouragement." }, { letter: "C", text: "Fresh perspective." }, { letter: "D", text: "Vision they couldn't see." }] },
  { section: "Mirror", sectionLabel: "The problem is getting clearer. But the interesting part isn't just what's in the way — it's who you are when it isn't.", question: "Which compliment sticks with you the longest?", options: [{ letter: "A", text: "\"You're smart.\"" }, { letter: "B", text: "\"You helped me.\"" }, { letter: "C", text: "\"You inspired me.\"" }, { letter: "D", text: "\"You saw something nobody else saw.\"" }] },
  { section: "Mirror", sectionLabel: "The problem is getting clearer. But the interesting part isn't just what's in the way — it's who you are when it isn't.", question: "What frustrates you most when talking with people?", options: [{ letter: "A", text: "They won't take action." }, { letter: "B", text: "They won't think for themselves." }, { letter: "C", text: "They can't see what's possible." }, { letter: "D", text: "They quit too early." }, { letter: "E", text: "They blame everyone else for where they are." }] },
  { section: "Mirror", sectionLabel: "The problem is getting clearer. But the interesting part isn't just what's in the way — it's who you are when it isn't.", question: "When you help someone solve a problem, what feels best?", options: [{ letter: "A", text: "Giving them the exact fix so they can move on." }, { letter: "B", text: "Asking the one question that makes everything click for them." }, { letter: "C", text: "Showing them a completely different way to see the situation." }, { letter: "D", text: "Being the calm presence while they work through it themselves." }] },
  { section: "Mirror", sectionLabel: "The problem is getting clearer. But the interesting part isn't just what's in the way — it's who you are when it isn't.", question: "Have you ever explained your idea to someone, watched their eyes glaze over, and thought — they'll understand when they see it working?", options: [{ letter: "A", text: "Yes — more times than I can count." }, { letter: "B", text: "Once or twice." }, { letter: "C", text: "No — I usually wait until I have proof before I share." }] },
  { section: "Mirror", sectionLabel: "The problem is getting clearer. But the interesting part isn't just what's in the way — it's who you are when it isn't.", question: "If people paid you for one thing tomorrow, what would it be?", options: [{ letter: "A", text: "Fixing problems." }, { letter: "B", text: "Guiding people through hard things." }, { letter: "C", text: "Creating opportunities others don't see." }, { letter: "D", text: "Seeing what everyone else is missing." }] },
  // SECTION: FUTURE
  { section: "Future", sectionLabel: "Not the fantasy. The actual future you're hoping for.", question: "If your income was handled — not wealthy, just handled — what's the first area where you'd feel relief?", options: [{ letter: "A", text: "Unexpected bills and emergencies — handled without panic." }, { letter: "B", text: "I'm able to keep pace without feeling behind everyone else." }, { letter: "C", text: "I'm able to fully show up for the people I love." }, { letter: "D", text: "The feeling that time is running out finally quiets down." }] },
  { section: "Future", sectionLabel: "Not the fantasy. The actual future you're hoping for.", question: "Imagine it's one year from now and something finally clicked. What changed first?", options: [{ letter: "A", text: "My income." }, { letter: "B", text: "My clarity." }, { letter: "C", text: "My consistency." }, { letter: "D", text: "My self-trust." }] },
  { section: "Future", sectionLabel: "Not the fantasy. The actual future you're hoping for.", question: "What would financial freedom actually feel like on a random Wednesday morning?", options: [{ letter: "A", text: "Waking up without dread." }, { letter: "B", text: "Making a decision without checking my bank account first." }, { letter: "C", text: "Feeling like my life finally matches who I actually am." }, { letter: "D", text: "All of the above." }] },
  { section: "Future", sectionLabel: "Not the fantasy. The actual future you're hoping for.", question: "If success were guaranteed, what's the first thing you'd stop doing?", options: [{ letter: "A", text: "Overthinking every move." }, { letter: "B", text: "Waiting for the right moment." }, { letter: "C", text: "Playing smaller than I know I am." }, { letter: "D", text: "Pretending I don't care as much as I do." }] },
  { section: "Future", sectionLabel: "Not the fantasy. The actual future you're hoping for.", question: "If the financial result was guaranteed, what conversation would you have first?", options: [{ letter: "A", text: "The one with myself about what I actually want next." }, { letter: "B", text: "The one with someone I love about the future we're about to build." }, { letter: "C", text: "The one where I finally give something up that looks good but keeps me stuck." }, { letter: "D", text: "Honestly — I'm not sure I believe I deserve the guarantee yet." }] },
  { section: "Future", sectionLabel: "Not the fantasy. The actual future you're hoping for.", question: "How often do you trust yourself to figure things out after you start?", options: [{ letter: "A", text: "Almost always — I find a way." }, { letter: "B", text: "Sometimes, but I second-guess myself a lot." }, { letter: "C", text: "Rarely — I need to feel ready first." }] },
];

const OBSERVATIONS = {
  Evidence: {
    line1: "Interesting.",
    line2: "Your past is already telling a story.",
    line3: "Let's see if your present agrees.",
  },
  Friction: {
    line1: "The problem is getting clearer.",
    line2: "But the interesting part isn't what's holding you back.",
    line3: "It's who you are when you're not held back.",
  },
  Mirror: {
    line1: "Almost there.",
    line2: "One more section.",
    line3: "Let's talk about where you're actually headed.",
  },
};

const DIAGNOSES = {
  focus: {
    headline: "You don't have an opportunity problem.",
    subheadline: "You have a focus problem.",
    evidence: "Your answers showed curiosity, range, and genuine capability. You can see ten paths at once — which means you've been standing at the intersection instead of walking down any of them. That's not confusion. That's too much opportunity with no commitment mechanism.",
    cost: "Every month spent searching for the perfect path is a month not collecting feedback from the imperfect one.",
    truth: "The person who figures it out isn't the one who found the right path. It's the one who walked one long enough to find out what it actually contained.",
  },
  action: {
    headline: "You don't have a knowledge problem.",
    subheadline: "You have an action problem.",
    evidence: "Your answers pointed toward someone who understands the landscape — but stops before shipping. You've likely started more than you've finished. Not because you're lazy. Because putting something real into the world means it can fail for real. And that's a different kind of scary.",
    cost: "The gap between knowing and doing doesn't close with more information. It closes with one imperfect move.",
    truth: "The version of you that knows what to do next already exists. They're on the other side of one shipped thing. Not a perfect thing. A real thing.",
  },
  trust: {
    headline: "You don't have a capability problem.",
    subheadline: "You have a trust problem.",
    evidence: "Your answers showed real wins in your past — moments where you figured things out, stayed consistent, surprised yourself. But somewhere you stopped trusting that those moments were repeatable. You've been waiting to feel ready again. That feeling isn't coming before you start.",
    cost: "Certainty isn't the prerequisite. It's the reward. And it only shows up on the other side of the first step.",
    truth: "You trust your past less than you trust your fear. That's expensive. Because every month spent waiting for certainty is a month that could have been generating proof.",
  },
  belief: {
    headline: "You don't have a strategy problem.",
    subheadline: "You have a belief problem.",
    evidence: "Your answers revealed someone who has seen their own potential clearly for a long time — but has been quietly waiting for the world to confirm it. You've expected things to work out more than you've made them work out. That's not weakness. That's what happens when you're wired for big things but haven't built the structure to carry them yet.",
    cost: "Nobody is coming to confirm what you already know about yourself. That part is yours to claim.",
    truth: "You saw your potential so clearly. You just assumed the world would see it too. The world doesn't discover people. It responds to them.",
  },
};

const REFLECTIONS = {
  "focus+Catalyst": "You keep telling yourself you're exploring. What you're actually doing is avoiding the grief of choosing. Because the moment you choose one path, every other path becomes unavailable for a while — and that's uncomfortable for someone who can see possibilities everywhere. You're like a magnifying glass moving across a field on a sunny day. The light is powerful enough to start a fire. But it only works if it stays still. You don't need another idea. You need the courage to disappoint nineteen futures so one of them finally gets a chance to become real.",
  "focus+Builder": "You know something most people don't. Building isn't hard. Finishing is hard. Starting projects gives you energy. Planning gives you energy. But delivery asks a different question — it asks whether you're willing to let reality grade your work. Unfinished projects still get to be perfect. Finished projects don't. At some point, the person who ships average work becomes more successful than the person who endlessly perfects great work. Not because they're more talented. Because reality only rewards what actually leaves the workshop.",
  "focus+Guide": "You care deeply about people — probably more deeply than most. But there's a hidden cost that comes with caring about everyone. You end up spreading yourself across too many people, too many conversations, too many problems. A little help here. A little help there. And years later, you're exhausted while wondering why your impact still feels smaller than it should. You don't have an ability problem. You have a concentration problem. The people who need you most don't need more of your attention. They need more of your focus.",
  "focus+Explorer": "You love possibility. New ideas energize you. New directions energize you. But strengths become expensive when they're left unmanaged. Every road looks exciting before you've walked it. The uncomfortable truth is that commitment destroys fantasy. The moment you choose a path, it stops being a possibility and starts becoming reality. Reality has friction. Fantasy doesn't. The next opportunity isn't necessarily better. It's just newer. And newer things always look cleaner from far away.",
  "action+Catalyst": "You're someone who can read a room in sixty seconds. You walk into a stuck situation and you already know what needs to shift. The strange part is that the same clarity you apply to other people's lives has somehow never quite landed on your own next move. It's not that you don't know what to do. It's that knowing what to do and doing it are two completely different acts of courage. One requires intelligence. The other requires exposure. The question isn't what the first step is. You already know that. The question is why you're still in the stands calling plays.",
  "action+Builder": "You have a private collection of unfinished potential. Projects. Ideas. Plans. Little monuments to versions of yourself that were going to start soon. A builder can spend years studying architecture without ever creating a house someone can walk into. Eventually the learning stops being preparation and starts becoming camouflage. The market cannot reward what only exists in your head. Your confidence will never come from thinking about the work. It comes from surviving the embarrassment of doing it badly at first.",
  "action+Guide": "People walk away from conversations with you feeling better about their situation. You don't even notice you're doing it. You ask the right questions. You listen differently. You find the reframe. And then the conversation ends. And nothing is different in your bank account. You've been quietly running a coaching practice with no business model attached to it. Your answers suggest this isn't a generosity problem. It's a permission problem. You're waiting to feel like what you do is enough to charge for. It already is.",
  "action+Explorer": "You've gone deeper into this territory than most people ever will. Built a mental library that would genuinely help people who are earlier in the journey than you. But it's still a library that only you can access. At some point, every explorer reaches the moment where the value shifts. Not the moment of discovery. The moment of transmission. The moment you stop being the person who knows things and become the person who teaches things. That moment was probably available to you a while ago.",
  "trust+Catalyst": "You've changed things for people. Real things. Shifts that stuck. But lately you've been showing up smaller than you used to. More careful. More qualified. Somewhere between then and now you started requiring certainty before impact. And certainty isn't a prerequisite for impact. It's a side effect of it. The version of you that created those shifts didn't wait to feel ready. They showed up, leaned in, and trusted the conversation to go somewhere. That version is still available to you.",
  "trust+Builder": "You've built things. Real things. Things that required you to figure it out as you went. And you did. Every time. Not because you had a perfect plan. Because you had enough trust in yourself to take the next step before you could see the one after it. But now you're requiring the blueprint to be complete before you break ground. Your best work has always started with 'I think I can figure this out.' Not 'I know exactly how this ends.' Your track record says you'll figure it out. Your hesitation is currently arguing with your own evidence.",
  "trust+Guide": "You've mistaken confidence for a requirement. It was never a requirement. It was a side effect. A GPS doesn't know where you're going because it's confident. It knows because it's moving and recalculating. Your answers suggest you've already been the person you're trying to become. You just don't trust that version of yourself anymore. You're waiting for a feeling that used to come after action to somehow arrive before it. That's not how it worked then. It's not how it works now.",
  "trust+Explorer": "You've navigated more uncharted territory than you give yourself credit for. Each time, you figured it out. Not by knowing in advance. By moving and adjusting. That's always been your method. But lately you've been standing at the trailhead waiting for certainty that has never once arrived before you started moving. A compass only points direction when you're in motion. Standing still, it just spins. The clarity you're waiting for lives on the other side of a move you keep not making.",
  "belief+Catalyst": "You've spent a long time waiting for the world to notice something you've been able to see in yourself for years. Not in an ego way. More like an unfinished sentence. A feeling that there was more in you than your current life was demonstrating. You've had flashes of it. Conversations where people suddenly saw things differently because of something you said. Moments where an idea landed and changed the energy of a room. Enough evidence to know you're not imagining it. But somewhere along the way, you started treating your potential like a winning lottery ticket instead of a responsibility. You believed in it. You just stopped acting like it was yours to develop. The strange thing about people like you is that disappointment rarely kills the dream. Waiting does. Years pass. The vision stays alive. The life around it stays mostly unchanged. You don't need a new strategy. You've known the move for a while.",
  "belief+Builder": "You don't struggle to imagine what could be built. You struggle to understand why it hasn't happened yet. That's an important difference. Your answers don't point to someone who lacks ideas. They point to someone who has spent years carrying a blueprint. You've seen versions of your future clearly enough to describe them. Businesses. Projects. Systems. Offers. New directions. The challenge isn't vision. The challenge is that you've quietly been waiting for confidence to arrive before commitment. But confidence has never worked that way. Every meaningful thing you've ever built probably started with incomplete information. A rough plan. A guess. A willingness to figure it out. Somewhere you forgot that. Now you're asking for guarantees your earlier self never required. The frustrating part is that your evidence and your behavior are telling completely different stories. Your evidence says you're resourceful. Your behavior says you're waiting for permission. Those two things can't both be true forever. Sooner or later one of them wins.",
  "belief+Guide": "You've probably helped more people than you give yourself credit for. Not because you had the perfect answer. Because people feel different after talking to you. Clearer. Calmer. Less alone. The interesting thing is that you've treated this as something ordinary. Just part of who you are. Just conversations. Just helping. But if you've done something naturally for long enough, it's easy to stop noticing its value. The pattern I see is someone who has spent years creating transformations that disappear the moment the conversation ends. No structure. No container. No offer. No way for the value to accumulate. You've been giving away moments that genuinely mattered to people while wondering why your life hasn't reflected the impact you've had. Eventually that starts to create tension. Because deep down you know the problem isn't whether you're valuable. It's whether you're willing to let that value take up space. The next chapter may have less to do with helping more people. And more to do with finally recognizing what you've already been doing.",
  "belief+Explorer": "You've been talking about your potential like it's a future event. But you've known about it for a very long time. Maybe years. Maybe decades. That's what makes this interesting. Most people aren't haunted by possibility. You are. Certain ideas keep returning. Certain dreams refuse to die. Certain versions of your future keep reappearing no matter how many times you try to move on to something more practical. That isn't an accident. But there's a trap hidden inside people who are wired like you. Discovery can become a hiding place. Learning feels productive. Research feels productive. Exploring feels productive. And for a while, it is. Until one day you realize you've spent years mapping territory you never actually claimed. The uncomfortable possibility isn't that you're incapable. It's that you're closer than you've been willing to admit. Because once you stop exploring and start building, everything changes. Including the story you've been telling yourself about why you haven't started.",
};

const RECOGNITION = {
  "belief+Catalyst": [
    "You've felt capable of more for years, not months.",
    "You've had moments where other people saw your potential before they saw your results.",
    "You've been waiting for external confirmation of something you've privately known for years.",
  ],
  "belief+Builder": [
    "You've imagined versions of your future in remarkable detail.",
    "You often know the next step long before you take it.",
    "You've been asking for certainty from projects that actually require commitment first.",
  ],
  "belief+Guide": [
    "People often leave conversations with you feeling better than when they arrived.",
    "You've been giving away valuable insight so naturally that it stopped feeling valuable.",
    "You've wondered why your impact and your income seem to live in different universes.",
  ],
  "belief+Explorer": [
    "You've had the feeling that you're meant for something bigger for longer than you're comfortable admitting.",
    "The gap between what you know and what you've shared with the world is larger than it should be.",
    "You already know what's stopping you. You've known for a while.",
  ],
  // Placeholder for remaining 12 — will be filled in next pass
  "focus+Catalyst": ["You see more paths than most people know exist.", "Choosing feels like losing — but not choosing is the actual loss.", "You've been waiting for the right one instead of making one right."],
  "focus+Builder": ["You start strong and finish rarely.", "You know the gap between planning and shipping better than most.", "The workshop is full. The market is still waiting."],
  "focus+Guide": ["You help everyone a little instead of someone a lot.", "Your attention is your most valuable resource — and it's spread thin.", "The impact you want requires the focus you keep avoiding."],
  "focus+Explorer": ["Every new direction looks better than the current one.", "You've confused motion for progress more than once.", "The next idea isn't the answer. The current one, finished, is."],
  "action+Catalyst": ["You know exactly what needs to happen. You're just not doing it yet.", "Your clarity about others hasn't translated to movement in your own life.", "The stands are comfortable. The field is where it actually counts."],
  "action+Builder": ["Your best work still lives inside your head.", "You've been preparing long enough that preparation became the project.", "The market can't reward what it can't see."],
  "action+Guide": ["You're running a practice without a business model.", "People pay for what you give away in conversation.", "Permission isn't coming from outside. It was always yours to grant."],
  "action+Explorer": ["You've built a library no one else can access.", "The value shifted from discovery to transmission a while ago.", "Teaching what you know is the next expedition."],
  "trust+Catalyst": ["You used to show up bigger. Something changed.", "Certainty became a prerequisite somewhere along the way — it never was before.", "The version of you that made things happen is still available."],
  "trust+Builder": ["You've figured it out before. Every single time.", "Your track record and your hesitation are telling different stories.", "The blueprint doesn't need to be complete. It never was."],
  "trust+Guide": ["Confidence was always the side effect, not the requirement.", "You've already been the person you're trying to become.", "The feeling you're waiting for comes after the move, not before."],
  "trust+Explorer": ["You've navigated uncertainty before. That's literally your skillset.", "The clarity you're waiting for only shows up when you're moving.", "A compass only works in motion. So do you."],
};

const TYPES = {
  Catalyst: { label: "The Catalyst", emoji: "🔥", description: "You don't just see potential — you ignite it in others. Your gift is the reframe. You walk into a stuck situation and within minutes people see it differently. That's rare. And it's worth money.", firstMove: "Document one reframe you gave someone this week. That's your content, your product, and your brand all in one." },
  Builder: { label: "The Builder", emoji: "🔧", description: "You think in systems. When something's broken you see the fix before anyone else does. You're the person people call when it actually matters — not for opinions, but for solutions.", firstMove: "Write down the three problems you solve better than anyone you know. That's your offer waiting to happen." },
  Guide: { label: "The Guide", emoji: "🧭", description: "People trust you before you've earned it — because they can feel that you actually care. You don't just give advice. You walk with people. That's a gift most people would pay a lot for.", firstMove: "Identify one transformation you've helped someone through. That story is your sales page." },
  Explorer: { label: "The Explorer", emoji: "🗺️", description: "You're wired for discovery. New ideas, new angles, new possibilities — you see connections others miss entirely. You're not scattered. You're ahead of the curve.", firstMove: "Pick the one topic you keep coming back to no matter what. That's your niche. Start there." },
};

function getDiagnosisKey(answers) {
  const scores = { focus: 0, action: 0, trust: 0, belief: 0 };
  const q8 = answers[8]; if (q8?.letter === "A") scores.focus += 3; if (q8?.letter === "B") scores.action += 3; if (q8?.letter === "C") scores.action += 3; if (q8?.letter === "D") scores.belief += 3;
  const q9 = answers[9]; if (q9?.letter === "A") scores.belief += 2; if (q9?.letter === "B") scores.belief += 2; if (q9?.letter === "C") scores.focus += 2;
  const q1 = answers[1]; if (q1?.letter === "C") scores.trust += 2; if (q1?.letter === "A") scores.action += 1;
  const q3 = answers[3]; if (q3?.letter === "C") scores.belief += 2; if (q3?.letter === "A") scores.trust += 1;
  const q4 = answers[4]; if (q4?.letter === "C") scores.trust += 2;
  const q2 = answers[2]; if (q2?.letter === "C") scores.belief += 2;
  const q11 = answers[11]; if (q11?.letter === "D") scores.focus += 2;
  const q22 = answers[22]; if (q22?.letter === "C") scores.trust += 3; if (q22?.letter === "B") scores.trust += 1;
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function getType(answers) {
  const scores = { Catalyst: 0, Builder: 0, Guide: 0, Explorer: 0 };
  answers.forEach((ans, i) => {
    if (!ans) return; const l = ans.letter;
    if (i >= 11 && i <= 17) { if (l === "D") scores.Catalyst += 2; if (l === "A") scores.Builder += 2; if (l === "B" || l === "C") scores.Guide += 2; }
    if (i === 13 && l === "C") scores.Catalyst += 3;
    if (i === 14 && l === "C") scores.Catalyst += 3;
    if (i === 12 && l === "A") scores.Builder += 2;
    if (i === 12 && l === "D") scores.Guide += 2;
    if (i === 16 && l === "D") scores.Explorer += 3;
    if (i === 2 && l === "A") scores.Builder += 1;
    if (i === 5 && l === "A") scores.Catalyst += 1;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

const RECOGNITION_RESPONSES = {
  accurate: {
    label: "Uncomfortably accurate",
    reply: "That's the most important click you've made in a while. Because now you can't unknow it.",
  },
  mostly: {
    label: "Mostly accurate",
    reply: "Close enough to matter. The part that landed — that's the part worth paying attention to.",
  },
  notreally: {
    label: "Not really",
    reply: "Fair. But something brought you this far. Worth asking what that was.",
  },
};

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [diagKey, setDiagKey] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showObservation, setShowObservation] = useState(false);
  const [observationSection, setObservationSection] = useState(null);
  const [offerClicked, setOfferClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const [recognitionResponse, setRecognitionResponse] = useState(null);

  const question = QUESTIONS[currentQ];
  const progress = (currentQ / QUESTIONS.length) * 100;
  const hasAnswer = selected !== null;

  const ANALYZING_LINES = [
    "Analyzing patterns…",
    "Looking for contradictions…",
    "Comparing who you've been with who you're becoming…",
    "Finding the gap…",
    "…",
    "We found something.",
  ];

  async function fetchAIResult(type, dKey, allAnswers) {
    setLoading(true);
    const diag = DIAGNOSES[dKey];
    const summary = allAnswers.map((a, i) => `Q${i + 1}: ${QUESTIONS[i]?.question} → ${a?.text}`).join("\n");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are RichSpark — a warm, direct, no-BS guide who helps people have their oh-shit moment about their income potential. Your tone is a campfire conversation: honest, a little funny, deeply human. Never corporate. Never generic. Keep total response under 180 words. Return only plain text, no markdown, no bullet points, no quotes.`,
          messages: [{ role: "user", content: `Type: ${type}. Blockage: ${diag.subheadline}\n\nAnswers:\n${summary}\n\nWrite 3-4 sentences that reference specific answers, name the cost of staying stuck, and end with one sentence that opens a door. Make it feel uncomfortably accurate.` }],
        }),
      });
      const data = await response.json();
      const text = data?.content?.[0]?.text || "";
      setAiResult(text || REFLECTIONS[`${dKey}+${type}`] || diag.truth);
    } catch (e) {
      setAiResult(REFLECTIONS[`${dKey}+${type}`] || DIAGNOSES[dKey].truth);
    }
    setLoading(false);
  }

  function handleSelect(option) { setSelected(option); }

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnimating(true);
    setTimeout(() => {
      setAnswers(newAnswers);
      setSelected(null);
      setAnimating(false);
      const nextQ = currentQ + 1;
      if (nextQ >= QUESTIONS.length) {
        const type = getType(newAnswers);
        const dKey = getDiagnosisKey(newAnswers);
        setResult(type);
        setDiagKey(dKey);
        fetchAIResult(type, dKey, newAnswers);
        startAnalyzing();
      } else {
        const currentSection = QUESTIONS[currentQ].section;
        const nextSection = QUESTIONS[nextQ].section;
        if (currentSection !== nextSection && OBSERVATIONS[currentSection]) {
          setObservationSection(currentSection);
          setShowObservation(true);
          setCurrentQ(nextQ);
        } else {
          setCurrentQ(nextQ);
        }
      }
    }, 300);
  }

  function startAnalyzing() {
    setScreen("analyzing");
    let step = 0;
    setAnalyzingStep(0);
    const interval = setInterval(() => {
      step++;
      setAnalyzingStep(step);
      if (step >= ANALYZING_LINES.length - 1) {
        clearInterval(interval);
        setTimeout(() => setScreen("pivot"), 1200);
      }
    }, 700);
  }

  function resetAll() {
    setScreen("intro"); setCurrentQ(0); setAnswers([]); setSelected(null);
    setResult(null); setDiagKey(null); setAiResult(null); setShowObservation(false);
    setObservationSection(null); setOfferClicked(false); setEmail(""); setEmailSubmitted(false);
    setLoading(false); setRecognitionResponse(null);
  }

  const base = { minHeight: "100vh", background: "#111116", color: "#f0f0f0", fontFamily: "'Georgia','Times New Roman',serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", position: "relative" };
  const wrap = { position: "relative", zIndex: 1, width: "100%", maxWidth: "620px" };
  const tag = { fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: GREEN, marginBottom: "10px", fontFamily: "'Courier New',monospace", fontWeight: "600" };
  const subLabel = { fontSize: "16px", color: "#aaa", marginBottom: "28px", fontStyle: "italic", lineHeight: "1.6" };

  // INTRO
  if (screen === "intro") return (
    <div style={base}>
      <div style={wrap}>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <span style={{ fontSize: "52px", marginBottom: "28px", display: "block", animation: "pulse 2s infinite" }}>🔥</span>
          <p style={{ fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: GREEN, marginBottom: "20px", fontFamily: "monospace" }}>THE RICH SPARK DIAGNOSTIC</p>
          <h1 style={{ fontSize: "clamp(24px,5vw,42px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "24px", letterSpacing: "-0.02em" }}>
            Most people don't have<br />an information problem.<br />
            <span style={{ color: GREEN }}>They have a hidden bottleneck.</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,3vw,18px)", color: "#bbb", lineHeight: 1.8, marginBottom: "12px" }}>
            Something that keeps turning potential into waiting.
          </p>
          <p style={{ fontSize: "clamp(15px,3vw,17px)", color: "#bbb", lineHeight: 1.8, marginBottom: "12px", fontStyle: "italic" }}>
            This diagnostic is designed to find it.
          </p>
          <p style={{ fontSize: "15px", color: "#888", lineHeight: 1.8, marginBottom: "8px" }}>Not your strengths. Not your weaknesses.</p>
          <p style={{ fontSize: "15px", color: "#888", lineHeight: 1.8, marginBottom: "32px" }}>The thing standing between where you are<br />and what you already know you're capable of.</p>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "40px", lineHeight: 1.8 }}>
            23 questions &nbsp;·&nbsp; About 6 minutes &nbsp;·&nbsp; One uncomfortable answer.
          </p>
          <button style={{ background: GREEN, color: "#111", border: "none", borderRadius: "4px", padding: "18px 48px", fontSize: "16px", fontFamily: "'Georgia',serif", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "700" }}
            onClick={() => setScreen("quiz")}>Find It →</button>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "28px", lineHeight: 1.7 }}>
            Certainty doesn't come before the first step.<br />It shows up after. This is the first step.
          </p>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
    </div>
  );

  // OBSERVATION CARD
  if (showObservation && observationSection) {
    const obs = OBSERVATIONS[observationSection];
    return (
      <div style={base}>
        <div style={wrap}>
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ width: "48px", height: "2px", background: GREEN, margin: "0 auto 40px" }} />
            <p style={{ fontSize: "clamp(22px,4vw,32px)", color: "#888", lineHeight: 1.6, marginBottom: "16px" }}>{obs.line1}</p>
            <p style={{ fontSize: "clamp(18px,3.5vw,26px)", color: "#ccc", lineHeight: 1.6, marginBottom: "16px" }}>{obs.line2}</p>
            <p style={{ fontSize: "clamp(18px,3.5vw,26px)", color: "#ccc", lineHeight: 1.6, marginBottom: "48px" }}>{obs.line3}</p>
            <div style={{ width: "48px", height: "2px", background: GREEN, margin: "0 auto 48px" }} />
            <button style={{ background: GREEN, color: "#111", border: "none", borderRadius: "4px", padding: "16px 40px", fontSize: "15px", fontFamily: "'Georgia',serif", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: "700" }}
              onClick={() => setShowObservation(false)}>Continue →</button>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ
  if (screen === "quiz") return (
    <div style={base}>
      <div style={wrap}>
        <div style={{ width: "100%", height: "3px", background: "#222", borderRadius: "2px", marginBottom: "36px", overflow: "hidden" }}>
          <div style={{ height: "100%", background: GREEN, width: `${progress}%`, transition: "width 0.4s ease", borderRadius: "2px" }} />
        </div>
        <div style={tag}>{question.section}</div>
        <div style={subLabel}>{question.sectionLabel}</div>
        <div style={{ fontSize: "clamp(19px,4vw,26px)", fontWeight: 600, lineHeight: 1.45, marginBottom: "32px", opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.3s,transform 0.3s" }}>
          {question.question}
        </div>
        {question.options.map(opt => {
          const isSel = selected?.letter === opt.letter;
          return (
            <button key={opt.letter} onClick={() => handleSelect(opt)}
              style={{ display: "block", width: "100%", textAlign: "left", background: isSel ? "rgba(0,200,150,0.1)" : "rgba(255,255,255,0.04)", border: isSel ? `1.5px solid ${GREEN}` : "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "18px 20px", marginBottom: "12px", cursor: "pointer", color: "#f0f0f0", fontSize: "clamp(15px,2.5vw,17px)", fontFamily: "'Georgia',serif", lineHeight: 1.5, transition: "all 0.2s", opacity: animating ? 0 : 1 }}>
              <span style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{ display: "inline-block", width: "26px", height: "26px", borderRadius: "50%", background: isSel ? GREEN : "rgba(255,255,255,0.1)", color: isSel ? "#111" : "#fff", fontSize: "12px", fontFamily: "'Courier New',monospace", textAlign: "center", lineHeight: "26px", marginRight: "14px", flexShrink: 0, fontWeight: "700", transition: "background 0.2s" }}>{opt.letter}</span>
                <span>{opt.text}</span>
              </span>
            </button>
          );
        })}
        <button onClick={handleNext}
          style={{ marginTop: "24px", width: "100%", background: hasAnswer ? GREEN : "#2a2a2a", color: hasAnswer ? "#111" : "#555", border: "none", borderRadius: "6px", padding: "18px", fontSize: "16px", fontFamily: "'Georgia',serif", cursor: hasAnswer ? "pointer" : "default", letterSpacing: "0.05em", fontWeight: hasAnswer ? "700" : "400", transition: "all 0.3s" }}>
          {currentQ + 1 >= QUESTIONS.length ? "See my result →" : "Next →"}
        </button>
        <div style={{ textAlign: "center", marginTop: "18px", color: "#666", fontSize: "14px", fontFamily: "monospace" }}>{currentQ + 1} / {QUESTIONS.length}</div>
      </div>
    </div>
  );

  // ANALYZING
  if (screen === "analyzing") return (
    <div style={base}>
      <div style={wrap}>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ width: "48px", height: "2px", background: GREEN, margin: "0 auto 48px" }} />
          {ANALYZING_LINES.slice(0, analyzingStep + 1).map((line, i) => (
            <p key={i} style={{ fontSize: i === ANALYZING_LINES.length - 1 ? "clamp(22px,4vw,32px)" : "clamp(16px,3vw,20px)", color: i === ANALYZING_LINES.length - 1 ? "#fff" : "#777", marginBottom: "16px", lineHeight: 1.6, fontStyle: i < ANALYZING_LINES.length - 1 ? "italic" : "normal", fontWeight: i === ANALYZING_LINES.length - 1 ? "600" : "400" }}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );

  // RESULT
  if (screen === "pivot") {
    const type = TYPES[result] || TYPES.Catalyst;
    const diag = DIAGNOSES[diagKey] || DIAGNOSES.belief;
    const reflection = aiResult || REFLECTIONS[`${diagKey}+${result}`] || diag.truth;
    const recognitionKey = `${diagKey}+${result}`;
    const recognitionItems = RECOGNITION[recognitionKey] || [];

    return (
      <div style={base}>
        <div style={wrap}>
          <div style={{ padding: "40px 20px 60px" }}>
            <p style={{ fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#666", marginBottom: "16px", fontFamily: "monospace", textAlign: "center" }}>That's interesting, isn't it.</p>
            <h2 style={{ fontSize: "clamp(24px,5vw,38px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "40px", letterSpacing: "-0.02em", textAlign: "center" }}>
              Want to see what's<br /><span style={{ color: GREEN }}>around the next corner?</span>
            </h2>

            {/* DIAGNOSIS */}
            <div style={{ background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "16px", padding: "32px 28px", marginBottom: "24px" }}>
              <p style={{ ...tag, marginBottom: "16px" }}>What we see</p>
              <p style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: "10px" }}>{diag.headline}</p>
              <p style={{ fontSize: "clamp(18px,3.5vw,24px)", fontWeight: 600, color: GREEN, lineHeight: 1.3, marginBottom: "20px" }}>{diag.subheadline}</p>
              <div style={{ width: "40px", height: "2px", background: "rgba(0,200,150,0.4)", marginBottom: "20px" }} />
              <p style={{ fontSize: "16px", color: "#ccc", lineHeight: 1.8, marginBottom: "16px" }}>{diag.evidence}</p>
              <p style={{ fontSize: "15px", color: GREEN, lineHeight: 1.7, fontStyle: "italic" }}>"{diag.cost}"</p>
            </div>

            {/* TYPE */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "12px", padding: "28px 24px", marginBottom: "24px" }}>
              <p style={{ ...tag, color: "#888" }}>Your natural wiring — the evidence</p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "38px" }}>{type.emoji}</span>
                <span style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, color: "#fff" }}>{type.label}</span>
              </div>
              <p style={{ fontSize: "16px", color: "#ccc", lineHeight: 1.75, marginBottom: "20px" }}>{type.description}</p>
              <p style={{ ...tag, color: GREEN }}>Your first move</p>
              <p style={{ fontSize: "16px", color: "#ddd", lineHeight: 1.75, marginTop: "10px" }}>{type.firstMove}</p>
            </div>

            {/* THE TRUTH */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
              <p style={{ ...tag, color: "#888" }}>The truth</p>
              <p style={{ fontSize: "16px", color: "#ccc", lineHeight: 1.8, marginTop: "10px", fontStyle: "italic" }}>{diag.truth}</p>
            </div>

            {/* PERSONAL REFLECTION */}
            {loading && (
              <div style={{ background: "rgba(0,200,150,0.04)", border: "1px solid rgba(0,200,150,0.1)", borderRadius: "8px", padding: "24px", marginBottom: "24px", textAlign: "center", color: "#666", fontSize: "15px", fontStyle: "italic" }}>
                Reading your answers...
              </div>
            )}
            {reflection && !loading && (
              <div style={{ background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.15)", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                <p style={{ ...tag }}>Your personal reflection</p>
                <p style={{ fontSize: "16px", lineHeight: 1.9, color: "#ddd", fontStyle: "italic", marginTop: "12px" }}>{reflection}</p>
              </div>
            )}

            {/* RECOGNITION BLOCK */}
            {recognitionItems.length > 0 && !loading && (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "28px 24px", marginBottom: "24px" }}>
                <p style={{ ...tag, color: "#888", marginBottom: "20px" }}>How accurate was this?</p>
                {recognitionItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                    <span style={{ color: GREEN, fontSize: "16px", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    <p style={{ fontSize: "15px", color: "#ccc", lineHeight: 1.7, margin: 0 }}>{item}</p>
                  </div>
                ))}

                {/* RESPONSE BUTTONS */}
                {!recognitionResponse ? (
                  <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {Object.entries(RECOGNITION_RESPONSES).map(([key, val]) => (
                      <button key={key} onClick={() => setRecognitionResponse(key)}
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "14px 20px", color: "#ccc", fontSize: "15px", fontFamily: "'Georgia',serif", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#ccc"; }}>
                        {val.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ marginTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                    <p style={{ fontSize: "16px", color: GREEN, lineHeight: 1.7, fontStyle: "italic" }}>
                      {RECOGNITION_RESPONSES[recognitionResponse].reply}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CLOSER */}
            <p style={{ color: "#888", fontSize: "15px", lineHeight: 1.9, marginBottom: "32px", textAlign: "center" }}>
              The assessment wasn't trying to discover your potential.<br />
              Your potential was obvious.<br />
              <span style={{ color: "#bbb" }}>It was trying to discover why you're not fully using it.</span><br /><br />
              <span style={{ color: "#666" }}>If overnight success was how it was going to work —<br />it already would have happened.<br /></span>
              <span style={{ color: "#999" }}>This is your path. Let's build it.</span>
            </p>

            {/* EMAIL CAPTURE — only fully unlocked after recognition response */}
            {emailSubmitted ? (
              <div style={{ background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.25)", borderRadius: "10px", padding: "28px", marginBottom: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: 700, color: GREEN, marginBottom: "10px" }}>You're in. 🔥</p>
                <p style={{ fontSize: "16px", color: "#ccc", lineHeight: 1.7 }}>Check your inbox — something's coming your way. In the meantime, the most important next step is the one you already know you need to take.</p>
              </div>
            ) : offerClicked ? (
              <div style={{ background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "10px", padding: "28px", marginBottom: "16px" }}>
                <p style={{ fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "8px", textAlign: "center" }}>Want to go deeper?</p>
                <p style={{ fontSize: "15px", color: "#aaa", lineHeight: 1.7, marginBottom: "20px", textAlign: "center" }}>Drop your email and I'll reach out personally to set up a one-on-one conversation about what came up for you.</p>
                <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "16px", fontSize: "16px", color: "#fff", fontFamily: "'Georgia',serif", marginBottom: "12px", boxSizing: "border-box" }} />
                <button onClick={() => { if (email) setEmailSubmitted(true); }}
                  style={{ width: "100%", background: GREEN, color: "#111", border: "none", borderRadius: "6px", padding: "18px", fontSize: "16px", fontFamily: "'Georgia',serif", cursor: "pointer", fontWeight: "700", letterSpacing: "0.05em" }}>
                  Send It →
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOfferClicked(true)}
                style={{
                  width: "100%",
                  background: recognitionResponse === "accurate" ? GREEN : recognitionResponse ? "rgba(0,200,150,0.15)" : "#1e1e1e",
                  color: recognitionResponse === "accurate" ? "#111" : recognitionResponse ? GREEN : "#555",
                  border: recognitionResponse ? `1px solid ${GREEN}` : "1px solid #2a2a2a",
                  borderRadius: "6px", padding: "20px", fontSize: "16px", fontFamily: "'Georgia',serif",
                  cursor: recognitionResponse ? "pointer" : "default",
                  letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: "700", marginBottom: "12px",
                  transition: "all 0.4s"
                }}>
                {recognitionResponse === "accurate"
                  ? "Show Me The Next Step →"
                  : recognitionResponse
                    ? "Show Me The Next Step →"
                    : "Answer above to continue →"}
              </button>
            )}

            <button onClick={resetAll}
              style={{ width: "100%", background: "transparent", border: "1px solid #2a2a2a", color: "#666", borderRadius: "6px", padding: "16px", fontSize: "15px", fontFamily: "'Georgia',serif", cursor: "pointer", marginTop: "8px" }}>
              Start over
            </button>
          </div>
        </div>
      </div>
    );
  }
}
