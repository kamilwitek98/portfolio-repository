import React, { useState } from 'react';

import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import './Navbar.css';

const Navbar = () => {
    const [toogleMenu, setToogleMenu] = React.useState(false);

    return (
        <nav className='app__navbar'>
            <div className='navbar__logo'>        
                <div className='logo__letter'>L</div>
                <p className='logo__text'>Lawliet</p>
            </div>
            <ul className='navbar__links'>
                <li className='navbar__links-text'><a href="#contact">contact</a></li>
                <li className='navbar__links-text'><a href="#testimonials">testimonials</a></li>
                <li className='navbar__links-text'><a href="#about">about</a></li>
                <li className='navbar__links-text'><a href="#terms">terms</a></li>
            </ul>
            <div className='navbar__search'>
                <AiOutlineSearch fontSize={24}/>
            </div>


            <div className='navbar-smallscreen'>
                <AiOutlineMenu fontSize={24} onClick={() => setToogleMenu(true)} />
                {toogleMenu && (
                    <div className='navbar-smallscreen_overlay slide-left'>
                        <AiOutlineClose fontSize={24} onClick={() => setToogleMenu(false)} />
                        <ul className='smallscreen_overlay__links'>
                            <li className='navbar__links-text'><a href="#contact">contact</a></li>
                            <li className='navbar__links-text'><a href="#testimonials">testimonials</a></li>
                            <li className='navbar__links-text'><a href="#about">about</a></li>
                            <li className='navbar__links-text'><a href="#terms">terms</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar