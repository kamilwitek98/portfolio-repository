import React from 'react'
import logo from '../../assets/tmdb.svg'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className='w-full mt-20 bg-black min-h-[300px] flex  items-center justify-center'>
        <div className='container flex flex-row gap-2 items-center '>
            <a href='https://www.themoviedb.org/'>
            <div className='flex max-w-[100px]'>
                <img src={logo} className='w-full'/>
            </div>
            </a>
            <p className='text-whitePowder font-poppins w-full text-center'>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
    </footer>
  )
}

export default Footer