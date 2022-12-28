import React from 'react';

import images from '../../assets/index';
import './Why.css';


const Why = () => {
  return (
    <div className='app__why' id='about'>
      <div className='why__title'>
        <h1 className='why__title-text'>Why do we help with legalization?</h1>
        <p className='why__title-alt'>We are here for UMKM in Indonesia to carry out the legalization process, which is sometimes complicated.</p>
      </div>
      <div className='why__feature'>
        <div className='why__feature-container'>
          <div className='feature__element'>
            <img src={images.circles} alt='circles' className='feature__element-icon' />
            <p className='feature__element-title'>Enviromental Law</p>
            <p className='feature__element-text'>Environmental legal issues might occur since the planned business activities are designed</p>
          </div>
          <div className='feature__element'>
            <img src={images.bag} alt='bag' className='feature__element-icon' />
            <p className='feature__element-title'>Corporate and Commercial</p>
            <p className='feature__element-text'>We provide a complete range of services for the continuity of your business activities.</p>
          </div>
          <div className='feature__element'>
            <img src={images.rocket} alt='rocket' className='feature__element-icon' />
            <p className='feature__element-title'>Information and Technology</p>
            <p className='feature__element-text'>IT not followed by the existing regulation which might cause legal uncertainty and business uncertainty.</p>
          </div>
          <div className='feature__element'>
            <img src={images.userArrow} alt='userArrow' className='feature__element-icon' />
            <p className='feature__element-title'>Other Services</p>
            <p className='feature__element-text'>In dealing with disruptive economic and legal challenge, our firm also provide various legal services.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Why