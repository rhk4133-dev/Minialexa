const talkBtn = document.getElementById("talkBtn");
const log = document.getElementById("log");
const audioPlayer = document.getElementById("audioPlayer");

// Replace with your guitar song mp3 URL
const songUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

let recognition;
let listening = false;

function initRecognition() {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Speech Recognition not supported in this browser.');
    return null;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recog = new SpeechRecognition();
  recog.lang = 'en-US';
  recog.interimResults = false;
  recog.continuous = false;

  recog.onresult = event => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    log.textContent = `You said: "${transcript}"`;
    if (transcript.includes('hello')) {
      playSong();
    } else {
      log.textContent = 'You did NOT say "hello". Try again.';
    }
  };

  recog.onerror = event => {
    log.textContent = 'Error: ' + event.error;
    listening = false;
    talkBtn.disabled = false;
    talkBtn.textContent = 'TALK';
  };

  recog.onend = () => {
    listening = false;
    talkBtn.disabled = false;
    talkBtn.textContent = 'TALK';
  };

  return recog;
}

function playSong() {
  audioPlayer.src = songUrl;
  audioPlayer.volume = 1.0;
  audioPlayer.style.display = 'block';
  audioPlayer.play();
  log.textContent = 'Playing your guitar song!';
}

talkBtn.addEventListener('click', () => {
  if (listening) return;

  if (!recognition) {
    recognition = initRecognition();
    if (!recognition) return;
  }

  recognition.start();
  listening = true;
  talkBtn.disabled = true;
  talkBtn.textContent = 'Listening...';
  log.textContent = 'Listening... say "hello"';
});