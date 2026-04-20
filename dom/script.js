
// ---------- Card container ----------
let div = document.createElement("div");
div.style.width = "90%";
div.style.maxWidth = "420px";
div.style.padding = "28px 24px";
div.style.borderRadius = "20px";
div.style.background = "rgba(255,255,255,0.12)";
div.style.backdropFilter = "blur(16px)";
div.style.boxShadow = "0 24px 60px rgba(0,0,0,0.25)";
div.style.textAlign = "center";
div.style.border = "1px solid rgba(255,255,255,0.2)";
div.style.transition = "transform 0.2s ease";
div.addEventListener("mouseover", () => div.style.transform = "translateY(-4px)");
div.addEventListener("mouseout", () => div.style.transform = "translateY(0)");
document.body.appendChild(div);



// ---------- Page styling ----------
document.body.style.minHeight = "100vh";
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.background = "linear-gradient(135deg, #1f3c88, #3c8dbc)";
document.body.style.fontFamily = "Segoe UI, sans-serif";
document.body.style.color = "#fff";

const fallbackJokes = [
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I told my computer I needed a break, and it said 'No problem — I'll go to sleep.'",
    "Why don't skeletons fight each other? They don't have the guts."
];


// ---------- Heading ----------
let h = document.createElement("h2");
h.innerText = "Random Joke Generator";
h.style.margin = "0 0 10px";
h.style.fontSize = "1.75rem";
h.style.letterSpacing = "0.03em";
h.style.textShadow = "0 2px 14px rgba(0,0,0,0.15)";
div.appendChild(h);

let subtitle = document.createElement("p");
subtitle.innerText = "Click the button below to fetch a fresh joke. If the API fails, a fallback joke will appear.";
subtitle.style.margin = "0 0 22px";
subtitle.style.fontSize = "0.95rem";
subtitle.style.opacity = "0.85";
subtitle.style.lineHeight = "1.5";
div.appendChild(subtitle);

// ---------- Generate button ----------
let btn = document.createElement("button");
btn.type = "button";
btn.innerText = "Generate Joke";
btn.style.cursor = "pointer";
btn.style.border = "none";
btn.style.borderRadius = "999px";
btn.style.padding = "14px 24px";
btn.style.fontSize = "1rem";
btn.style.fontWeight = "600";
btn.style.color = "#1f3c88";
btn.style.background = "#fff";
btn.style.boxShadow = "0 12px 24px rgba(0,0,0,0.14)";
btn.style.transition = "transform 0.2s ease, box-shadow 0.2s ease, outline 0.2s ease";
btn.style.outline = "none";
btn.addEventListener("mouseover", () => {
    btn.style.transform = "translateY(-2px)";
    btn.style.boxShadow = "0 16px 28px rgba(0,0,0,0.18)";
});
btn.addEventListener("mouseout", () => {
    btn.style.transform = "translateY(0)";
    btn.style.boxShadow = "0 12px 24px rgba(0,0,0,0.14)";
});
btn.addEventListener("focus", () => {
    btn.style.boxShadow = "0 0 0 4px rgba(255,255,255,0.35)";
});
btn.addEventListener("blur", () => {
    btn.style.boxShadow = "0 12px 24px rgba(0,0,0,0.14)";
});
div.appendChild(btn);

// ---------- Joke display ----------
let showJoke = document.createElement("div");
showJoke.style.marginTop = "24px";
showJoke.style.minHeight = "120px";
showJoke.style.padding = "16px 18px";
showJoke.style.borderRadius = "16px";
showJoke.style.background = "rgba(255,255,255,0.16)";
showJoke.style.color = "#f1f7ff";
showJoke.style.fontSize = "1rem";
showJoke.style.lineHeight = "1.6";
showJoke.style.letterSpacing = "0.01em";
showJoke.style.whiteSpace = "pre-line";
showJoke.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.08)";
showJoke.style.transition = "background 0.2s ease";
showJoke.innerText = "Click 'Generate Joke' to get a laugh.";
div.append(showJoke);

// ---------- Fetch joke ----------
btn.addEventListener("click", async function() {
    showJoke.innerText = "Loading Joke...";
    showJoke.style.background = "rgba(255,255,255,0.08)";
    btn.disabled = true;
    btn.style.opacity = "0.8";

    try {
        let f = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!f.ok) {
            throw new Error(`HTTP ${f.status}`);
        }
        let data = await f.json();
        console.log(data);
        showJoke.innerText = `${data.setup}\n\n${data.punchline}`;
    } catch (err) {
        console.error(err);
        let fallback = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
        showJoke.innerText = `Unable to load a joke from the API. Here's one for now:\n\n${fallback}`;
    } finally {
        showJoke.style.background = "rgba(255,255,255,0.16)";
        btn.disabled = false;
        btn.style.opacity = "1";
    }
});

