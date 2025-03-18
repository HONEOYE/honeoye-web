const canvasSmoke = document.getElementById('smoke');
const ctxSmoke = canvasSmoke.getContext('2d');
canvasSmoke.width = window.innerWidth;
canvasSmoke.height = window.innerHeight;

const canvasNoise = document.getElementById('noise');
const ctxNoise = canvasNoise.getContext('2d');
canvasNoise.width = window.innerWidth;
canvasNoise.height = window.innerHeight;

const nickname = document.getElementById('nickname');
let rect = nickname.getBoundingClientRect();

class Smoke {
    constructor() {
        this.x = Math.random() * canvasSmoke.width;
        this.y = canvasSmoke.height + Math.random() * 50;
        this.size = Math.random() * 20 + 10;
        this.alpha = 0.1;
        this.speedY = -Math.random() * 0.5 - 0.2;
        this.speedX = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.alpha -= 0.002;
        if (this.alpha <= 0 || this.y < -this.size) {
            this.x = Math.random() * canvasSmoke.width;
            this.y = canvasSmoke.height + Math.random() * 50;
            this.alpha = 0.1;
        }
    }
    draw() {
        ctxSmoke.fillStyle = `rgba(100, 100, 100, ${this.alpha})`;
        ctxSmoke.beginPath();
        ctxSmoke.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxSmoke.fill();
    }
}

const smokeArray = [];
function initSmoke() {
    for (let i = 0; i < 50; i++) {
        smokeArray.push(new Smoke());
    }
}

function animateSmoke() {
    ctxSmoke.clearRect(0, 0, canvasSmoke.width, canvasSmoke.height);
    for (let i = 0; i < smokeArray.length; i++) {
        smokeArray[i].update();
        smokeArray[i].draw();
    }
    requestAnimationFrame(animateSmoke);
}

initSmoke();
animateSmoke();

// Динамичный шум
function drawNoise() {
    ctxNoise.fillStyle = `rgb(${Math.random() * 50 + 205}, ${Math.random() * 50 + 205}, ${Math.random() * 50 + 205})`;
    ctxNoise.fillRect(0, 0, canvasNoise.width, canvasNoise.height);
    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvasNoise.width;
        const y = Math.random() * canvasNoise.height;
        ctxNoise.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.05)`;
        ctxNoise.fillRect(x, y, 1, 1);
    }
    requestAnimationFrame(drawNoise);
}

drawNoise();

// Случайный глитч букв
function glitchLetters() {
    const spans = nickname.querySelectorAll('span');
    if (Math.random() < 0.05) { // Глюк каждые 5% кадров
        spans.forEach(span => {
            span.style.animation = 'randomGlitch 0.3s';
            setTimeout(() => {
                span.style.animation = '';
            }, 300);
        });
    }
    requestAnimationFrame(glitchLetters);
}

glitchLetters();

// Параллакс-эффект
document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (e.clientX - centerX) / 50;
    const moveY = (e.clientY - centerY) / 50;
    nickname.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Проверка загрузки видео
const video = document.getElementById('background-video');
video.addEventListener('error', () => {
    console.error('Не удалось загрузить видео. Используется резервный фон.');
    const fallback = document.querySelector('.fallback-bg');
    fallback.style.opacity = 1;
});

// Обновление размеров при изменении окна
window.addEventListener('resize', () => {
    canvasSmoke.width = window.innerWidth;
    canvasSmoke.height = window.innerHeight;
    canvasNoise.width = window.innerWidth;
    canvasNoise.height = window.innerHeight;
    rect = nickname.getBoundingClientRect();
});
