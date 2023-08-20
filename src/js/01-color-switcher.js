const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);

let timerId = null;

function onStart(){
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
  timerId = setInterval(() => {
    body.style.backgroundColor =  getRandomHexColor();
  }, 1000)
};

function onStop(){
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
  clearInterval(timerId);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
