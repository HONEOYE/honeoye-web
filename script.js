const canvasSmoke = document.getElementById('smoke');
const ctxSmoke = canvasSmoke.getContext('2d');
canvasSmoke.width = window.innerWidth;
canvasSmoke.height = window.innerHeight;

const canvasNoise = document.getElementById('noise');
const ctxNoise = canvasNoise.getContext('2d');
canvasNoise.width = window.innerWidth;
canvasNoise.height = window.innerHeight;

const nickname = document.getElementById('nickname');
const video = document.getElementById('background-video');
let rect = nickname.getBoundingClientRect();

// Эффект дыма
class SmokeParticle {
    constructor() {
        this.x = Math.random() * canvasSmoke.width;
        this.y = canvasSmoke.height + Math.random() * 50;
        this.size = Math.random() * 15 + 5;
        this.alpha = Math.random() * 0.3 + 0.1;
        this.speedY = -Math.random() * 0.8 - 0.3;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.glitch = false;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX + (this.glitch ? (Math.random() * 2 - 1) : 0);
        this.alpha -= 0.001;
        if (this.alpha <= 0 || this.y < -this.size) {
            this.x = Math.random() * canvasSmoke.width;
            this.y = canvasSmoke.height + Math.random() * 50;
            this.alpha = Math.random() * 0.3 + 0.1;
            this.glitch = false;
        }
        if (Math.random() < 0.02) {
            this.glitch = true;
        }
    }
    draw() {
        ctxSmoke.fillStyle = `rgba(200, 200, 200, ${this.alpha})`;
        ctxSmoke.beginPath();
        ctxSmoke.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxSmoke.fill();
        if (this.glitch) {
            ctxSmoke.fillStyle = `rgba(0, 255, 255, ${this.alpha * 0.5})`;
            ctxSmoke.fillRect(this.x - 5, this.y, 10, 2);
        }
    }
}

const smokeArray = [];
function initSmoke() {
    for (let i = 0; i < 100; i++) {
        smokeArray.push(new SmokeParticle());
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
    ctxNoise.clearRect(0, 0, canvasNoise.width, canvasNoise.height);
    for (let i = 0; i < 2000; i++) {
        const x = Math.random() * canvasNoise.width;
        const y = Math.random() * canvasNoise.height;
        ctxNoise.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.05)`;
        ctxNoise.fillRect(x, y, 1, 1);
    }
    requestAnimationFrame(drawNoise);
}

drawNoise();

// Глитч текста
function glitchText() {
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

// Глитч видео
function glitchVideo() {
    if (Math.random() < 0.1) {
        const offset = Math.random() * 10 - 5;
        video.style.transform = `translate(${offset}px, ${Math.random() * 5 - 2.5}px)`;
    } else {
        video.style.transform = 'translate(0, 0)';
    }
    setTimeout(glitchVideo, 200);
}

glitchVideo();

// Проверка загрузки видео
video.addEventListener('error', () => {
    console.error('Не удалось загрузить видео. Используется резервный фон.');
    const fallback = document.querySelector('.fallback-bg');
    fallback.style.opacity = 1;
});

video.addEventListener('loadeddata', () => {
    console.log('Видео успешно загружено.');
});

// Обновление размеров при изменении окна
window.addEventListener('resize', () => {
    canvasSmoke.width = window.innerWidth;
    canvasSmoke.height = window.innerHeight;
    canvasNoise.width = window.innerWidth;
    canvasNoise.height = window.innerHeight;
    rect = nickname.getBoundingClientRect();
});
