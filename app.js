// selected DOM elements
const movieSearchInputElement = document.querySelector('#movieSearchInput');
const searchMovieButtonElement = document.querySelector('#searchMovieButton');
const moviesSearchableElement = document.querySelector('#moviesSearchable');
const moviesContainer = document.querySelector('#moviesContainer');

function handleError() {
  console.log('Error: ', err);
}

searchMovieButtonElement.onclick = (e) => {
  e.preventDefault();
  const value = movieSearchInputElement.value;
  searchMovie(value);

  movieSearchInputElement.value = '';
};

// fetch searched movie data only
function renderSearchMovies(data) {
  moviesSearchableElement.innerHTML = '';
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  moviesSearchableElement.appendChild(movieBlock);
  console.log(data);
}

// fetch movie data
function renderMovies(data) {
  const title = this.title;
  const movies = data.results;
  const movieBlock = createMovieContainer(movies, title);
  moviesContainer.appendChild(movieBlock);
  console.log(data);
}

function movieSection(movies) {
  const section = document.createElement('section');
  section.classList = 'section';
  movies.map((movie) => {
    if (movie.poster_path) {
      const img = document.createElement('img');
      img.src = `${IMAGE_URL}${movie.poster_path}`;
      img.classList = 'movie-poster';
      img.setAttribute('data-movie-id', movie.id);

      section.appendChild(img);
    }
  });

  return section;
}

function createMovieContainer(movies, title = '') {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');

  const header = document.createElement('h2');
  header.innerHTML = title;

  const content = document.createElement('div');
  content.classList = 'content';

  const contentClose = `<p id="contentClose">X</p>`;

  content.innerHTML = contentClose;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);
  movieElement.appendChild(content);
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
  console.log(target);

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

searchMovie('Spiderman');
getTopRatedMovies();
getUpcomingMovie();
getPopularMovies();
