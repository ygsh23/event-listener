import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  let state = {
    keyboardCount: 0,
    mouseCount: 0,
    touchCount: 0
  };

  var keyPress = false;
  var mouseClick = false;
  var touchScreen = false;
  var timeout;

  const [stateVaue, setStateValue] = useState(state);

  useEffect(() => {
    window.addEventListener("mousemove", function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(mouseStop, 150);
    });

    window.addEventListener("wheel", function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(mouseStop, 150);
    });

    window.addEventListener('mousedown', function () {
      if (!mouseClick) {
        mouseClick = true;
        console.log('mouse down');
      }
      window.addEventListener('mouseup', function () {
        mouseClick = false;
      });
    });

    window.addEventListener("touchmove", function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(touchStop, 150);
    });

    // reduce mouse move and mouse click count one time.. as it increases that count also 
    window.addEventListener('touchstart', function () {
      if (!touchScreen) {
        touchScreen = true;
        console.log('Touch start');
        setStateValue(prev => ({ keyboardCount: prev.keyboardCount, mouseCount: prev.mouseCount, touchCount : prev.touchCount + 1 }));
      }
      window.addEventListener('touchend', function () {
        touchScreen = false;
      });
    });

    window.addEventListener('keydown', function () {
      if (!keyPress) {
        keyPress = true;
        console.log('key down');
        setStateValue(prev => ({ keyboardCount: prev.keyboardCount + 1, mouseCount: prev.mouseCount, touchCount : prev.touchCount }));
      }
      window.addEventListener('keyup', function () {
        keyPress = false;
      });
    });
  });

  function mouseStop() {
    console.log('stopped');
  }

  function touchStop() {
    console.log('touch stopped');
  }


  const handleClick = () => {
    console.log(stateVaue.mouseCount);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={handleClick}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
