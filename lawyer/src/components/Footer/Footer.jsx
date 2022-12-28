import React from 'react';
import './Footer.css';
import { AiOutlineInstagram, AiOutlineYoutube, AiOutlineTwitter} from 'react-icons/ai';
const Footer = () => {
  return (
    <div className='app__footer'>
        <div className='footer__mainfooter'>
            <div className='mainfooter__logo'>        
                <div className='mainfooter__logo-letter'>L</div>
                <p className='mainfooter__logo-text'>Lawliet</p>
            </div>
            <div className='mainfooter__links'>
                <div className='mainfooter__links-wrapper'>
                    <p className='mainfooter__links-title'>Product</p>
                    <p className='mainfooter__links-link'><a href='#'>Overview</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Features</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Tutorials</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Pricing</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Releases</a></p>
                    <p className='mainfooter__links-link'></p>
                </div>
                <div className='mainfooter__links-wrapper'>
                    <p className='mainfooter__links-title'>Company</p>
                    <p className='mainfooter__links-link'><a href='#'>About</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Press</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Careers</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Contact</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Partners</a></p>
                </div>
                <div className='mainfooter__links-wrapper'>
                    <p className='mainfooter__links-title'>Support</p>
                    <p className='mainfooter__links-link'><a href='#'>Help Center</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Terms of service</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Legal</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Privacy Policy</a></p>
                    <p className='mainfooter__links-link'><a href='#'>Status</a></p>
                </div>
            </div>
        </div>
        <div className='footer__subfooter'>
            <p className='subfooter__text'>© 2021 Lawliet. All rights reserved</p>
            <div className='subfooter__socials'>
                <AiOutlineInstagram size={35} color='#fff' />
                <AiOutlineTwitter size={35} color='#fff' />
                <AiOutlineYoutube size={35} color='#fff' />
            </div>
        </div>
    </div>
  )
}

export default Footer
