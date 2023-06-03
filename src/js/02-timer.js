import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('button[data-start]')
const daysEl = document.querySelector('span[data-days]')
const hoursEl = document.querySelector('span[data-hours]')
const minutesEl = document.querySelector('span[data-minutes]')
const secondsEl = document.querySelector('span[data-seconds]')
const inputEl = document.querySelector('#datetime-picker')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
    const currentTime = Date.now()
    const remainingTime = selectedTime - currentTime
    if (remainingTime < 0) {
      alert("Please choose a date in the future")
    }
    else {
      startButton.disabled = false
      }
  },
};

startButton.disabled = true
const selectedTime = flatpickr("#datetime-picker", options);

class Timer {
  constructor({onTick}){
    this.intervalId= null
    this.onTick = onTick
  }

  start() {

    const selectedTimeStr = selectedTime.selectedDates[0].getTime();

    this.intervalId = setInterval(() => {
      const currentTime = Date.now()
      const remainingTime = selectedTimeStr - currentTime

      if (remainingTime<0) {
        const time = this.convertMs(0)
        clearInterval(this.intervalId)
        startButton.disabled = false
        this.onTick(time)
      }
      else {
        const time = this.convertMs(remainingTime)
        startButton.disabled = true
        inputEl.disabled = true
        this.onTick(time)
      }

    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0')}
  }

  const timer = new Timer({
    onTick: updateClockFace
  })

  startButton.addEventListener('click', timer.start.bind(timer))


function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`
  hoursEl.textContent = `${hours}`
  minutesEl.textContent = `${minutes}`
  secondsEl.textContent = `${seconds}`
}
