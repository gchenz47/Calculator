import React,{Component} from 'react';

class Calculator extends Component {
  state = {
    displayValue: '0',
    prevValue: null,
    nextValue: null,
    operator: null
  }

  inputDigit(digit){
    const {displayValue, waitingForOperand} = this.state;
    if(waitingForOperand){
      this.setState({
        waitingForOperand: false,
        displayValue : String(digit)
      })
    }else{
      this.setState({
        displayValue : displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }

  inputDot(){
    const {displayValue, waitingForOperand} = this.state;
    if(waitingForOperand){
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    }
    else if(displayValue.indexOf('.') === -1){
      this.setState({
        displayValue : displayValue + '.'
      })
    }
  }

  clearDisplay(){
    this.setState({
      displayValue: '0',
      prevValue: null,
      nextValue: null,
      waitingForOperand: false,
      operator: null
    })
  }

  toggleSign(){
    const {displayValue} = this.state;
    this.setState({
      displayValue: String(-parseFloat(displayValue))
    })
  }

  performOperation(op){
    const {displayValue, operator, prevValue, nextValue} = this.state;
    const operations = {
      '+': (first, second) => parseFloat(first) + parseFloat(second),
      '-': (first, second) => parseFloat(first) - parseFloat(second),
      '*': (first, second) => parseFloat(first) * parseFloat(second),
      '/': (first, second) => parseFloat(first) / parseFloat(second),
      '=': (first, second) => second
    }
    if(op !== '='){
      const firstValue = prevValue;
      if(prevValue === null){
        this.setState({
          prevValue: displayValue
        })
      }else{
        const secondValue = displayValue;
        const computedValue = operations[operator](firstValue,secondValue);
        this.setState({
          nextValue: displayValue,
          displayValue: String(computedValue),
          prevValue: String(computedValue)
        })
      }
      this.setState({
        waitingForOperand: true,
        operator: op
      })
    }else{
      if(prevValue === null && nextValue === null){
        return;
      }else{
        if(prevValue === null){
          const firstValue = displayValue;
          const secondValue = nextValue;
          const computedValue = operations[operator](firstValue,secondValue);
          this.setState({
            displayValue: String(computedValue),
            prevValue: null
          })
        }else{
          const firstValue = prevValue;
          const secondValue = displayValue;
          const computedValue = operations[operator](firstValue,secondValue);
          this.setState({
            nextValue: displayValue,
            displayValue: String(computedValue),
            prevValue: null
          })
        }
      }
    }
  }
//limiting displayed result under 8 precision positions
  shortenResult(){
    const {displayValue} = this.state;
    let result = displayValue;
    if (String(displayValue).length >= 10){
      result = parseFloat(displayValue).toPrecision(8);
    }
    return result;
  };
//handle keyboard inputs
  handleKeyPress = (event) =>{
    if(event.key>=0 && event.keyCode<=10){
      this.inputDigit(event.key);
    }
    switch(event.key){
      case '+':
        this.performOperation('+');
        break;
      case '-':
        this.performOperation('-');
        break;
      case '*':
        this.performOperation('*');
        break;
      case '/':
        this.performOperation('/');
        break;
      case '=':
        this.performOperation('=');
        break;
      case '.':
        this.inputDot();
        break;
      default:
        return;
    }
  }


  render() {
    return (
      <div className="App" onKeyPress={this.handleKeyPress}>
          <div className="container">
              <p>
                This calculator works exactly like the calculator you know. Click any number to start calculating!
              </p>
              <div className="calculator">
                <div className="calculator__display">{this.shortenResult()}</div>
                <div className="calculator__keys">
                  <button onClick={()=> this.performOperation('+')} className="key--operator" data-action="add">+</button>
                  <button onClick={()=> this.performOperation('-')} className="key--operator" data-action="subtract">-</button>
                  <button onClick={()=> this.performOperation('*')} className="key--operator" data-action="multiply">&times;</button>
                  <button onClick={()=> this.performOperation('/')} className="key--operator" data-action="divide">&divide;</button>
                  <button onClick= {()=> this.inputDigit(7)} className="number">7</button>
                  <button onClick= {()=> this.inputDigit(8)} className="number">8</button>
                  <button onClick= {()=> this.inputDigit(9)} className="number">9</button>
                  <button onClick= {()=> this.inputDigit(4)} className="number">4</button>
                  <button onClick= {()=> this.inputDigit(5)} className="number">5</button>
                  <button onClick= {()=> this.inputDigit(6)} className="number">6</button>
                  <button onClick= {()=> this.inputDigit(1)} className="number">1</button>
                  <button onClick= {()=> this.inputDigit(2)} className="number">2</button>
                  <button onClick= {()=> this.inputDigit(3)} className="number">3</button>
                  <button onClick= {()=> this.inputDigit(0)} className="number">0</button>
                  <button onClick= {()=> this.toggleSign()} data-action="sign">+/-</button>
                  <button onClick= {()=> this.inputDot()} data-action="decimal">.</button>
                  <button onClick= {()=> this.clearDisplay()} data-action="clear">AC</button>
                  <button onClick= {()=> this.performOperation('=')} className ="key--equal" data-action="calculate">=</button>
                </div>
              </div>
            </div>
        </div>
    );
  };
}



export default Calculator;
