import '../../scss/signup.scss';

// Modal
const allA = document.querySelectorAll('a');
const allS = document.querySelectorAll('span');

allA.forEach(function(e) {

    if(e.getAttribute('data-type') === 'modalopener') {
        e.addEventListener('click', function() {
            let target = e.getAttribute('data-target');
            const t = document.querySelector(target);
            if(!t.classList.contains('modalopen')) {
                t.classList.add('modalopen');
            }
        });
    }

    if(e.getAttribute('data-type') === 'modalcloser') {
        e.addEventListener('click', function() {
            let target = e.getAttribute('data-target');
            const t = document.querySelector(target);
            if(t.classList.contains('modalopen')) {
                t.classList.remove('modalopen');
            }
        });
    }

    if(e.getAttribute('data-type') === 'modalswitcher') {
        e.addEventListener('click', function() {
            let presenttarget = e.getAttribute('data-present');
            let target = e.getAttribute('data-target');

            const pt = document.querySelector(presenttarget);
            const t = document.querySelector(target);

            if(pt.classList.contains('modalopen')) {
                pt.classList.remove('modalopen');
            }
            if(!t.classList.contains('modalopen')) {
                t.classList.add('modalopen');
            }
        });
    }
});

allS.forEach(function(e) {
    if(e.getAttribute('data-type') === 'modalcloser') {
        e.addEventListener('click', function() {
            let target = e.getAttribute('data-target');
            const t = document.querySelector(target)
            if(t.classList.contains('modalopen')) {
                t.classList.remove('modalopen');
            }
        });
    }
});

/********/