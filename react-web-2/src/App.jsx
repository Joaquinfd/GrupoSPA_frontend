import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";



function App() {

  const abc = 'abcdefghijklmnñopqrstuvwxyz'
  const [letter, setAbc] = useState(0);
  const [count, setCount] = useState(0);

  return (
      <div>
        <Navbar/>
        <div className='card-container'> 
          <div className="card">
            <h1>N°</h1>
            <h2>{count}</h2>
            <button onClick={() => setCount((count) => count + 1)}>
              click
            </button>
          </div>

          <div className='card'>
            <h1>ABC</h1>
            <h2>{abc[letter]}</h2>
            <button onClick={() => {if (letter < 26) {setAbc((letter) => letter + 1)}}}>
              click
            </button>
          </div>
        </div>
      </div>

  )
}

export default App
