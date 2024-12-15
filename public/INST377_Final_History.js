
async function fetchSearchHistory() {
    try {
        const response = await fetch('http://localhost:3000/api/search-history');
        const data = await response.json();

        if (data && data.length > 0) {
            const tableBody = document.getElementById('search-history-table').querySelector('tbody');
            tableBody.innerHTML = ''; 
            data.forEach((entry) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.search_query}</td>
                    <td>${new Date(entry.created_at).toLocaleString()}</td>
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
