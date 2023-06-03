const formEl = document.querySelector('.form')

formEl.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const delay = event.target.delay;
  const step = event.target.step;
  const amount = event.target.amount;

  let delayEl = parseInt(delay.value);
  let stepEl = parseInt(step.value);
  let amountEl = parseInt(amount.value);
  if (delayEl > 0 || stepEl > 0 || amountEl > 0) {
    for (let i = 0; i < amount.value; i++) {
      createPromise(i+1, delayEl)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delayEl += stepEl;
    }
  
  }
  else {
    alert('Please put positive value')
  }
  formEl.reset();
}