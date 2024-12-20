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
let animDo = false;
window.addEventListener('scroll', function () {
    if (!bodyEl.classList.contains('ready') || animDo) return;
    animDo = true
    bodyEl.classList.add('scrolled');
    setTimeout(() => {
        bodyEl.classList.add('ready-next');
        smoothScroll(secondSection, 2000);
    }, 2500)
});


const swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        576: {
            spaceBetween: 20,
            slidesPerView: 6,
        }
    }
});
const swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    thumbs: {
        swiper: swiper,
    },
});

const ckeckRatio = () => {
    const ratioDesctop = window.innerWidth > window.innerHeight;
    if (ratioDesctop) {
        bodyEl.classList.add('desctop');
        bodyEl.classList.remove('mobile');
    } else {
        bodyEl.classList.add('mobile');
        bodyEl.classList.remove('desctop');
    }
}
ckeckRatio();
window.addEventListener('resize', ckeckRatio);


document.querySelector('#totopbtn').addEventListener('click', (e) => {
    smoothScroll(bodyEl, 2000)
})
