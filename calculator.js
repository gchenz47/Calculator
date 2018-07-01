const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
const operators = keys.querySelectorAll('.key--operator');

//initialize calculation parameters
let num1;
let num2;
let operatorFlag = false;
let displayResult = display.textContent;
//Add Keyboard EventListener
document.addEventListener('keyup', e => {
  let button;
  regNum =/[0-9]/;
  if(regNum.test(e.key)){
    button = keys.querySelector('button[data-number=' + `${e.key}` + ']');
  }else if(e.key === '+'){
    button = keys.querySelector('[data-action="add"]');
  }else if(e.key === '-'){
    button = keys.querySelector('[data-action="subtract"]');
  }else if(e.key === '*'){
    button = keys.querySelector('[data-action="multiply"]');
  }else if(e.key === '/'){
    button = keys.querySelector('[data-action="divide"]');
  }else if(e.key === '.'){
    button = keys.querySelector('[data-action="decimal"]');
  }else if(e.key === 'Escape'){
    button = keys.querySelector('[data-action="clear"]');
  }else if(e.key === 'Enter'){
    button = keys.querySelector('[data-action="calculate"]');
  }else{
    return;
  }
  button.click();

})

//Click EventListener for any button clicked
keys.addEventListener('click', e => {
  if(e.target.matches('button')){
    const key = e.target;
    const action = key.dataset.action;
    //when non action buttons(numbers) are clicked
    if(!action){
      if(calculator.dataset.previousKeyType === 'operator' || displayResult == '0'){
          displayResult = key.textContent;
        }else if(calculator.dataset.previousKeyType === 'calculate'){
          displayResult = key.textContent;
          num1 = null;
          num2 = null;
        }else{
          displayResult += key.textContent;
        }
        calculator.dataset.previousKeyType = 'number';
    }
    //when operator buttons are clicked
    else if(action === 'add' ||
             action === 'subtract' ||
             action === 'multiply' ||
             action === 'divide'){
      if(calculator.dataset.previousKeyType !== 'operator'){
        if(num1 !== null && operatorFlag){
          num2 = displayResult;
          num1 = displayResult = calculate(num1, calculator.dataset.operator, num2);
        }
        else{
          num1 = displayResult;
        }
        operatorFlag = true; // continuous calculation allowed by pressing operators
      }
      operators.forEach(op => op.classList.remove('is-depressed'));
      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }


    //when decimal button is clicked
    else if(action === "decimal"){
      if(calculator.dataset.previousKeyType === 'calculate'){
        displayResult = '0.';
      }else{
        if(displayResult.indexOf('.') <= -1){
          displayResult += '.';
        }
      }
      calculator.dataset.previousKeyType = 'number';
    }

    //clear button is clicked, reset everything
    else if(action === "clear"){
      calculator.dataset.previousKeyType = '';
      calculator.dataset.operator = '';
      num1 = null;
      num2 = null;
      operatorFlag = false;
      displayResult = 0;
      operators.forEach(op => op.classList.remove('is-depressed'));
    }
    //when equal button is clicked
    else if(action === "calculate"){
      displayResult = calculate(num1, calculator.dataset.operator, num2);
      num1 = displayResult;
      operators.forEach(op => op.classList.remove('is-depressed'));
      calculator.dataset.previousKeyType = 'calculate';
      operatorFlag = false;
    }
  }
  showResult(displayResult); //show result in display
});


//function to display results, also limiting the lenth of output
function showResult(result){
  if (String(result).length >= 11){
    result = parseFloat(result).toPrecision(8);
  }
    display.textContent = result;
}
//function to calculate the results
function calculate(n1, op, n2){
  if (n1 === null){
      return displayResult;
  } if (op === null){
    return displayResult;
  }else {
    if(calculator.dataset.previousKeyType === 'number' || num2 === null){
      n2 = num2 = displayResult;
    } else{
      n2 = num2;
    }
    if (op === 'add'){
      return parseFloat(n1) + parseFloat(n2);
    }if(op === 'subtract'){
      return parseFloat(n1) - parseFloat(n2);
    }if(op === 'multiply'){
      return parseFloat(n1) * parseFloat(n2);
    }if(op === 'divide'){
      return parseFloat(n1) / parseFloat(n2);
    }else{
      return displayResult;
    }
  }
}
