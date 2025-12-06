document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const resultsSection = document.getElementById("results");

    searchBtn.addEventListener("click", () => {
        const term = searchInput.value.trim();

        if (!term) {
            resultsSection.innerHTML = `<p>Please enter an artist name.</p>`;
            return;
        }

        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=20`)
            .then(res => res.json())
            .then(data => {
                if (!data.results.length) {
                    resultsSection.innerHTML = `<p>No results found.</p>`;
                    return;
                }

                resultsSection.innerHTML = data.results
                    .map(item => `
                        <div class="card">
                            <img src="${item.artworkUrl100}" alt="Album Art" />
                            <h3>${item.trackName}</h3>
                            <p>${item.artistName}</p>
                            <audio controls src="${item.previewUrl}"></audio>
                        </div>
                    `)
                    .join("");
            })
            .catch(err => {
                console.error(err);
                resultsSection.innerHTML = `<p>Error fetching music. Try again later.</p>`;
            });
    });
});

