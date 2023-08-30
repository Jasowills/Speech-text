const startButton = document.getElementById('startButton');
const transcriptElement = document.getElementById('transcript');
let isListening = false;

const recognition = new window.webkitSpeechRecognition(); // Using WebKit API for Chrome
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = (event) => {
  const lastResultIndex = event.results.length - 1;
  const transcript = event.results[lastResultIndex][0].transcript.trim().toLowerCase();

  transcriptElement.textContent = transcript;

  if (transcript === 'stop listening') {
    recognition.stop();
    return;
  }

  if (isColor(transcript)) {
    document.body.style.backgroundColor = transcript;
  }
};

function isColor(text) {
  const validColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown' ,'black', 'gold', 'dark blue'];
  return validColors.includes(text);
}

recognition.onend = () => {
  isListening = false;
  startButton.textContent = 'Start Listening';
};

startButton.addEventListener('click', () => {
  if (!isListening) {
    isListening = true;
    startButton.textContent = 'Stop Listening';
    recognition.start();
  } else {
    recognition.stop();
  }
});

