// ================= THEME TOGGLE SYSTEM =================

// Elements
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");
const body = document.getElementById("appBody");

// Safety check
if (moonIcon && sunIcon && body) {

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    // Initial state
    if (savedTheme === "light") {
        applyLightMode();
    } else {
        applyDarkMode(); // default
    }

    // Moon click → Dark mode
    moonIcon.addEventListener("click", () => {
        applyDarkMode();
        localStorage.setItem("theme", "dark");
    });

    // Sun click → Light mode
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

import { fetchBooks } from "./api.js";
import { addToFavorites } from "./favorites.js";

// DOM elements
const bookGrid = document.getElementById("bookGrid");
const loadingText = document.getElementById("loadingText");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Load default books
loadBooks("programming");

// Main loader
async function loadBooks(query) {

    loadingText.style.display = "block";
    bookGrid.innerHTML = "";

    const books = await fetchBooks(query);

    loadingText.style.display = "none";

    if (!books || books.length === 0) {
        loadingText.innerText = "No books found";
        loadingText.style.display = "block";
        return;
    }

    books.forEach(book => {
          // Skip books without images
    if (!book.cover_i && (!book.edition_key || book.edition_key.length === 0)) {
        return; // skip this book
    }

        // Create card
        const card = document.createElement("div");
        card.className = "bg-darkcard p-4 rounded-lg shadow hover:scale-105 transition flex flex-col";

        // -------- IMAGE LOGIC --------
       let coverUrl = "";

if (book.cover_i) {
    coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
} else if (book.edition_key && book.edition_key.length > 0) {
    coverUrl = `https://covers.openlibrary.org/b/olid/${book.edition_key[0]}-M.jpg`;
}

        // Card HTML
        card.innerHTML = `
            <img 
                src="${coverUrl}" 
                alt="Book cover"
                class="w-full h-56 object-cover rounded mb-3"
            >

            <h3 class="font-bold mb-1">${book.title || "No title"}</h3>

            <p class="text-softgray text-sm mb-2">
                ${book.author_name ? book.author_name[0] : "Unknown Author"}
            </p>

            <button class="bg-accent text-black px-3 py-2 rounded mt-auto w-full font-semibold">
                Add to Favorites
            </button>
        `;

        // Button logic
        const btn = card.querySelector("button");

        btn.addEventListener("click", () => {

            const bookData = {
                key: book.key,
                title: book.title,
                author_name: book.author_name,
                cover: coverUrl
            };

            addToFavorites(bookData);

            // UI feedback
            btn.innerText = "Saved ✓";
            btn.disabled = true;
            btn.classList.add("opacity-60");
        });

        bookGrid.appendChild(card);
    });
}

// Search
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        loadBooks(query);
    }
});
