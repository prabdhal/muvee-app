const searchButton = document.querySelector('#searchButton');
const searchMovieFormElement = document.querySelector('form');

searchButton.onclick = (e) => {
  console.log(searchMovieFormElement);
  searchMovieFormElement.classList.add('show-form');
  movieSearchInputElement.classList.add('expand-input');
  searchMovieFormElement.classList.remove('search-movie-form');
  movieSearchInputElement.classList.remove('search-input');
};

document.onclick = function (e) {
  const target = e.target;
  console.log(target);

  // close search input field
  if (
    target.classList.contains('search-and-account-container') ||
    target.classList.contains('fa-search') ||
    target.classList.contains('fas') ||
    target.classList.contains('expand-input') ||
    target.classList.contains('show-form')
  ) {
    showSearchBar();
  } else {
    hideSearchBar();
  }
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
