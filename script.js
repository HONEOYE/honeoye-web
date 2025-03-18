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
const signalHijack = document.getElementById('signal-hijack');
const notifications = document.getElementById('notifications');
let rect = nickname.getBoundingClientRect();

// Экран загрузки с эффектом "переключения каналов"
function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
}

let isVideoLoaded = false;

video.addEventListener('loadeddata', () => {
    console.log('Видео успешно загружено.');
    isVideoLoaded = true;
    if (document.readyState === 'complete') {
        setTimeout(hideLoadingScreen, 2000); // Задержка для эффекта "канала"
    }
});

window.addEventListener('load', () => {
    console.log('Страница полностью загружена.');
    if (isVideoLoaded) {
        setTimeout(hideLoadingScreen, 2000);
    } else {
        setTimeout(hideLoadingScreen, 5000);
    }
});

// Цифровой дождь (Matrix Rain)
const matrixChars = "❤1337HONEOYE!@#</3";
const fontSize = 14;
const columns = canvasMatrix.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrixRain() {
    ctxMatrix.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctxMatrix.fillRect(0, 0, canvasMatrix.width, canvasMatrix.height);
    ctxMatrix.fillStyle = "#0ff";
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

// Частицы при наведении на ник
nickname.addEventListener('mousemove', (e) => {
    const particle = document.createElement('span');
    particle.textContent = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    particle.style.position = 'absolute';
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    particle.style.color = '#0ff';
    particle.style.fontSize = '14px';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'particle-rise 1s forwards';
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
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
        document.body.style.animation = 'overload 0.5s infinite';
        overloadMessage.textContent = 'System Overload!';
        overloadMessage.style.display = 'block';
        overloadMessage.style.animation = 'alarm 1s infinite';

        setTimeout(() => {
            document.body.style.animation = 'none';
            overloadMessage.style.display = 'none';
            overloadMessage.style.animation = 'none';
            clickCount = 0;
        }, 5000);
    }
});

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

// Уведомления
const notificationMessages = [
    "Connection unstable...",
    "Firewall breached!",
    "Intrusion detected!",
    "Data stream corrupted...",
    "System integrity at 75%"
];

function showNotification() {
    const message = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    notifications.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

setInterval(showNotification, Math.random() * 10000 + 10000);

// Терминал и мини-игра "взлома"
let gameActive = false;
let secretCode = Math.floor(Math.random() * 1000); // Код от 0 до 999

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

        if (gameActive) {
            const guess = parseInt(command);
            if (isNaN(guess)) {
                addToTerminal("Enter a number to guess the code!");
            } else if (guess === secretCode) {
                addToTerminal("Access granted! Website hacked!");
                gameActive = false;
                secretCode = Math.floor(Math.random() * 1000); // Новый код
            } else if (guess < secretCode) {
                addToTerminal("Too low. Try again.");
            } else {
                addToTerminal("Too high. Try again.");
            }
        } else {
            switch (command) {
                case 'help':
                    addToTerminal("Commands: whoami, wired, clear, cheat");
                    break;
                case 'whoami':
                    addToTerminal("HONEOYE");
                    break;
                case 'wired':
                    addToTerminal("The Wired is watching you...");
                    signalHijack.style.display = 'block';
                    setTimeout(() => {
                        signalHijack.style.display = 'none';
                    }, 3000);
                    break;
                case 'clear':
                    terminalOutput.innerHTML = '';
                    break;
                case 'hack':
                    addToTerminal("Starting hacking website... Guess the 3-digit code (0-999).");
                    gameActive = true;
                    break;
                case 'cheat':
                    addToTerminal("Only the Wired knows... just skill.");
                    break;
                default:
                    addToTerminal("Unknown command. Type 'help' for commands.");
            }
        }
        terminalInput.value = '';
    }
});

// Музыкальный плеер
const tracks = [
    { url: "/track2.mp3", name: "Sewerslvt - her.mp3" },
];

let currentTrackIndex = 0;
let audio = new Audio();

function loadTrack(index) {
    currentTrackIndex = (index + tracks.length) % tracks.length;
    audio.src = tracks[currentTrackIndex].url;
    currentTrack.textContent = tracks[currentTrackIndex].name;
    audio.load();
    playPause();
}

function playPause() {
    if (audio.paused) {
        audio.play().then(() => {
            playPauseBtn.textContent = "❚❚";
        }).catch((error) => {
            console.error("Ошибка воспроизведения:", error);
            playPauseBtn.textContent = "▶ (Tap to start)";
            playPauseBtn.onclick = () => audio.play().then(() => {
                playPauseBtn.textContent = "❚❚";
                playPauseBtn.onclick = playPause;
            }).catch(err => console.error(err));
        });
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }
}

function prevTrack() {
    loadTrack(currentTrackIndex - 1);
}

function nextTrack() {
    loadTrack(currentTrackIndex + 1);
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
    hideLoadingScreen();
});

window.addEventListener('resize', () => {
    canvasNoise.width = window.innerWidth;
    canvasNoise.height = window.innerHeight;
    canvasMatrix.width = window.innerWidth;
    canvasMatrix.height = window.innerHeight;
    rect = nickname.getBoundingClientRect();
});
