import { saveFavorites, getFavorites } from "./storage.js";

// Add book
export function addToFavorites(book) {

    const favorites = getFavorites();

    // Prevent duplicates
    const exists = favorites.find(item => item.key === book.key);

    if (!exists) {
        favorites.push(book);
        saveFavorites(favorites);
    }
}

// Remove book
export function removeFromFavorites(key) {

    let favorites = getFavorites();

    favorites = favorites.filter(book => book.key !== key);

    saveFavorites(favorites);
}