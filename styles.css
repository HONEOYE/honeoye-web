body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background: #000;
    font-family: 'Arial', sans-serif;
}

.video-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: rgba(0, 0, 0, 0.7);
    animation: glitchVideo 5s infinite;
}

.video-background video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@keyframes glitchVideo {
    0% { transform: translate(0); }
    20% { transform: translate(-5px, 5px); }
    40% { transform: translate(5px, -5px); }
    60% { transform: translate(-3px, 3px); }
    80% { transform: translate(3px, -3px); }
    100% { transform: translate(0); }
}

.content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.nickname {
    font-size: 4em;
    color: #fff;
    display: flex;
    text-transform: uppercase;
    transition: transform 0.1s ease;
}

.nickname span {
    opacity: 0;
    text-shadow: 0 0 15px #0ff, 0 0 25px #0ff;
    animation: glitch 2s ease-in-out forwards, reassemble 10s infinite 5s;
}

.nickname span:nth-child(1) { animation-delay: 0.2s, 5s; }
.nickname span:nth-child(2) { animation-delay: 0.4s, 5s; }
.nickname span:nth-child(3) { animation-delay: 0.6s, 5s; }
.nickname span:nth-child(4) { animation-delay: 0.8s, 5s; }
.nickname span:nth-child(5) { animation-delay: 1.0s, 5s; }
.nickname span:nth-child(6) { animation-delay: 1.2s, 5s; }
.nickname span:nth-child(7) { animation-delay: 1.4s, 5s; }

@keyframes glitch {
    0% { opacity: 0; transform: translateY(50px) skew(10deg); }
    20% { opacity: 1; transform: translateY(-10px) skew(-10deg); }
    22% { opacity: 0.5; transform: translateY(5px) skew(5deg); }
    24% { opacity: 1; transform: translateY(-5px) skew(-5deg); }
    100% { opacity: 1; transform: translateY(0) skew(0); text-shadow: 0 0 30px #0ff, 0 0 50px #0ff; }
}

@keyframes reassemble {
    0% { opacity: 1; transform: translateY(0) skew(0); }
    10% { opacity: 0; transform: translateY(-50px) skew(15deg); }
    15% { opacity: 0; transform: translateY(50px) skew(-15deg); }
    20% { opacity: 1; transform: translateY(0) skew(0); }
    100% { opacity: 1; transform: translateY(0) skew(0); }
}

body[data-theme="cyan"] .nickname span {
    text-shadow: 0 0 30px #0ff, 0 0 50px #0ff;
}

body[data-theme="purple"] .nickname span {
    text-shadow: 0 0 30px #f0f, 0 0 50px #f0f;
}

body[data-theme="cyan"] .steam-btn {
    background: linear-gradient(135deg, #1b263b, #415a77);
    box-shadow: 0 0 20px #415a77;
}

body[data-theme="purple"] .steam-btn {
    background: linear-gradient(135deg, #2b1b3b, #7741a7);
    box-shadow: 0 0 20px #7741a7;
}

.steam-btn-wrapper {
    position: relative;
    margin-top: 40px;
}

.steam-btn {
    padding: 15px 30px;
    font-size: 1.8em;
    color: #fff;
    border-radius: 50px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
}

.steam-btn:hover {
    transform: scale(1.1);
}

.steam-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
    z-index: -1;
}

.steam-btn:hover::before {
    width: 200px;
    height: 200px;
}

.steam-icon {
    fill: #fff;
}

.theme-toggle {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background: #333;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.theme-toggle:hover {
    background: #555;
}

#particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
