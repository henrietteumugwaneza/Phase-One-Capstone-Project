import { getFavorites } from "./storage.js";
import { removeFromFavorites } from "./favorites.js";

const favoritesGrid = document.getElementById("favoritesGrid");
const emptyText = document.getElementById("emptyText");

loadFavorites();

function loadFavorites() {

    const favorites = getFavorites();

    if (favorites.length === 0) {
        emptyText.classList.remove("hidden");
        favoritesGrid.innerHTML = "";
        return;
    }

    emptyText.classList.add("hidden");
    favoritesGrid.innerHTML = "";

    favorites.forEach(book => {

        // Create card
        const card = document.createElement("div");

        // Layout: horizontal flex
        card.className = `
            bg-darkcard p-4 rounded-xl shadow 
            flex items-center gap-4 
            hover:shadow-xl transition-all duration-300
        `;

        // Small image
        
        if (!book.cover) return; // skip books without cover
       const cover = book.cover;

        card.innerHTML = `
            <!-- Small Image -->
            <img 
                src="${cover}" 
                class="w-16 h-24 object-cover rounded-md"
                alt="Book cover"
            >

            <!-- Text Content -->
            <div class="flex-1">
                <h3 class="font-bold text-sm">${book.title}</h3>
                <p class="text-softgray text-xs mt-1">
                    ${book.author_name ? book.author_name[0] : "Unknown Author"}
                </p>
            </div>

            <!-- Remove Button -->
            <button class="bg-red-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700 transition">
                Remove
            </button>
        `;

        // Remove logic
        const btn = card.querySelector("button");
        btn.addEventListener("click", () => {
            removeFromFavorites(book.key);
            loadFavorites();
        });

        favoritesGrid.appendChild(card);
    });
}