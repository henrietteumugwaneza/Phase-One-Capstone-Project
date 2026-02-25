// ================= GLOBAL THEME SYSTEM =================

// Elements
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");
const body = document.getElementById("appBody");

// Only run if icons exist (multi-page safety)
if (moonIcon && sunIcon && body) {

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    // Initial state
    if (savedTheme === "light") {
        applyLightMode();
    } else {
        applyDarkMode(); // default
    }

    // Moon click → Dark
    moonIcon.addEventListener("click", () => {
        applyDarkMode();
        localStorage.setItem("theme", "dark");
    });

    // Sun click → Light
    sunIcon.addEventListener("click", () => {
        applyLightMode();
        localStorage.setItem("theme", "light");
    });
}

// ===== FUNCTIONS =====

function applyDarkMode() {
    body.classList.remove("bg-white", "text-black");
    body.classList.add("bg-darkbg", "text-white");

    moonIcon.classList.add("text-accent");
    sunIcon.classList.remove("text-accent");
}

function applyLightMode() {
    body.classList.remove("bg-darkbg", "text-white");
    body.classList.add("bg-white", "text-black");

    sunIcon.classList.add("text-accent");
    moonIcon.classList.remove("text-accent");
}

