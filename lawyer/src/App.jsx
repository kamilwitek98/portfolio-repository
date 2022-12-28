import React from 'react'

import { Navbar, Hero, Why, Achievement, Testimonial, CTA, Footer } from './components';
import './App.css';

const App = () => {
  return (
  <div>
    <Navbar />
    <Hero />
    <Why />
    <Achievement />
    <Testimonial />
    <CTA />
    <Footer />
  </div>
  )
}

export default App