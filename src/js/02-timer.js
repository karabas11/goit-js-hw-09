import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  timer : document.querySelector('.timer'),
  input : document.querySelector('#datetime-picker'),
  buttonStart : document.querySelector('button'),
  dataDay : document.querySelector('[data-days]'),
  dataHours : document.querySelector('[data-hours]'),
  dataMinutes : document.querySelector('[data-minutes]'),
  dataSecondes : document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentData = Date.now();
    
    if(selectedDate < currentData){
      refs.buttonStart.setAttribute('disabled', true);
      // alert ("Please choose a date in the future") ;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.buttonStart.removeAttribute('disabled');
      refs.buttonStart.addEventListener('click', onStartTimer);

      function onStartTimer() {
        refs.buttonStart.setAttribute('disabled', true);

        const timerId = setInterval(() => {
          const currentTime = Date.now();       
          const deltaTime =  selectedDate - currentTime;

          if(deltaTime <= 0){
            clearInterval(timerId);
            console.log(timerId);
            return;
          }else{
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
          // console.log(`${days}:${hours}:${minutes}:${seconds}`);
          updateTimerFase({ days, hours, minutes, seconds });
          }
           }, 1000)
      }
    }
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFase({days, hours, minutes, seconds}) {
  refs.dataDay.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSecondes.textContent = `${seconds}`;
}
