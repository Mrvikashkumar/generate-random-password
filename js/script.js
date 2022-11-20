//* Select DOM
const container = document.querySelector('.container');
const theme = document.querySelectorAll('.theme label input');
const showPassword = document.querySelector('.password-box input[type="text"]')
const copyPasswordBtn = document.querySelector('.copy-btn')
const clearPassword = document.querySelector('.clear-btn')
const howMuchLongPassword = document.getElementById('how-much-password');
const getRandomPasswordBtn = document.getElementById('generate-password');
const passwordLength = document.querySelector('.password-length input')
const settingBtn = document.querySelector('.setting-btn');
const moreSetting = document.querySelector('.more-setting');
const upperCase = document.getElementById('include-uppercase');
const lowerCase = document.getElementById('include-lowercase');
const numeric = document.getElementById('include-numeric');
const specialChar = document.getElementById('include-special-character');
const passwordType = document.querySelectorAll('.password-type');

//* function to generate dynamically capital and small Alphabet, numerical, and special character
const generator = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (v, k) => start + (step * k))
const capitalAlphabet = generator('A'.charCodeAt(), "Z".charCodeAt(), 1).map(x => String.fromCharCode(x));
const smallAlphabet = generator('a'.charCodeAt(), "z".charCodeAt(), 1).map(x => String.fromCharCode(x));
const numerical = generator('0'.charCodeAt(), "9".charCodeAt(), 1).map(x => x);
const specialCharacters = ["`", '~', "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "}", "[", "]", ";", ":", "'", '"', "<", ",", ">", ".", "/", "?"];

//* callback function to show more setting options
function showMoreSetting() {
  if (!moreSetting.classList.contains('show-more-setting')) {
    moreSetting.classList.add('show-more-setting')
  } else {
    moreSetting.classList.remove('show-more-setting')
  }
}

//* toggle between dark and light theme
theme.forEach(element => {
  element.addEventListener('click', (e) => {
    container.classList.toggle('light-theme')
  })
})

//* All character that is use in password
// You can use switch case statement instead for readability
let characters = '';
//* initialize first time characters value when dom loaded
//* this chunk of code is not mediatory we can initialize manually
document.addEventListener('DOMContentLoaded', () => {
  passwordType.forEach(element => {
    if (element.checked) {
      if (element.title == "smallAlphabet") {
        characters = smallAlphabet.join('');
      } else if (element.title == "capitalAlphabet") {
        characters = capitalAlphabet.join('');
      } else if (element.title == 'numerical') {
        characters = numerical.join('');
      } else if (element.title == 'specialCharacters') {
        characters = specialCharacters.join('')
      } else {
        showPassword.value = 'Select at least one type'
      }
    }
  })
})
// let characters = capitalAlphabet.join('');
function initializePasswordType() {
  if (upperCase.checked && lowerCase.checked && numeric.checked && specialChar.checked) {
    characters = capitalAlphabet.join('') + smallAlphabet.join('') + numerical.join('') + specialCharacters.join('');
  } else if (upperCase.checked && lowerCase.checked && numeric.checked) {
    characters = capitalAlphabet.join('') + smallAlphabet.join('') + numerical.join('');
  } else if (upperCase.checked && lowerCase.checked && specialChar.checked) {
    characters = capitalAlphabet.join('') + smallAlphabet.join('') + specialCharacters.join('');
  } else if (upperCase.checked && numeric.checked && specialChar.checked) {
    characters = capitalAlphabet.join('') + numerical.join('') + specialCharacters.join('');
  } else if (lowerCase.checked && numeric.checked && specialChar.checked) {
    characters = smallAlphabet.join('') + numerical.join('') + specialCharacters.join('');
  } else if (upperCase.checked && lowerCase.checked) {
    characters = capitalAlphabet.join('') + smallAlphabet.join('');
  } else if (upperCase.checked && numeric.checked) {
    characters = capitalAlphabet.join('') + numerical.join('');
  } else if (upperCase.checked && specialChar.checked) {
    characters = capitalAlphabet.join('') + specialCharacters.join('');
  } else if (lowerCase.checked && numeric.checked) {
    characters = smallAlphabet.join('') + numerical.join('');
  } else if (lowerCase.checked && specialChar.checked) {
    characters = smallAlphabet.join('') + specialCharacters.join('');
  } else if (numeric.checked && specialChar.checked) {
    characters = numerical.join('') + specialCharacters.join('');
  } else if (upperCase.checked) {
    characters = capitalAlphabet.join('');
  } else if (lowerCase.checked) {
    characters = smallAlphabet.join('');
  } else if (numeric.checked) {
    characters = numerical.join('');
  } else if (specialChar.checked) {
    characters = specialCharacters.join('');
  } else {
    alert(`You can't do this`)
    showPassword.value = ''
    upperCase.checked = true;
  }
}

//* change length of password
howMuchLongPassword.value = passwordLength.value;
passwordLength.addEventListener('input', () => {
  howMuchLongPassword.value = passwordLength.value;
  generatePassword(characters)
})

howMuchLongPassword.addEventListener('click', () => {
  howMuchLongPassword.select()
})
howMuchLongPassword.addEventListener('keydown', () => {
  console.log(howMuchLongPassword.value)
  generatePassword(characters);
  passwordLength.value = howMuchLongPassword.value;
})


//* function for generate random password
function generatePassword(chars) {
  let noOfPassword = howMuchLongPassword.value;
  let password = '';
  let count = 0;
  while (count < noOfPassword) {
    let randomNum = Math.floor(Math.random() * chars.length)
    password += chars[randomNum]
    count++;
  }
  showPassword.value = password;
  clearPassword.style.display = 'initial';
  initializePasswordType();
}
// getRandomPasswordBtn.addEventListener('click', generatePassword)

//* function for copy password to clipboard
function copyPassword() {
  if (showPassword.value.length >= 1) {
    navigator.clipboard.writeText(showPassword.value);
    // document.querySelector('.copy-password-result').innerHTML = `Password copy successfully!`
    alert(`Password "${showPassword.value}" copied`)
    showPassword.value = ''
  } else {
    showPassword.placeholder = `First generate password to copy!`;
  }
}
copyPasswordBtn.addEventListener('click', copyPassword);
showPassword.addEventListener('click', copyPassword);

//* clear password
clearPassword.addEventListener('click', () => {
  showPassword.value = '';
  clearPassword.style.display = 'none';
})

//* some event on particular key press
document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowUp') {
    container.classList.add('mobile-view')
  } else if (e.key == "ArrowDown") {
    container.classList.remove('mobile-view')
  } else if (e.key == 'Enter') {
    getRandomPasswordBtn.click()
  } else if (e.key == "ArrowLeft" || e.key == "-") {
    howMuchLongPassword.value -= 1;
    if (howMuchLongPassword.value < 5) {
      howMuchLongPassword.value = 5;
    }
    passwordLength.value = howMuchLongPassword.value;
    generatePassword(characters);
  } else if (e.key == "ArrowRight" || e.key == "+") {
    howMuchLongPassword.value = Number(howMuchLongPassword.value) + 1;
    if (howMuchLongPassword.value > 64) {
      howMuchLongPassword.value = 64;
    }
    passwordLength.value = howMuchLongPassword.value;
    generatePassword(characters);
  } else if (e.key == "CapsLock") {
    upperCase.click();
  } else if (e.key == "NumLock") {
    numeric.click()
  } else if (e.key == "/") {
    specialChar.click();
  } else if (e.key == "Backspace") {
    clearPassword.click()
  }
  // console.log(e.key)
})
// container.addEventListener('dblclick', ()=>{
//   settingBtn.click();
// })
document.querySelector('.head').addEventListener('dblclick', () => {
  container.classList.toggle('mobile-view')
})