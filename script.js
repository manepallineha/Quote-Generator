// 🔥 Local backup quotes (important!)
const localQuotes = {
    happy: [
        { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
        { quote: "Smile, it's free therapy.", author: "Douglas Horton" },
        { quote: "Stay close to what makes you happy.", author: "Unknown" },
        { quote: "Happiness is a journey, not a destination.", author: "Unknown" },
        { quote: "Choose joy every day.", author: "Unknown" },
        { quote: "Do more of what makes you happy.", author: "Unknown" },
        { quote: "Be happy for this moment.", author: "Omar Khayyam" },
        { quote: "Happiness is homemade.", author: "Unknown" },
        { quote: "Laugh more, worry less.", author: "Unknown" },
        { quote: "Collect moments, not things.", author: "Unknown" },
        { quote: "Be the reason someone smiles today.", author: "Unknown" },
        { quote: "Enjoy the little things.", author: "Unknown" },
        { quote: "Life is better when you're laughing.", author: "Unknown" },
        { quote: "Radiate positivity.", author: "Unknown" },
        { quote: "Keep smiling.", author: "Unknown" },
        { quote: "Good vibes only.", author: "Unknown" },
        { quote: "Stay positive.", author: "Unknown" },
        { quote: "Make today amazing.", author: "Unknown" },
        { quote: "Find joy in the ordinary.", author: "Unknown" },
        { quote: "Happiness looks good on you.", author: "Unknown" }
    ],

    sad: [
        { quote: "This too shall pass.", author: "Unknown" },
        { quote: "You are stronger than you think.", author: "Unknown" },
        { quote: "Every storm runs out of rain.", author: "Unknown" },
        { quote: "Better days are coming.", author: "Unknown" },
        { quote: "You will get through this.", author: "Unknown" },
        { quote: "It's okay to not be okay.", author: "Unknown" },
        { quote: "Healing takes time.", author: "Unknown" },
        { quote: "Stars shine in darkness.", author: "Unknown" },
        { quote: "Keep going slowly.", author: "Unknown" },
        { quote: "You matter.", author: "Unknown" },
        { quote: "Don't lose hope.", author: "Unknown" },
        { quote: "Be gentle with yourself.", author: "Unknown" },
        { quote: "Pain is temporary.", author: "Unknown" },
        { quote: "Every day is a new start.", author: "Unknown" },
        { quote: "Feel it then heal it.", author: "Unknown" },
        { quote: "You are not alone.", author: "Unknown" },
        { quote: "Stay strong.", author: "Unknown" },
        { quote: "Rain helps flowers grow.", author: "Unknown" },
        { quote: "Take your time.", author: "Unknown" },
        { quote: "Hope will find you.", author: "Unknown" }
    ],

    demotivated: [
        { quote: "Push yourself, no one else will.", author: "Unknown" },
        { quote: "Believe in yourself.", author: "Unknown" },
        { quote: "Small steps every day.", author: "Unknown" },
        { quote: "Don't quit.", author: "Unknown" },
        { quote: "Focus on your goal.", author: "Unknown" },
        { quote: "Great things take time.", author: "Unknown" },
        { quote: "Stay consistent.", author: "Unknown" },
        { quote: "You can do it.", author: "Unknown" },
        { quote: "Make it happen.", author: "Unknown" },
        { quote: "Your only limit is you.", author: "Unknown" },
        { quote: "Start now.", author: "Unknown" },
        { quote: "Progress over perfection.", author: "Unknown" },
        { quote: "Rise and grind.", author: "Unknown" },
        { quote: "Keep moving forward.", author: "Unknown" },
        { quote: "Dream big.", author: "Unknown" },
        { quote: "Turn pain into power.", author: "Unknown" },
        { quote: "Stay focused.", author: "Unknown" },
        { quote: "Be unstoppable.", author: "Unknown" },
        { quote: "Success takes effort.", author: "Unknown" },
        { quote: "You are capable.", author: "Unknown" }
    ]
};

function changeMoodUI() {
    const mood = document.getElementById("mood").value;
    const body = document.body;
    const btn = document.getElementById("mainBtn");

    document.getElementById("quote").innerText = "Get a fresh quote...";
    document.getElementById("author").innerText = "";
    document.getElementById("quote").classList.remove("show");

    if (mood === "happy") {
        body.style.background = "linear-gradient(135deg, #FFD700, #FFB6C1, #87CEFA)";
        btn.style.backgroundColor = "#ff4081";
    } else if (mood === "sad") {
        body.style.background = "linear-gradient(135deg, #cfd9df, #e2ebf0)";
        btn.style.backgroundColor = "#5dade2";
    } else if (mood === "demotivated") {
    body.style.background = "linear-gradient(135deg, #a8edea, #fed6e3)";
    btn.style.background = "linear-gradient(45deg, #89f7fe, #66a6ff)";
}
}

function typeEffect(text, element, speed = 30) {
    element.innerHTML = ""; // use HTML instead of innerText

    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text[i] === " " ? "&nbsp;" : text[i];
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

function generateQuote() {
    const mood = document.getElementById("mood").value;

    if (!mood) {
        alert("Select mood first!");
        return;
    }

    const quoteEl = document.getElementById("quote");
    const authorEl = document.getElementById("author");

    const moodQuotes = localQuotes[mood];
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);

    quoteEl.classList.remove("show");

    setTimeout(() => {
        typeEffect(moodQuotes[randomIndex].quote, quoteEl);
        authorEl.innerText = "- " + moodQuotes[randomIndex].author;
        quoteEl.classList.add("show");
    }, 200);
}

function copyQuote() {
    const text = document.getElementById("quote").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied!");
}

function shareQuote() {
    const text = document.getElementById("quote").innerText;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
}

function saveFavorite() {
    const quote = document.getElementById("quote").innerText;

    if (!quote || quote.includes("Get a fresh")) {
        alert("Generate a quote first!");
        return;
    }

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favs.includes(quote)) {
        alert("Already saved!");
        return;
    }

    favs.push(quote);
    localStorage.setItem("favorites", JSON.stringify(favs));

    displayFavorites();
    alert("❤️ Saved!");
}

function displayFavorites() {
    const list = document.getElementById("favorites");
    list.innerHTML = "";

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    favs.forEach(q => {
        let li = document.createElement("li");
        li.innerText = q;
        list.appendChild(li);
    });
}

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        circle.classList.add("ripple");

        const rect = this.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left + "px";
        circle.style.top = e.clientY - rect.top + "px";

        this.appendChild(circle);

        setTimeout(() => circle.remove(), 500);
    });
});

displayFavorites();