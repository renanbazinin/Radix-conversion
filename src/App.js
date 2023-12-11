import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';


import Base2To10 from './pages/Base2To10'
import Sample from './pages/Sample'




function App() {


  
  const [isDarkMode, setIsDarkMode] = useState(false);



  const [theGame, setTheGame] = useState({
    number: '1101',
    fromBase: '2',
    toBase: '10',
    convertedNumber: 'NaN',
  });
  document.title = 'Renan Radix';
    const swapBases = () => {
      // Swap the values of fromBase and toBase
      setTheGame((prevState) => ({
        ...prevState,
        fromBase: prevState.toBase,
        toBase: prevState.fromBase,
      }));
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
      }));
      return;
    }
  
    const inputBase = parseInt(theGame.fromBase);
    const outputBase = parseInt(theGame.toBase);
  
    if (inputBase < 2 || outputBase < 2) {
      setTheGame((prevState) => ({
        ...prevState,
        convertedNumber: "Input doesn't fit to base",
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


  setTheGame((prevState) => ({ ...prevState,number:event.target.value}));
};


  const handleFromBaseChange = (event) => {
 
      setTheGame((prevState) => ({ ...prevState, fromBase: event.target.value }));
  };

  const handleToBaseChange = (event) => {
  
      setTheGame((prevState) => ({ ...prevState, toBase: event.target.value }));
  };

  useEffect(() => {
    convertBase();
  }, [theGame.number, theGame.fromBase, theGame.toBase]);

  return (
    <div className="App">
   
      <h1>Radix</h1>
      number: <input type="text" onChange={handleNumberChange} value={theGame.number} />

      <br />
      From Base: <input type="number" min='2' onChange={handleFromBaseChange} value={theGame.fromBase} />
      <br />
      To Base: <input type="number" min ='2' onChange={handleToBaseChange} value={theGame.toBase} />
      <br />
      <button onClick={swapBases}>Swap Bases</button>
      <br/>
      <div>
        <h3>Converted Number: ( {theGame.convertedNumber} )<sub>{theGame.toBase}</sub>  </h3>
      </div>
  {/* Dark mode/light mode toggle button */}
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      
    </div>
  );
}

export default App
