async function fetchSearchHistory() {
    try {
        const response = await fetch('/api/search-history'); // Ensure this points to the correct API endpoint
        const data = await response.json();

        if (data && data.length > 0) {
            const tableBody = document.getElementById('search-history-table').querySelector('tbody');
            tableBody.innerHTML = ''; 
            data.forEach((entry) => {
                const searchQuery = entry.search_query || 'No query provided'; // Fallback for missing data
                const createdAt = entry.created_at
                    ? new Date(entry.created_at).toLocaleString()
                    : 'Unknown date';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${searchQuery}</td>
                    <td>${createdAt}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.log('No data found');
        }
    } catch (error) {
        console.error('Error fetching search history:', error);
    }
}

window.addEventListener('load', fetchSearchHistory);
