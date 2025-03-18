const canvasNoise = document.getElementById('noise');
const ctxNoise = canvasNoise.getContext('2d');
canvasNoise.width = window.innerWidth;
canvasNoise.height = window.innerHeight;

const nickname = document.getElementById('nickname');
const video = document.getElementById('background-video');
let rect = nickname.getBoundingClientRect();

// Оптимизация шума для мобильных
function drawNoise() {
    console.log("Drawing noise...");
    // Уменьшаем количество частиц на мобильных устройствах
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
