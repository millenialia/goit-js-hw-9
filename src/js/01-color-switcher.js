const startButton = document.querySelector('button[data-start]')
const stopButton = document.querySelector('button[data-stop]')
const body = document.querySelector('body')

let colorChanger = null

startButton.addEventListener('click', onClickStartButton)
stopButton.addEventListener('click', onClickStopButton)

stopButton.disabled = true

function onClickStartButton(event) {
  startButton.disabled = true
  stopButton.disabled = false
  colorChanger = setInterval(() =>{
    body.style.backgroundColor = getRandomHexColor()}, 1000
    )
}

function onClickStopButton(event) {
    startButton.disabled = false
    stopButton.disabled = true
    clearInterval(colorChanger)
  }

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
