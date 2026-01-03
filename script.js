const slider = document.getElementById("logoSlider");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.style.animationPlayState = "paused";
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.style.animationPlayState = "running";
});

slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.animationPlayState = "running";
});

slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
});

/* TOUCH */
slider.addEventListener("touchstart", () => {
    slider.style.animationPlayState = "paused";
});

slider.addEventListener("touchend", () => {
    slider.style.animationPlayState = "running";
});

// 
let currentSlide = 0;
const container = document.getElementById('cardsContainer');
const cards = document.querySelectorAll('.feature-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateButtons() {
    const maxSlide = cards.length - getVisibleCards();

    if (currentSlide <= 0) {
        prevBtn.classList.remove('active');
        currentSlide = 0;
    } else {
        prevBtn.classList.add('active');
    }

    if (currentSlide >= maxSlide) {
        nextBtn.classList.remove('active');
        currentSlide = maxSlide;
    } else {
        nextBtn.classList.add('active');
    }
}

function getVisibleCards() {
    const width = window.innerWidth;
    if (width > 1400) return 4;
    if (width > 1024) return 3;
    if (width > 768) return 2;
    return 1;
}

function slideCards(direction) {
    const cardWidth = cards[0].offsetWidth + 25; // card width + gap
    const maxSlide = cards.length - getVisibleCards();

    currentSlide += direction;

    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide > maxSlide) currentSlide = maxSlide;

    container.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    updateButtons();
}

// Initialize button states
updateButtons();

// Reset on window resize
window.addEventListener('resize', () => {
    currentSlide = 0;
    container.style.transform = 'translateX(0)';
    updateButtons();
});