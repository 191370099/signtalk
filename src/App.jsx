import './App.css'
import ThreeScene from './ThreeScene';
import { useState } from 'react';

function App() {

  const [inputText, setInputText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedText(inputText);
  };
  return (
    <div>
      {/* <div> */}
        <ThreeScene text={submittedText}/>
      {/* </div> */}
      <form onSubmit={handleSubmit}>
        <input value={inputText} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
