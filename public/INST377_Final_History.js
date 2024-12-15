async function fetchSearchHistory() {
    try {
        // Fetch the search history from the backend
        const response = await fetch('/api/search-history'); 

        // Check if response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response

        // Select the table body to populate rows
        const tableBody = document
            .getElementById('search-history-table')
            .querySelector('tbody');

        // Clear existing rows
        tableBody.innerHTML = '';

        if (data && data.length > 0) {
            // Populate rows with fetched data
            data.forEach((entry, index) => {
                const searchQuery = entry.search_query || 'No query provided'; // Fallback for missing data
                const createdAt = entry.created_at
                    ? new Date(entry.created_at).toLocaleString()
                    : 'Unknown date';

                // Create a new row for each entry
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${searchQuery}</td>
                    <td>${createdAt}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            // Show a friendly message if no data is available
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align: center;">No search history available.</td>
                </tr>
            `;
        }
    } catch (error) {
        // Log and display errors
        console.error('Error fetching search history:', error);

        const tableBody = document
            .getElementById('search-history-table')
            .querySelector('tbody');
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align: center; color: red;">Failed to load search history. Please try again later.</td>
            </tr>
        `;
    }
}

// Fetch search history when the page loads
window.addEventListener('load', fetchSearchHistory);
