// selected DOM elements
const movieSearchInputElement = document.querySelector('#movieSearchInput');
const searchMovieButtonElement = document.querySelector('#searchMovieButton');
const moviesSearchableElement = document.querySelector('#moviesSearchable');
const moviesContainer = document.querySelector('#moviesContainer');

const searchButton = document.querySelector('#searchButton');
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
      const movieCard = document.createElement('div');
      movieCard.classList = 'movie-card';

      const img = document.createElement('img');
      img.src = `${IMAGE_URL}${movie.poster_path}`;
      img.classList = 'movie-poster';
      img.setAttribute('data-movie-id', movie.id);

      const movieDetails = document.createElement('article');
      movieDetails.classList = 'movie-details';
      // movie title
      const movieTitle = document.createElement('h3');
      movieTitle.innerHTML = movie.title;
      // movie overview
      const movieOverview = document.createElement('figcaption');
      movieOverview.innerHTML = movie.overview;
      // movie information (year, popularity, viewer age)
      const movieInfo = document.createElement('div');

      const movieYear = document.createElement('span');
      const releaseYear = movie.release_date.substring(0, 4);
      movieYear.innerHTML = releaseYear;
      const moviePopularity = document.createElement('span');
      const popularityPercentage = Math.round(movie.popularity);
      moviePopularity.innerHTML = popularityPercentage;
      const movieDiscretion = document.createElement('span');
      movieDiscretion.innerHTML = movie.adult ? '18+' : 'All';

      movieInfo.appendChild(movieYear);
      movieInfo.appendChild(moviePopularity);
      movieInfo.appendChild(movieDiscretion);

      movieDetails.appendChild(movieTitle);
      movieDetails.appendChild(movieOverview);
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
  console.log(target);

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

  if (target.classList.contains('movie-poster')) {
    // movie-details
    //opacity 1;
    const movieDetails = target.nextElementSibling;
    console.log(movieDetails);
    movieDetails.style.opacity = 1;
    movieDetails.style.display = 'flex';
    // opacity 0.1

    // open movie content when clicking movie poster
    // const movieId = target.dataset.movieId;
    // console.log('MovieId: ', movieId);
    // const section = e.target.parentElement;
    // const content = section.nextElementSibling;
    // content.classList.add('content-display');

    // // fetch movie videos
    // const path = `/movie/${movieId}/videos`;
    // const videosUrl = generateUrl(path);

    // fetch(videosUrl)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     createVideoTemplate(data, content);
    //   })
    //   .catch((err) => {
    //     console.log('Error', err);
    //   });
  }

  // close movie content
  if (target.id === 'contentClose') {
    const content = target.parentElement;
    content.classList.remove('content-display');
  }
};

// <td> under the mouse right now (if any)
let currentElem = null;

document.onmouseover = function (e) {
  // before entering a new element, the mouse always leaves the previous one
  // if currentElem is set, we didn't leave the previous <td>,
  // that's a mouseover inside it, ignore the event
  if (currentElem) return;

  let target = e.target.closest('movies');

  // we moved not into a <td> - ignore
  if (!target) return;

  // moved into <td>, but outside of our table (possible in case of nested tables)
  // ignore
  if (!document.contains(target)) return;

  // hooray! we entered a new <td>
  currentElem = target;
  onEnter(currentElem);
};

document.onmouseout = function (e) {
  // if we're outside of any <td> now, then ignore the event
  // that's probably a move inside the table, but out of <td>,
  // e.g. from <tr> to another <tr>
  if (!currentElem) return;

  // we're leaving the element – where to? Maybe to a descendant?
  let relatedTarget = e.relatedTarget;

  while (relatedTarget) {
    // go up the parent chain and check – if we're still inside currentElem
    // then that's an internal transition – ignore it
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // we left the <td>. really.
  onLeave(currentElem);
  currentElem = null;
};

// any functions to handle entering/leaving an element
function onEnter(elem) {
  console.log('entered', elem);

  elem.style.opacity = 0.1;
}

function onLeave(elem) {
  console.log(elem);
  elem.style.opacity = 1;
}

// Toggle Search Bar on/off
searchButton.onclick = (e) => {
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
}

function showSearchBar() {
  searchMovieFormElement.classList.add('show-form');
  movieSearchInputElement.classList.add('expand-input');
  searchMovieFormElement.classList.remove('search-movie-form');
  movieSearchInputElement.classList.remove('search-input');
}

searchMovie('Spiderman');
getUpcomingMovie();
getTrendingMoviesToday();
getTrendingMoviesWeek();
getTopRatedMovies();
getPopularMovies();

// Title
// Overview
// Year
// Popularity
// adults (18+) else All
