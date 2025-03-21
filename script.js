
async function fetchMovies() {
    const movieTitle = document.getElementById('movieInput').value;
    const apiUrl = `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${encodeURIComponent(movieTitle)}.json`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3d0ac24823mshd56364b582d6aacp105fe3jsn42f21b739527', 
            'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
        }
    };

    try {
        if (!movieTitle) throw new Error('Please enter a valid movie title');

        const response = await fetch(apiUrl, options);
        console.log('Response Status:', response.status);

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const result = await response.json();
        console.log('API Response:', result);

        const movieContainer = document.getElementById('movieResults');
        movieContainer.innerHTML = '<h2>Search Results:</h2>';

        if (result && result.d) {
            result.d.forEach(movie => {
                movieContainer.innerHTML += `
                    <div class="movie">
                        <p><strong>Title:</strong> ${movie.l}</p>
                        <p><strong>Year:</strong> ${movie.y || 'N/A'}</p>
                        <img src="${movie.i?.imageUrl || 'https://via.placeholder.com/150'}" alt="${movie.l}" width="150" />
                    </div>
                `;
            });
        } else {
            movieContainer.innerHTML += '<p>No movies found.</p>';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Failed to fetch movies. Check the console for more details.');
    }
}
