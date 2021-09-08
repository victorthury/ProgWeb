const toLower = function (value) {
  return value.toLowerCase();
}
const toUpper = function (value) {
  return value.toUpperCase();
}

const checked = (currentValue, value) => {
  const result = currentValue == value ? 'checked' : '';
  return result
}

function printError(errors, campo) {
  let message;
  console.log(errors)
  if (typeof errors !== 'undefined') {
    errors.errors.forEach(error => {
      if (error.path === campo) {
        message = error.message;
      }
    });
  }
  return message;
}

module.exports = { toLower, toUpper, checked, printError};