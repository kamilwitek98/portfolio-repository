import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const Upcoming = ({upcoming}) => {
    const [showDescription, setShowDescription] = useState(false)
  return (
    <div className='flex flex-1 flex-col' key={upcoming.id + 'upcoming'}>
        <Link to={`/movie/${upcoming.id}`}>
        <div className='flex overflow-hidden'>
            <img src={`https://image.tmdb.org/t/p/w500${upcoming.backdrop_path}`} className='ease-in-out duration-500 object-cover h-full w-full hover:scale-[1.1]'/>
        </div>
        </Link>
        <div className='flex flex-col min-h-[200px] gap-2 px-2 justify-between font-poppins items-center pt-5 pb-2 border-x border-b border-brownSandy'>
            <div className='flex flex-col'>
            <Link to={`/movie/${upcoming.id}`}><p className='text-center hover:text-brownSandy transition lg:text-[25px]  text-[20px] font-medium ' >{upcoming.title}</p></Link>
            
            <p className='text-center'>{upcoming.release_date}</p>
            </div>
            {showDescription && 
                <p >{upcoming.overview}</p>
            }
            <button  onClick={() => setShowDescription(prev => !prev)} className='hover:text-brownSandy transition-all hover:border-brownSandy min-w-[150px] rounded border p-2' >{!showDescription ? 'Show ' : 'Hide '}Description</button>
        </div>
    </div>
  )
}

export default Upcoming