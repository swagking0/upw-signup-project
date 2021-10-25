// NavBar
const btnMenuHamburger = document.querySelector('#btnMenuHamburger');
const header = document.querySelector('.header');
const body = document.querySelector('body');
const fadeElems = document.querySelectorAll('.has-fade');

btnMenuHamburger.addEventListener('click', function(){

    if(!header.classList.contains('open')) {
        body.classList.add('noscroll');
        header.classList.add('open');
        fadeElems.forEach(function(element) {
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        });
    } else {
        body.classList.remove('noscroll');
        header.classList.remove('open');
        fadeElems.forEach(function(element) {
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
        });
    }
});

/********/