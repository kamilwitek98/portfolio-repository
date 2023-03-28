import React from 'react'
import { Navbar, Footer, Homepage, MovieDetails, Photos, Person } from './components';
import { Routes, Route } from 'react-router-dom';
const App = () => {

  return (
    <div>
        <Navbar />
        <div className='flex flex-col w-full'>
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/movie/:movieId' element={<MovieDetails />} />
            <Route exact path='/tv/:movieId' element={<MovieDetails />} />
            <Route exact path='/person/:personId' element={<Person />} />
            <Route exact path='/movie/:movieId/photos/:photoIndex' element={<Photos />} />
          </Routes>
        </div>
        <Footer />
    </div>
  )
}

export default App