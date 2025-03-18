// Частицы
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Шум
const noiseCanvas = document.getElementById('noise');
const noiseCtx = noiseCanvas.getContext('2d');

const nickname = document.getElementById('nickname');
let rect = nickname.getBoundingClientRect();
noiseCanvas.width = rect.width;
noiseCanvas.height = rect.height;

const particlesArray = [];

class Particle {
    constructor() {
        this.x = rect.left + rect.width / 2;
        this.y = rect.top + rect.height / 2;
        this.size = Math.random() * 4 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 5 + 2;
        this.life = 100;
    }
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life--;
    }
    draw() {
        const theme = document.body.getAttribute('data-theme');
        ctx.fillStyle = theme === 'cyan' ? `rgba(0, 255, 255, ${this.life / 100})` : `rgba(255, 0, 255, ${this.life / 100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particlesArray.length - 1; i >= 0; i--) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].life <= 0) {
            particlesArray.splice(i, 1);
        }
    }
    // Постоянно добавляем новые частицы
    for (let i = 0; i < 2; i++) {
        particlesArray.push(new Particle());
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Эффект шума
function generateNoise() {
    const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 255;   // A
    }
    noiseCtx.putImageData(imageData, 0, 0);
}

function animateNoise() {
    generateNoise();
    requestAnimationFrame(animateNoise);
}

animateNoise();

// Параллакс-эффект
document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (e.clientX - centerX) / 50;
    const moveY = (e.clientY - centerY) / 50;
    nickname.style.transform = `translate(${moveX}px, ${moveY}px)`;
    particlesArray.forEach(particle => {
        particle.x += moveX * 0.1;
        particle.y += moveY * 0.1;
    });
});

// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'cyan' ? 'purple' : 'cyan');
});

// Обновление размеров при изменении окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rect = nickname.getBoundingClientRect();
    noiseCanvas.width = rect.width;
    noiseCanvas.height = rect.height;
});
