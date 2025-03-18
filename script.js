const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const nickname = document.getElementById('nickname');
let rect = nickname.getBoundingClientRect();

class Particle {
    constructor() {
        this.x = rect.left + Math.random() * rect.width;
        this.y = rect.top + Math.random() * rect.height;
        this.size = Math.random() * 6 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.life = 150;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }
    draw() {
        const theme = document.body.getAttribute('data-theme');
        ctx.fillStyle = theme === 'cyan' ? `rgba(0, 255, 255, ${this.life / 150})` : `rgba(255, 0, 255, ${this.life / 150})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
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
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

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
});
