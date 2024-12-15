const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get('word');

const searchQueryElement = document.getElementById('search-query');
const resultsContainer = document.getElementById('results-container');

if (word) {
    searchQueryElement.textContent = word;
    fetchDefinition(word);
    storeSearchQuery(word);
} else {
    searchQueryElement.textContent = 'No search term provided';
}

async function fetchDefinition(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`);
        const data = await response.json();

        if (data.title === 'No Definitions Found') {
            resultsContainer.innerHTML = `<p>No definitions found for <strong>${word}</strong></p>`;
        } else {
            displayResults(data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = `<p>Sorry, there was an error fetching the definition.</p>`;
    }
}

function displayResults(data) {
    let htmlContent = '';

    data.forEach((entry) => {
        htmlContent += `<div class="result-item">
            <h3 class="result-word">${entry.word}</h3>`;

        if (entry.phonetics && entry.phonetics.length > 0) {
            entry.phonetics.forEach((phonetic) => {
                if (phonetic.text) {
                    htmlContent += `<p class="pronunciation"><strong>Pronunciation:</strong> ${phonetic.text}</p>`;
                }

                if (phonetic.audio && phonetic.audio.startsWith('http')) {
                    htmlContent += `<p><strong>Listen to the pronunciation:</strong></p>
                                    <audio controls>
                                        <source src="${phonetic.audio}" type="audio/mp3">
                                        Your browser does not support the audio element.
                                    </audio>`;
                }
            });
        }

        entry.meanings.forEach((meaning) => {
            htmlContent += `<p class="part-of-speech"><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>`;
            meaning.definitions.forEach((definition, index) => {
                htmlContent += `<div class="definition">
                    <p><strong>Definition ${index + 1}:</strong> ${definition.definition}</p>`;
                if (definition.example) {
                    htmlContent += `<p><strong>Example:</strong> ${definition.example}</p>`;
                }
                htmlContent += `</div>`;
            });
        });

        htmlContent += `</div>`;
    });

    resultsContainer.innerHTML = htmlContent;
}

async function storeSearchQuery(word) {
    try {
        const response = await fetch('https://inst-377-group-project-final.vercel.app/api/search-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search_query: word.trim(),
            })
        });

        if (!response.ok) {
            const data = await response.json();
            console.error("Error storing search:", data.error || "Unknown error");
        } else {
            console.log(`Search query "${word}" stored successfully!`);
        }
    } catch (error) {
        console.error("Error storing search:", error.message);
    }
}
