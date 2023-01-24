import React from 'react'
import { Navbar, Home, Form, Auth, Users } from './components'
import { Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <div className='flex flex-col justify-center w-full items-center'>
      <Navbar />
      <div className='myContainer justify-center items-center flex-col'>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/addgame' exact element={<Form />} />
          <Route path='/auth' exact element={<Auth />} />
          <Route path='/users' exact element={<Users />} />
        </Routes>
      </div> 
    </div>
  )
}

export default App