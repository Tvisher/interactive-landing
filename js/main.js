const bodyEl = document.querySelector('body');
const secondSection = document.querySelector('.second-section');
let scrollDisabled = false;

function disableScroll() {
    scrollDisabled = true;
    window.addEventListener('scroll', preventScroll, { passive: false });
}

function enableScroll() {
    scrollDisabled = false;
    window.removeEventListener('scroll', preventScroll, { passive: false });
}

function preventScroll(e) {
    if (scrollDisabled) {
        e.preventDefault(); // Блокирует стандартное поведение прокрутки
        e.stopPropagation();
        return false;
    }
}

// Пример с прокруткой
function smoothScroll(target, duration) {
    disableScroll(); // Отключить прокрутку
    const startPosition = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            bodyEl.classList.add('full-complite');

            enableScroll(); // Включить прокрутку после завершения
        }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}


window.addEventListener('load', (e) => {
    window.scrollTo({ top: 0 })
    bodyEl.classList.add('loaded');
    setTimeout(() => {
        bodyEl.classList.add('ready');
    }, 3000)
})

window.addEventListener('scroll', function () {
    bodyEl.classList.add('scrolled');

    setTimeout(() => {
        bodyEl.classList.add('ready-next');
        smoothScroll(secondSection, 2000);
    }, 2500)
}, { once: true });


const swiper = new Swiper(".mySwiper", {
    spaceBetween: 20,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesProgress: true,
});
const swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    thumbs: {
        swiper: swiper,
    },
});