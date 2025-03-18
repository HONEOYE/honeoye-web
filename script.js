const canvasParticles = document.getElementById('particles');
const ctxParticles = canvasParticles.getContext('2d');
canvasParticles.width = window.innerWidth;
canvasParticles.height = window.innerHeight;

const canvasNoise = document.getElementById('noise');
const ctxNoise = canvasNoise.getContext('2d');
canvasNoise.width = window.innerWidth;
canvasNoise.height = window.innerHeight;

const particlesArray = [];
const nickname = document.getElementById('nickname');
let rect = nickname.getBoundingClientRect();

class Particle {
    constructor() {
        this.x = canvasParticles.width / 2 + (Math.random() - 0.5) * 50; // Брызги из центра
        this.y = canvasParticles.height / 2 + (Math.random() - 0.5) * 50;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 6 - 3; // Сильное случайное движение
        this.speedY = Math.random() * 6 - 3;
        this.life = 200;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.life <= 0 || this.x < 0 || this.x > canvasParticles.width || this.y < 0 || this.y > canvasParticles.height) {
            this.x = canvasParticles.width / 2 + (Math.random() - 0.5) * 50;
            this.y = canvasParticles.height / 2 + (Math.random() - 0.5) * 50;
            this.life = 200;
        }
    }
    draw() {
        ctxParticles.fillStyle = `rgba(0, 255, 255, ${this.life / 200})`;
        ctxParticles.beginPath();
        ctxParticles.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxParticles.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 50; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctxParticles.clearRect(0, 0, canvasParticles.width, canvasParticles.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Эффект цифрового шума
function drawNoise() {
    ctxNoise.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvasNoise.width;
        const y = Math.random() * canvasNoise.height;
        ctxNoise.fillRect(x, y, 1, 1);
    }
    requestAnimationFrame(drawNoise);
}

drawNoise();

// Периодический глюк букв
function glitchLetters() {
    const spans = nickname.querySelectorAll('span');
    if (Math.random() < 0.1) { // Глюк каждые 10% кадров
        spans.forEach(span => {
            span.style.animation = 'glitch 0.5s';
            setTimeout(() => {
                span.style.animation = '';
            }, 500);
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
    particlesArray.forEach(particle => {
        particle.x += moveX * 0.1;
        particle.y += moveY * 0.1;
    });
});

// Обновление размеров при изменении окна
window.addEventListener('resize', () => {
    canvasParticles.width = window.innerWidth;
    canvasParticles.height = window.innerHeight;
    canvasNoise.width = window.innerWidth;
    canvasNoise.height = window.innerHeight;
    rect = nickname.getBoundingClientRect();
});
