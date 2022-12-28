import React from 'react'

import './Achievement.css';

const Achievement = () => {
  return (
    <div className='app__achievement'>
        <h1 className='app__achievement-title'>Some count that matters</h1>
        <p className='app__achievement-text'>Our achievement in the journey depicted in numbers</p>
        <div className='achievement__counts'>
            <div className='counts__onecount'>
                <p className='counts__onecount-number'>30</p>
                <p className='counts__onecount-alt'>Clients</p>
            </div>
            
            <div className='counts__onecount'>
                <p className='counts__onecount-number'>300+</p>
                <p className='counts__onecount-alt'>Taken business legalities</p>
            </div>

            <div className='counts__onecount'>
                <p className='counts__onecount-number'>8</p>
                <p className='counts__onecount-alt'>Years of Journey</p>
            </div>

        </div>
    </div>
  )
}

export default Achievement