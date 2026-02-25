// Save favorites to localStorage
export function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Get favorites from localStorage
export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}