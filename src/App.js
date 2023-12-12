import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';


import Base2To10 from './pages/Base2To10'
import Sample from './pages/Sample'




function App() {



  
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(false);
    toggleDarkMode();
  }, []);


  const [theGame, setTheGame] = useState({
    number: '1101',
    fromBase: '2',
    toBase: '10',
    convertedNumber: 'NaN',
    isValidNumber: true,
  });
  document.title = 'Renan Radix';
  const swapBases = () => {
    const inputBase = parseInt(theGame.fromBase);
    const outputBase = parseInt(theGame.toBase);

    // Check if the conversion of the current input number to the future output base is valid
    const isInputToOutputValid =isValidNumber(theGame.number.split(''), inputBase);

    // Check if the conversion of the current converted number to the future from base is valid
    const isConvertedToInputValid = isValidNumber(theGame.convertedNumber.split(''), outputBase);
    console.log("isInputToOutputValid"+isInputToOutputValid)
    console.log("isConvertedToInputValid:"+isConvertedToInputValid)


    if ((isInputToOutputValid && isConvertedToInputValid))
    setTheGame((prevState) => ({
      ...prevState,
      fromBase: prevState.toBase,
      toBase: prevState.fromBase,
      number: prevState.convertedNumber,
      convertedNumber: prevState.number,
    }));

    // Swap only the bases if both conversions are not valid
    else{
      setTheGame((prevState) => ({
        ...prevState,
        fromBase: prevState.toBase,
        toBase: prevState.fromBase,
      }));
    } 
  };

    const toggleDarkMode = () => {
      setIsDarkMode((prevMode) => {
        document.body.classList.toggle('dark-mode', !prevMode);
        document.body.classList.toggle('light-mode', prevMode);
        return !prevMode;
      });
    };
    

  const convertBase = () => {
    // Convert the entered string to an array of characters
    const enteredNumber = theGame.number;
    const numberArray = enteredNumber.split('');
  
    // Check if the entered array is valid
    if (!isValidNumber(numberArray, parseInt(theGame.fromBase))) {
      setTheGame((prevState) => ({
        ...prevState,
        convertedNumber: "Input doesn't fit to base " + theGame.fromBase,
        isValidNumber:false,
      }));
      return;
    }
  
    const inputBase = parseInt(theGame.fromBase);
    const outputBase = parseInt(theGame.toBase);
  
    if (inputBase < 2 || outputBase < 2) {
      setTheGame((prevState) => ({
        ...prevState,
        convertedNumber: "Input doesn't fit to base",
        isValidNumber:true,
      }));
      return;
    }
  
    let decimalNumber = 0;
    let power = 0;
  
    // Convert to decimal
    for (let i = numberArray.length - 1; i >= 0; i--) {
      const digit = isNaN(numberArray[i]) ? numberArray[i].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 10 : parseInt(numberArray[i]);
      decimalNumber += digit * Math.pow(inputBase, power);
      power++;
    }
  
    // Convert decimal to the desired base
    let convertedNumber = "";
    do {
      const remainder = decimalNumber % outputBase;
      const digit = remainder < 10 ? remainder : String.fromCharCode('A'.charCodeAt(0) + remainder - 10);
      convertedNumber = digit.toString() + convertedNumber;
      decimalNumber = Math.floor(decimalNumber / outputBase);
    } while (decimalNumber > 0);
  
    setTheGame((prevState) => ({ ...prevState, convertedNumber }));
  };


  const isValidNumber = (number, base) => {
    const validDigits = Array.from({ length: base }, (_, i) => {
      if (i < 10) {
        return i.toString();
      } else {
        return String.fromCharCode('A'.charCodeAt(0) + i - 10);
      }
    });
  
    for (let i = 0; i < number.length; i++) {
      if (!validDigits.includes(number[i].toString())) {
        return false;
      }
    }
  
    return true;
  };

  console.log('Rendering with isDarkMode:', isDarkMode);

const handleNumberChange = (event) => {
  const newNumber = event.target.value;
  const isValid = isValidNumber(newNumber, theGame.fromBase);

  setTheGame((prevState) => ({
    ...prevState,
    number: newNumber,
    isValidNumber: isValid,
  }));
};


const handleCustomFromBaseChange = (event) => {
  const customValue = event.target.value;
  const isValid = isValidNumber(theGame.number, customValue);

  setTheGame((prevState) => ({
    ...prevState,
    fromBase: customValue,
    isValidNumber: isValid,
  }));
};

  const handleFromBaseChange = (event) => {
   
    const newFromBase = event.target.value;
    const isValid = isValidNumber(theGame.number, newFromBase);
 
      setTheGame((prevState) => ({
        ...prevState,
        fromBase: newFromBase,
        isValidNumber: isValid,
      }));
  };

  const handleToBaseChange = (event) => {
  
      setTheGame((prevState) => ({ ...prevState, toBase: event.target.value }));
  };


  const handleCustomToBaseChange = (event) => {
    const customValue = event.target.value;
    setTheGame((prevState) => ({ ...prevState, toBase: customValue }));
  };


  useEffect(() => {
    convertBase();
  }, [theGame.number, theGame.fromBase, theGame.toBase]);

  return (
    <div className="App">
   
      <h1>Radix</h1>
      number: <input type="text"   className={theGame.isValidNumber ? '' : 'invalid'} onChange={handleNumberChange} value={theGame.number} />

  
      From Base:
      <select onChange={handleFromBaseChange} value={theGame.fromBase}>
        {/* Options for bases, you can customize these as needed */}
        <option value="2"> 2-Binary</option>
        <option value="8"> 8-Octal</option>
        <option value="10">10-Decimal</option>
        <option value="16">16-Hexadecimal</option>
        {/* An option for custom input */}
        <option value="custom">Custom</option>
      </select>

      {/* Input for custom "From Base" */}
      {theGame.fromBase === 'custom' && (
        <input
          type="number"
          placeholder="Enter custom base"
          onChange={handleCustomFromBaseChange}
          value={theGame.customFromBase}
        />
      )}
 
    
      To Base:
      <select onChange={handleToBaseChange} value={theGame.toBase}>
        {/* Options for bases, you can customize these as needed */}
        <option value="2">2-Binary</option>
        <option value="8">8-Octal</option>
        <option value="10">10-Decimal</option>
        <option value="16">16-Hexadecimal</option>
        {/* An option for custom input */}
        <option value="custom">Custom</option>
      </select>

      {/* Input for custom "To Base" */}
      {theGame.toBase === 'custom' && (
        <input
          type="number"
          placeholder="Enter custom base"
          onChange={handleCustomToBaseChange}
          value={theGame.customToBase}
        />
      )}

      <br/>
      <button onClick={swapBases}>Swap Bases</button>
      <div className='result'>
        {/* Title for the result div */}
        <h2 className={`result-title ${isDarkMode ? 'dark-mode' : ''}`}>Conversion Result</h2>
        {/* Display Input Number and Converted Number */}
        <h3>Input Number: ( {isValidNumber(theGame.number, theGame.fromBase) ? theGame.number : theGame.convertedNumber} )<sub>{theGame.fromBase}</sub>  </h3>
        <h3>Converted Number: ( {theGame.convertedNumber} )<sub>{theGame.toBase}</sub>  </h3>
      </div>
      {/* Dark mode/light mode toggle button */}
      <button onClick={toggleDarkMode} className={`toggle-button ${isDarkMode ? 'dark-mode' : ''}`} >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}

export default App
