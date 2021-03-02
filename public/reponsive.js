const navDropDown = document.querySelector('nav-drop-down');
const dropDownLink = document.querySelector('#dropDownLink');
const dropDown = document.querySelector('#dropDown');
const menuBtn = document.querySelector('.menu-btn');
const menuBg = document.querySelector('.menu-bg');
const menuLines = document.querySelectorAll('.menu-line');
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

menuBtn.addEventListener('click', toggleMenuBg);

function toggleMenuBg() {
  if (menuBg.classList.contains('open-menu')) {
    menuBg.classList.remove('open-menu');
    menuLines.forEach((line) => {
      line.classList.remove('dark-color');
    });
  } else {
    menuBg.classList.add('open-menu');
    menuLines.forEach((line) => {
      line.classList.add('dark-color');
    });
  }
}
