import React from 'react';
import './Testimonial.css';

import images from '../../assets';

const Testimonial = () => {
  return (
    <div className='app__testimonial' id='testimonials'>
        <h1 className='app__testimonial-title'>Clients Testimonial</h1>
        <div className='testimonial__testimonials'>
            <div className='testimonials__card'>
                <div className='card__text'>
                    <p className='card__text-title'>Incredible Experience</p>
                    <p className='card__text-description'>We had an incredible experience working with Landify and were impressed they made such a big difference in only three weeks. Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the concept so quickly.</p>
                </div>
                <div className='card__person'>
                    <img src={images.avatar} alt='avatar' className='card__person-avatar'/>
                    <div className='card__person-text__container'>
                        <p className='card__person-name'>Anya Tailor Joy</p>
                        <p className='card__person-position'>CEO, SF Industires</p>
                    </div>
                </div>
            </div>

            <div className='testimonials__card'>
                <div className='card__text'>
                    <p className='card__text-title'>Dependable, Responsive, Professional Partner</p>
                    <p className='card__text-description'>Fermin Apps has collaborated with Landify team for several projects such as Photo Sharing Apps and Custom Social Networking Apps. The experience has been pleasant, professional and exceeding our expectations. </p>
                </div>
                <div className='card__person'>
                    <img src={images.avatar} alt='avatar' className='card__person-avatar'/>
                    <div className='card__person-text__container'>
                        <p className='card__person-name'>Sri Alam</p>
                        <p className='card__person-position'>CEO, Membagongkan GROUP</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonial