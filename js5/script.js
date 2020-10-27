function circleArea(radius) {
  return (Math.PI * radius * radius).toFixed(2);
}

function circumference(radius) {
  return (Math.PI * radius * 2).toFixed(2);
}

function buttonEvent() {
  const circleInput = document.querySelector('#circle-input');
  const circleAreaInput = document.querySelector('#circle-area');
  const circumferenceInput = document.querySelector('#circumference');
  circleAreaInput.value = circleArea(circleInput.value);
  circumferenceInput.value = circumference(circleInput.value);
}
