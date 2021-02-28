// Initial values
const API_KEY = 'e9cfe9826bad68eb6a0627b7c25f8b4c';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

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

function getUpcomingMovie() {
  const path = '/movie/upcoming';
  const url = generateUrl(path);

  requestMovies(url, renderMovies, handleError);
}

function getTopRatedMovies() {
  const path = '/movie/top_rated';
  const url = generateUrl(path);

  requestMovies(url, renderMovies, handleError);
}

function getPopularMovies() {
  const path = '/movie/popular';
  const url = generateUrl(path);

  requestMovies(url, renderMovies, handleError);
}
