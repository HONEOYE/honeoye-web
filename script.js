const canvasNoise = document.getElementById('noise');
const ctxNoise = canvasNoise.getContext('2d');
canvasNoise.width = window.innerWidth;
canvasNoise.height = window.innerHeight;

const canvasMatrix = document.getElementById('matrix-rain');
const ctxMatrix = canvasMatrix.getContext('2d');
canvasMatrix.width = window.innerWidth;
canvasMatrix.height = window.innerHeight;

const nickname = document.getElementById('nickname');
const video = document.getElementById('background-video');
const visitCount = document.getElementById('visit-count');
const quoteText = document.getElementById('quote-text');
const secretMessage = document.getElementById('secret-message');
const overloadMessage = document.getElementById('overload-message');
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const loadingScreen = document.getElementById('loading-screen');
const playPauseBtn = document.getElementById('play-pause');
const prevTrackBtn = document.getElementById('prev-track');
const nextTrackBtn = document.getElementById('next-track');
const currentTrack = document.getElementById('current-track');
let rect = nickname.getBoundingClientRect();

// Экран загрузки
function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
}

let isVideoLoaded = false;

// Проверяем загрузку видео
video.addEventListener('loadeddata', () => {
    console.log('Видео успешно загружено.');
    isVideoLoaded = true;
    if (document.readyState === 'complete') {
        hideLoadingScreen();
    }
});

// Проверяем полную загрузку страницы
window.addEventListener('load', () => {
    console.log('Страница полностью загружена.');
    if (isVideoLoaded) {
        hideLoadingScreen();
    } else {
        // Резервный таймер на 3 секунды
        setTimeout(hideLoadingScreen, 3000);
    }
});

// Цифровой дождь (Matrix Rain)
const matrixChars = "❤1337HONEOYE!@#";
const fontSize = 14;
const columns = canvasMatrix.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrixRain() {
    ctxMatrix.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctxMatrix.fillRect(0, 0, canvasMatrix.width, canvasMatrix.height);
    ctxMatrix.fillStyle = "#0f0";
    ctxMatrix.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctxMatrix.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvasMatrix.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    requestAnimationFrame(drawMatrixRain);
}

drawMatrixRain();

// Счётчик посещений
let visits = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
visits++;
localStorage.setItem('visitCount', visits);
visitCount.textContent = visits;

// Случайные цитаты
const quotes = [
    "The Wired is alive...",
    "I am the ruler of this world...",
    "Reality is just a layer of code...",
    "Connect to the other side...",
    "Data flows through me..."
];
let currentQuoteIndex = 0;

function updateQuote() {
    quoteText.textContent = quotes[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    setTimeout(updateQuote, 10000);
}
updateQuote();

// Шум
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

// Глитч текста
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

// Глитч видео
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
        }, 3000);
    }
});

// Эффект перегрузки при частых кликах
let clickCount = 0;
let lastClickTime = 0;

document.addEventListener('click', () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 2000) {
        clickCount++;
    } else {
        clickCount = 1;
    }
    lastClickTime = currentTime;

    if (clickCount > 5) {
        overloadMessage.textContent = 'System Overload!';
        overloadMessage.style.display = 'block';
        document.body.style.animation = 'overload 0.5s infinite';
        setTimeout(() => {
            overloadMessage.style.display = 'none';
            document.body.style.animation = 'none';
            clickCount = 0;
        }, 5000);
    }
});

// Анимация перегрузки
const style = document.createElement('style');
style.innerHTML = `
    @keyframes overload {
        0% { filter: brightness(1); }
        50% { filter: brightness(1.5); }
        100% { filter: brightness(1); }
    }
`;
document.head.appendChild(style);

// Случайные артефакты
function createGlitchArtifact() {
    const artifact = document.createElement('div');
    artifact.classList.add('glitch-artifact');
    const width = Math.random() * 50 + 20;
    const height = Math.random() * 10 + 5;
    artifact.style.width = `${width}px`;
    artifact.style.height = `${height}px`;
    artifact.style.left = `${Math.random() * window.innerWidth}px`;
    artifact.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(artifact);
    setTimeout(() => {
        artifact.remove();
    }, 1000);
}

setInterval(createGlitchArtifact, 5000);

// Терминал
function addToTerminal(message) {
    const line = document.createElement('div');
    line.textContent = message;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

addToTerminal("Welcome to the Wired Terminal");
addToTerminal("Type 'help' for commands");

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        addToTerminal(`> ${command}`);
        switch (command) {
            case 'help':
                addToTerminal("Commands: whoami, wired, clear");
                break;
            case 'whoami':
                addToTerminal("HONEOYE");
                break;
            case 'wired':
                addToTerminal("The Wired is watching you...");
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                break;
            default:
                addToTerminal("Unknown command. Type 'help' for commands.");
        }
        terminalInput.value = '';
    }
});

// Музыкальный плеер
const tracks = [
    { url: "https://drive.google.com/uc?export=download&id=1Y9qzwlbip3UTgNysyRr7qCBXpAGdyFf1", name: "mindvacy - outer heaven.mp3" },
    { url: "track2.mp3", name: "Sewerslvt - her.mp3" },
    { url: "https://example.com/track3.mp3", name: "Wired Echo" }
    // Замени на свои ссылки (например, https://drive.google.com/uc?export=download&id=ИД_ФАЙЛА)
];

let currentTrackIndex = 0;
let audio = new Audio();

function loadTrack(index) {
    currentTrackIndex = (index + tracks.length) % tracks.length;
    audio.src = tracks[currentTrackIndex].url;
    currentTrack.textContent = tracks[currentTrackIndex].name;
    audio.play().catch(() => {
        playPauseBtn.textContent = "▶ (Tap to start)";
        playPauseBtn.onclick = () => audio.play();
    });
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "❚❚";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }
}

function prevTrack() {
    loadTrack(currentTrackIndex - 1);
    playPause();
}

function nextTrack() {
    loadTrack(currentTrackIndex + 1);
    playPause();
}

playPauseBtn.addEventListener('click', playPause);
prevTrackBtn.addEventListener('click', prevTrack);
nextTrackBtn.addEventListener('click', nextTrack);

window.addEventListener('load', () => {
    loadTrack(Math.floor(Math.random() * tracks.length));
});

video.addEventListener('error', () => {
    console.error('Не удалось загрузить видео. Используется резервный фон.');
    const fallback = document.querySelector('.fallback-bg');
    fallback.style.opacity = 1;
    hideLoadingScreen(); // Скрываем экран при ошибке видео
});

window.addEventListener('resize', () => {
    canvasNoise.width = window.innerWidth;
    canvasNoise.height = window.innerHeight;
    canvasMatrix.width = window.innerWidth;
    canvasMatrix.height = window.innerHeight;
    rect = nickname.getBoundingClientRect();
});
