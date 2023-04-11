const dateBirthDay = document.querySelector('#input_day');
const dateBirthMonth = document.querySelector('#input_month');
const dateBirthYear = document.querySelector('#input_year');
const button = document.querySelector('.image__circle');
const ageYear = document.querySelector('#age_year');
const ageMonth = document.querySelector('#age_month');
const ageDay = document.querySelector('#age_day');
const regExNumber = /^[\d]+$/;
const shortMonth = ['4', '6', '9', '11'];
const theBirthdayItself = 1;
const nowDate = new Date();
// general functions
function errorDisplay(el, text) {
  element = document.querySelector(el);
  element.textContent = text;
}
function croppingValues(el) {
  const newValue = el.value.substring(0, el.value.length - 1);
  el.value = newValue;
}
function resetCalculations() {
  ageDay.textContent = `- -`;
  ageMonth.textContent = `- -`;
  ageYear.textContent = `- -`;
}
function isLeapYear(year) {
  if (year%4 == 0) {
      if (year%100 == 0) {
          if (year%400 == 0) {
              return true;
          }
          else {
            return false;
          }
      }
      else {
        return true;
      }
  }
  return false;
}
function checkDate() {
  if (dateBirthDay.value > 31) {
    errorDisplay ('.error-day', `Must be valid day`);
    resetCalculations()
  }
  else if (dateBirthDay.value == 31 && shortMonth.includes(dateBirthMonth.value)) {
    errorDisplay ('.error-day', `Must be valid day`);
    resetCalculations()
  }
  else if (dateBirthDay.value > 29 && dateBirthMonth.value == 2) {
    errorDisplay ('.error-day', `Must be valid day`);
    resetCalculations()
  }
  else if (dateBirthDay.value > 28 && dateBirthMonth.value == 2 && !isLeapYear(dateBirthYear.value)) {
    errorDisplay ('.error-day', `Must be valid day`);
    resetCalculations()
  }
  else if (dateBirthYear.value == nowDate.getFullYear() && dateBirthMonth.value == nowDate.getMonth() + 1 && dateBirthDay.value > nowDate.getDate()) {
    errorDisplay ('.error-day', `Must be in the past`);
    resetCalculations()
  }
  else if (dateBirthMonth.value > 12) {
    errorDisplay ('.error-month', `Must be a valid month`);
    resetCalculations()
  }
  else if (dateBirthYear.value == nowDate.getFullYear() && dateBirthMonth.value > nowDate.getMonth() + 1) {
    errorDisplay ('.error-month', `Must be in the past`);
    resetCalculations()
  }
  else if (dateBirthYear.value > nowDate.getFullYear()) {
    errorDisplay ('.error-year', `Must be in the past`);
    resetCalculations()
  }
  else {
    errorDisplay('.error-year', ``);
    errorDisplay('.error-month', ``);
    errorDisplay('.error-day', ``);
  }
}
// checking the day
dateBirthDay.addEventListener('input', () => {
  if (dateBirthDay.value.length > 2) {
    croppingValues(dateBirthDay);
  }
  else {
    checkDate();
  }
})
// checking the month
dateBirthMonth.addEventListener('input', () => {
  if (dateBirthMonth.value.length > 2) {
    croppingValues(dateBirthMonth);
  }
  else {
    checkDate();
  }
})
// checking the year
dateBirthYear.addEventListener('input', () => {
  if (dateBirthYear.value.length > 4) {
    croppingValues(dateBirthYear);
  }
  else {
    checkDate();
  }
})
// check format birthday
button.addEventListener('click', () => {
  const birthString = new Date(dateBirthYear.value, dateBirthMonth.value -1, dateBirthDay.value);
  if (!regExNumber.test(dateBirthDay.value)) {
    errorDisplay ('.error-day', `Only number`);
  }
  else if (!regExNumber.test(dateBirthMonth.value)) {
    errorDisplay ('.error-month', `Only number`);
  }
  else if (!regExNumber.test(dateBirthYear.value)) {
    errorDisplay ('.error-year', `Only number`);
  }
  else if (dateBirthYear.value < 100) {
    errorDisplay('.error-year', `The year must exceed 99`);
    resetCalculations()
  }
  else {
    ageCalculation(birthString);
    checkDate();
  }
})
// function calculation of age
function ageCalculation(birthString) {
// calculation of years
  let diffYear = nowDate.getFullYear() - birthString.getFullYear();
  if (nowDate.getMonth() < birthString.getMonth() || nowDate.getMonth() == birthString.getMonth() && nowDate.getDate() < birthString.getDate()) {
    diffYear--;
    ageYear.textContent = diffYear;
  }
  else {
    ageYear.textContent = diffYear;
  }
// calculation of months
  if (nowDate.getFullYear() >= birthString.getFullYear() && nowDate.getMonth() >= birthString.getMonth() && nowDate.getDate() >= birthString.getDate()) {
    let diffMonth =  nowDate.getMonth() - birthString.getMonth();
    ageMonth.textContent = diffMonth;
  }
  else if (nowDate.getFullYear() >= birthString.getFullYear() && nowDate.getMonth() >= birthString.getMonth() && nowDate.getDate() < birthString.getDate()) {
    let diffMonth = nowDate.getMonth() - birthString.getMonth() - 1;
    ageMonth.textContent = diffMonth;
  }
  else if (nowDate.getFullYear() >= birthString.getFullYear() && nowDate.getMonth() < birthString.getMonth() && nowDate.getDate() >= birthString.getDate()) {
    let diffMonth = 12 - birthString.getMonth() + nowDate.getMonth();
    ageMonth.textContent = diffMonth;
  }
  else {
    let diffMonth = 11 - birthString.getMonth() + nowDate.getMonth();
    ageMonth.textContent = diffMonth;
  }
// calculation of days
  if (nowDate.getDate() >= birthString.getDate()) {
    let diffDay = nowDate.getDate() - birthString.getDate() + theBirthdayItself;
    ageDay.textContent = diffDay;
  }
  else {
    if (shortMonth.includes(dateBirthMonth.value)) {
      let diffDay = nowDate.getDate() + 30 - birthString.getDate() + theBirthdayItself;
      ageDay.textContent = diffDay;
    }
    else if (dateBirthMonth.value == 2 && !isLeapYear(dateBirthYear.value)) {
      let diffDay = nowDate.getDate() + 28 - birthString.getDate() + theBirthdayItself;
      ageDay.textContent = diffDay;
    }
    else if (dateBirthMonth.value == 2 && isLeapYear(dateBirthYear.value)) {
      let diffDay = nowDate.getDate() + 29 - birthString.getDate() + theBirthdayItself;
      ageDay.textContent = diffDay;
    }
    else {
      let diffDay = nowDate.getDate() + 31 - birthString.getDate() + theBirthdayItself;
      ageDay.textContent = diffDay;
    }
  }
}