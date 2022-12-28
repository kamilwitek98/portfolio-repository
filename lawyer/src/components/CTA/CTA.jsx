import React from 'react'

import { IoIosCall } from 'react-icons/io'
import images from '../../assets';
import './CTA.css';

const CTA = () => {
  return (
    <div className='app__cta' id='contact'>
        <div className='app__cta-wrapper'>
            <div className='cta__content'>
                <h1 className='cta__content-title'>Complex Questions?</h1>
                <p className='cta__content-text'>Request for a personalized budget for your legal problem. We will send you a coupe options in 24 hours. You can have free consult , if a our first customer</p>
                <button type='button' onClick='#' className='cta__content-button'><IoIosCall size={28} /> Call Now</button>
            </div>
            <div className='cta__image'>
                <img src={images.worker} alt='worker' />
            </div>
        </div>
    </div>
  )
}

export default CTA