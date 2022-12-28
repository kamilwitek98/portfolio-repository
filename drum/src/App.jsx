import React from 'react'
import './app.css';
import './index.js'
import Drum_machine from './components/drum_machine/Drum_machine';


const App = () => {
  return (
    <div className='drum-wrapper'>
        <Drum_machine />
    </div>
  )
}

export default App