// Exported function to fetch books from Open Library API
export async function fetchBooks(query = "programming") {

    // API URL with dynamic search query
    const url = `https://openlibrary.org/search.json?q=${query}`;

    // Send request to API
    const response = await fetch(url);

    // Convert response to JSON format
    const data = await response.json();

    // Return book list from API data
    return data.docs;
}