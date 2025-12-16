let recognition;
let listening = false;

const talkBtn = document.getElementById("talkBtn");
const statusEl = document.getElementById("status");
const userTextEl = document.getElementById("userText");
const botTextEl = document.getElementById("botText");

const synth = window.speechSynthesis;

function speak(text) {
  synth.cancel();
  botTextEl.textContent = text;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-IN";
  utter.rate = 1;
  synth.speak(utter);
}

talkBtn.addEventListener("click", () => {
  if (!listening) startAssistant();
});

function startAssistant() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";
  recognition.continuous = true;

  recognition.onstart = () => {
    listening = true;
    statusEl.textContent = "Status: Listening...";
    speak("Hello. I am ready. Ask me something.");
  };

  recognition.onresult = (event) => {
    const text =
      event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();

    userTextEl.textContent = text;
    handleCommand(text);
  };

  recognition.onerror = () => {
    recognition.start();
  };

  recognition.onend = () => {
    if (listening) recognition.start();
  };

  recognition.start();
}

function handleCommand(text) {

  if (text.includes("hello") || text.includes("hi")) {
    reply([
      "Hello, how can I help you?",
      "Hi, I am listening",
      "Hello there"
    ]);
    return;
  }

  if (text.includes("your name")) {
    speak("My name is Mini Alexa");
    return;
  }

  if (text.includes("time")) {
    speak("Current time is " + new Date().toLocaleTimeString());
    return;
  }

  if (text.includes("date")) {
    speak("Today's date is " + new Date().toDateString());
    return;
  }

  if (text.includes("who made you")) {
    speak("I was created by Raghav using JavaScript");
    return;
  }

  if (text.includes("kannada")) {
    speak("ನಾನು ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಮಾತನಾಡುತ್ತೇನೆ");
    return;
  }

  if (text.includes("plus") || text.includes("minus")) {
    try {
      const exp = text
        .replace("plus", "+")
        .replace("minus", "-")
        .replace("into", "*")
        .replace("divide", "/");

      const result = eval(exp.match(/[0-9+\-*/ ]+/)[0]);
      speak("The answer is " + result);
    } catch {
      speak("Sorry, I cannot calculate that");
    }
    return;
  }

  reply([
    "I am still learning. Ask something else.",
    "That question is beyond my current knowledge.",
    "Interesting question, but I am not trained for it yet."
  ]);
}

function reply(list) {
  speak(list[Math.floor(Math.random() * list.length)]);
}
