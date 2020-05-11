/**
 * Function that converts a string into its binary representation
 *
 * @see https://gist.github.com/eyecatchup/6742657
 * @author https://github.com/eyecatchup
 */
function stringToBinary(str, spaceSeparatedOctets) {
  function zeroPad(num) {
    return "00000000".slice(String(num).length) + num;
  }

  return str.replace(/[\s\S]/g, function(str) {
    str = zeroPad(str.charCodeAt().toString(2));
    return !1 == spaceSeparatedOctets ? str : str + " "
  });
};

const form = document.getElementById('form');
const textInput = document.getElementById('formText');
const formOutput = document.getElementById('formOutput');
const bulbContainer = document.getElementById('bulbContainer');
let bulbIntervalId;

function sendLifiMessage(binaryString) {
  let i = 0;
  bulbIntervalId = setInterval(function() {
    if (i < binaryString.length) {
      const previousSpan = formOutput.childNodes[i-1];
      if (previousSpan) {
        previousSpan.classList.remove('highlight');
      }

      formOutput.childNodes[i].classList.add('highlight');

      if (binaryString[i] === '0') {
        bulbContainer.classList.remove('active');
      } else if (binaryString[i] === '1') {
        bulbContainer.classList.add('active');
      }

      i++;
    } else {
      clearInterval(bulbIntervalId);
    }
  }, 333);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  clearInterval(bulbIntervalId);
  bulbContainer.classList.remove('active');
  formOutput.innerHTML = '';
  const binary = stringToBinary(textInput.value);

  for (var s = 0; s < binary.length; s++) {
    let span = document.createElement("span");
    span.innerText = binary[s];
    formOutput.appendChild(span);
  }

  sendLifiMessage(binary);
});
