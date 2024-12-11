
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    

    const searchQuery = document.getElementById('search-input').value.trim();
    
    if (searchQuery === '') {
        alert('Please enter a word to search for.');
        return;
    }

    window.location.href = `INST377_Final_Search.html?word=${encodeURIComponent(searchQuery)}`;
});


document.getElementById('search-input').addEventListener('input', function (e) {
    const searchQuery = e.target.value.trim();
    if (searchQuery.length >= 3) {

        console.log(`Searching for: ${searchQuery}`);
    }
});
