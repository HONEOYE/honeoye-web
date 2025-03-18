const canvasNoise = document.getElementById('noise');
const ctxNoise = canvasNoise.getContext('2d');
canvasNoise.width = window.innerWidth;
canvasNoise.height = window.innerHeight;

const nickname = document.getElementById('nickname');
const video = document.getElementById('background-video');
const visitCount = document.getElementById('visit-count');
const quoteText = document.getElementById('quote-text');
const secretMessage = document.createElement('div');
secretMessage.id = 'secret-message';
document.body.appendChild(secretMessage);

let rect = nickname.getBoundingClientRect();

// Инициализация счётчика посещений
let visits = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
visits++;
localStorage.setItem('visitCount', visits);
visitCount.textContent = visits;

// Список цитат в стиле Лейн
const quotes = [
    "The Wired is alive...",
    "I am the ruler of this world...",
    "Reality is just a layer of code...",
    "Connect to the other side...",
    "Data flows through me..."
];
let currentQuoteIndex = 0;

// Функция для смены цитат
function updateQuote() {
    quoteText.textContent = quotes[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    setTimeout(updateQuote, 10000); // Смена каждые 10 секунд
}
updateQuote();

// Оптимизация шума для мобильных
function drawNoise() {
    console.log("Drawing noise...");
    const particleCount = window.innerWidth < 768 ? 500 : 2000;
    ctxNoise.fillStyle = `rgba(0, 0, 0, 0.9)`;
    ctxNoise.fillRect(0, 0, canvasNoise.width, canvasNoise.height);
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvasNoise.width;
        const y = Math.random() * canvasNoise.height;
        ctxNoise.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.05)`;
        ctxNoise.fillRect(x, y, 1, 1);
    }
    requestAnimationFrame(drawNoise);
}

drawNoise();

function glitchText() {
    console.log("Glitching text...");
    if (Math.random() < 0.05) {
        const offset = Math.random() * 10 - 5;
        nickname.style.transform = `translate(${offset}px, ${Math.random() * 5 - 2.5}px)`;
        nickname.style.textShadow = `0 0 10px #0ff, ${offset}px 0 10px #f0f, ${-offset}px 0 10px #fff`;
    } else {
        nickname.style.transform = 'translate(0, 0)';
        nickname.style.textShadow = '0 0 10px #0ff, 0 0 20px #0ff';
    }
    setTimeout(glitchText, 100);
}

glitchText();

function glitchVideo() {
    console.log("Glitching video...");
    if (Math.random() < 0.1) {
        const offset = Math.random() * 10 - 5;
        video.style.transform = `translate(${offset}px, ${Math.random() * 5 - 2.5}px)`;
    } else {
        video.style.transform = 'translate(0, 0)';
    }
    setTimeout(glitchVideo, 200);
}

glitchVideo();

// Пасхальное яйцо
nickname.addEventListener('click', (e) => {
    if (e.target.textContent === 'E') {
        secretMessage.textContent = 'Welcome to the Wired';
        secretMessage.style.display = 'block';
        setTimeout(() => {
            secretMessage.style.display = 'none';
        }, 3000); // Скрыть через 3 секунды
    }
});

video.addEventListener('error', () => {
    console.error('Не удалось загрузить видео. Используется резервный фон.');
    const fallback = document.querySelector('.fallback-bg');
    fallback.style.opacity = 1;
});

video.addEventListener('loadeddata', () => {
    console.log('Видео успешно загружено.');
});

window.addEventListener('resize', () => {
    canvasNoise.width = window.innerWidth;
    canvasNoise.height = window.innerHeight;
    rect = nickname.getBoundingClientRect();
});
