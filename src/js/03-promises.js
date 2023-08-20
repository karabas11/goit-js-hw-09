import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('input'),
};

refs.form.addEventListener('submit', onFormData);
// refs.buttonStart.addEventListener('click', onStart);

function onFormData(evt) {
  evt.preventDefault();
  const {amount, delay, step} = evt.currentTarget.elements;

  const data = {
    amount: amount.value,
    delay: delay.value,
    step: step.value,
  }

  for(let i = 0; i < data.amount; i += 1){
    const position = i;
    const delay = Number(data.delay) + Number(position*data.step);
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject)=>{
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
      // Fulfill
      resolve ({position, delay});
      } else {
      // Reject
      reject({position, delay});
      }
      }, delay);
  });
};
