const nickname = document.querySelector('.nickname');
nickname.addEventListener('click', () => {
    const spans = nickname.querySelectorAll('span');
    spans.forEach(span => {
        span.style.animation = 'explode 0.5s ease-in-out';
        setTimeout(() => {
            span.style.animation = 'flashIn 0.5s forwards';
        }, 500);
    });
});

// Добавляем CSS-анимацию через JS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes explode {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);
