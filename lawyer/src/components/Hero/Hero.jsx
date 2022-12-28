import React from 'react';
import images from '../../assets/index';
import './Hero.css';

const Hero = () => {

  return (
    <div className='app__hero' id='terms'>
        <div className='app__hero-container'>
            <div className='hero__content'>
                <div className='content__connect'>
                    <button type='button' className='connect__button'>New</button>
                    <p className='connect__alt'>Stay connected to the upcoming & Recent jobs</p>
                </div>
                <h1 className='content__heading'>Your Solution Legal Consultacy</h1>
                <p className='content__alt'>We are here to help you take care of your legality with the best service especially for you.</p>
                <button type='button' className='content__button'>Get Started</button>
                <div className='connect__media'>
                    <p className='media__alt'>Trusted by 10+ companies in indonesia</p>
                    <img src={images.logos} alt='logos' className='media__logos' />
                </div>
            </div>
            <div className='hero__person'>
                <img src={images.hero} alt='hero' />
                <div className='person__description'>
                    <p className='person__description-name'>Tiara Andini</p>
                    <p className='person__description-alt'>-Lawyer</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero