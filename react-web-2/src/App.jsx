import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from './pages/home';




function App() {

  return (

      <div>
        <Navbar/>
        <Home/>
      </div>

  )
}

export default App
