// selected DOM elements
const movieSearchInputElement = document.querySelector('#movieSearchInput');
const searchMovieButtonElement = document.querySelector('#searchMovieButton');
const moviesSearchableElement = document.querySelector('#moviesSearchable');
const moviesContainer = document.querySelector('#moviesContainer');

const searchButtonElement = document.querySelector('#searchButton');
const searchMovieFormElement = document.querySelector('form');

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
      const movieContainer = document.createElement('div');
      movieContainer.classList = 'movie-container';
      movieContainer.setAttribute('data-movie-id', movie.id);
      const movieCard = document.createElement('div');
      movieCard.classList = 'movie-card';

      const img = document.createElement('img');
      img.src = `${IMAGE_URL}${movie.poster_path}`;
      img.classList = 'movie-poster';
      img.height = 375;

      const movieDetails = document.createElement('div');
      movieDetails.classList = 'movie-details';

      const movieHeader = document.createElement('div');
      movieHeader.classList = 'movie-header';
      const movieTitle = document.createElement('h3');
      const addToListButton = document.createElement('button');
      addToListButton.innerHTML = '<i class="fas fa-plus-square"></i>';
      const button = addToListButton.firstElementChild;
      button.setAttribute('data-movie-id', movie.id);
      movieHeader.appendChild(movieTitle);
      movieHeader.appendChild(addToListButton);
      movieTitle.innerHTML = movie.title;

      const movieOverview = document.createElement('figcaption');
      movieOverview.innerHTML = movie.overview;

      const movieTrailerLink = document.createElement('div');
      movieTrailerLink.innerHTML = 'View Trailers';
      movieTrailerLink.classList = 'trailer-link';
      movieTrailerLink.setAttribute('data-movie-id', movie.id);

      const movieInfo = document.createElement('div');
      // child elements for movie info div
      const movieYear = document.createElement('span');
      const releaseYear = movie.release_date.substring(0, 4);
      movieYear.innerHTML = releaseYear;
      const movieRating = document.createElement('span');
      movieRating.innerHTML = movie.vote_average;
      const movieDiscretion = document.createElement('span');
      movieDiscretion.innerHTML = movie.adult ? '18+' : 'All';

      movieInfo.appendChild(movieYear);
      movieInfo.appendChild(movieRating);
      movieInfo.appendChild(movieDiscretion);

      movieDetails.appendChild(movieHeader);
      movieDetails.appendChild(movieOverview);
      movieDetails.appendChild(movieTrailerLink);
      movieDetails.appendChild(movieInfo);

      movieCard.appendChild(img);
      movieCard.appendChild(movieDetails);

      movieContainer.appendChild(movieCard);

      section.appendChild(movieContainer);
    }
  });

  return section;
}

function createMovieContainer(movies, title = 'Search Results') {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');

  const header = document.createElement('h2');
  header.innerHTML = title;
  header.id = `${title}`;

  const content = document.createElement('div');
  content.classList = 'content';

  const contentClose = `<i class="fas fa-times-circle" id="contentClose"></i>`;

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
  iframe.classList = 'movie-video';

  return iframe;
}

function createVideoTemplate(data, content) {
  content.innerHTML = `<i class="fas fa-window-close" id="contentClose"></i>`;
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

  // toggle search input field
  if (
    target.classList.contains('search-and-account-container') ||
    target.classList.contains('fa-search') ||
    target.classList.contains('expand-input') ||
    target.classList.contains('show-form')
  ) {
    showSearchBar();
  } else {
    hideSearchBar();
  }

  // get all trailers videos for a movie
  if (target.classList.contains('trailer-link')) {
    // open movie content when clicking movie poster
    const movieId = target.dataset.movieId;
    console.log('MovieId: ', movieId);

    const section =
      e.target.parentElement.parentElement.parentElement.parentElement;
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

  if (target.classList.contains('fa-plus-square')) {
    const movieId = target.dataset.movieId;
    console.log(`added to wish list`);
    console.log('MovieId: ', movieId);
  }
};
// Toggle Search Bar on/off
searchButtonElement.onclick = (e) => {
  console.log(searchMovieFormElement);
  searchMovieFormElement.classList.add('show-form');
  movieSearchInputElement.classList.add('expand-input');
  searchMovieFormElement.classList.remove('search-movie-form');
  movieSearchInputElement.classList.remove('search-input');
};

function hideSearchBar() {
  searchMovieFormElement.classList.add('search-movie-form');
  movieSearchInputElement.classList.add('search-input');
  searchMovieFormElement.classList.remove('show-form');
  movieSearchInputElement.classList.remove('expand-input');
  searchMovieButtonElement.classList.add('abs');
}

function showSearchBar() {
  searchMovieFormElement.classList.add('show-form');
  movieSearchInputElement.classList.add('expand-input');
  searchMovieFormElement.classList.remove('search-movie-form');
  movieSearchInputElement.classList.remove('search-input');
  searchMovieButtonElement.classList.remove('abs');
}

searchMovie('Kung fu panda');
getUpcomingMovie();
getTrendingMoviesToday();
getTrendingMoviesWeek();
getTopRatedMovies();
getPopularMovies();
