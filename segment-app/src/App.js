import React, { useState } from 'react';
import './App.css';
import Popup from './Popup';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={togglePopup}>Save segment</button>
        {showPopup && <Popup onClose={togglePopup} />}
      </header>
    </div>
  );
}

export default App;
