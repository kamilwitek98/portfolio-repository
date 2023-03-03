import React from 'react'
import { Form, Homepage, Navbar, Auth } from './components'
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <div className='flex flex-col justify-center w-full items-center'>
      <Navbar />
      <div className='myContainer justify-center items-center flex-col'>
        <Routes>
          <Route path='/' exect element={<Homepage />} />
          <Route path='/auth' exect element={<Auth />} />
        </Routes>
      </div>
    </div>
  )
}

export default App