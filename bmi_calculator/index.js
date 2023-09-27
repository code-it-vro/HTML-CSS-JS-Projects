const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);
  const result = document.querySelector('#result');
  let your; // Declare the 'your' variable here

  if (height === '' || height < 0 || isNaN(height)) {
    result.innerHTML = 'Please give a valid height';
  } else if (weight === '' || weight < 0 || isNaN(weight)) {
    result.innerHTML = 'Please give a valid weight';
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    if (bmi < 18.6) {
      your = 'under weight'; // Set the 'your' variable
    } else if (bmi >= 18.6 && bmi <= 24.9) {
      your = 'perfectly fit'; // Set the 'your' variable
    } else {
      your = 'over weight'; // Set the 'your' variable
    }

    result.innerHTML = `This is your BMI: ${bmi} and you are ${your}`;
  }
});
