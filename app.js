// Initial values
const API_KEY = 'e9cfe9826bad68eb6a0627b7c25f8b4c';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

// selected DOM elements
const movieSearchInputElement = document.querySelector('#movieSearchInput');
const searchMovieButtonElement = document.querySelector('#searchMovieButton');
const searchMovieFormElement = document.querySelector('search-movie-form');
const moviesSearchableElement = document.querySelector('#moviesSearchable');

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=${API_KEY}`;
  return url;
}

function requestMovies(url, onComplete, onError) {
  fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
}

function searchMovie(value) {
  const path = '/search/movie';
  const url = `${generateUrl(path)}&query=${value}`;

  requestMovies(url, renderSearchMovies, handleError);
}

function handleError() {
  console.log('Error: ', err);
}

searchMovieButtonElement.onclick = (e) => {
  e.preventDefault();
  const value = movieSearchInputElement.value;
  searchMovie(value);

  movieSearchInputElement.value = '';
};

// fetch searched movie data
function renderSearchMovies(data) {
  moviesSearchableElement.innerHTML = '';
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  moviesSearchableElement.appendChild(movieBlock);
  console.log(data);
}

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img class="movie-poster"
      src=${IMAGE_URL}${movie.poster_path} 
      data-movie-id=${movie.id}>`;
    }
  });
}

function createMovieContainer(movies) {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');

  const movieTemplate = `
    <section class="section">
      ${movieSection(movies)}
    </section>
    <div class="content">
      <p id="contentClose">X</p>
    </div>
    `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function createIframe(video) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe;
}

function createVideoTemplate(data, content) {
  content.innerHTML = `<p id="contentClose">X</p>`;
  console.log('Videos:', data);
  const videos = data.results;
  const length = videos.length > 4 ? 4 : videos.length;
  const iframeContainer = document.createElement('div');

  for (let i = 0; i < length; i++) {
    const video = videos[i];
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

// Event Delegation
document.onclick = function (e) {
  const target = e.target;

  // open movie content when clicking movie poster
  if (target.classList.contains('movie-poster')) {
    const movieId = target.dataset.movieId;
    console.log('MovieId: ', movieId);
    const section = e.target.parentElement;
    const content = section.nextElementSibling;
    content.classList.add('content-display');

    // fetch movie videos
    const path = `/movie/${movieId}/videos`;
    const videosUrl = generateUrl(path);

    fetch(videosUrl)
      .then((res) => res.json())
      .then((data) => {
        createVideoTemplate(data, content);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  // close movie content
  if (target.id === 'contentClose') {
    const content = target.parentElement;
    content.classList.remove('content-display');
  }
};
