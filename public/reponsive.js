const navDropDown = document.querySelector('nav-drop-down');
const dropDownLink = document.querySelector('#dropDownLink');
const dropDown = document.querySelector('#dropDown');

// movie
const movieContainer = document.querySelectorAll('movie-container');

dropDownLink.onmouseover = showDropDown;
dropDown.onmouseover = showDropDown;
dropDownLink.onmouseout = hideDropDown;
dropDown.onmouseout = hideDropDown;

function showDropDown() {
  dropDown.classList.add('open');
}

function hideDropDown() {
  dropDown.classList.remove('open');
}

// movie-details
//opacity 1;

// opacity 0.1
