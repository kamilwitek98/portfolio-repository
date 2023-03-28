import React from 'react'
import { useGetTradingsQuery, useGetUpcomingQuery } from '../../services/moviesApi'
import './homepage.css';
import { Link } from 'react-router-dom';
import Upcoming from './Upcoming/Upcoming';
import { Loading } from '../'

const Homepage = () => {

    const { data: tradings, isFetching } = useGetTradingsQuery();
    const { data: upcoming, isFetching: upcomingFetching } = useGetUpcomingQuery();

    if( isFetching | upcomingFetching ) return <Loading />

    console.log('Upcoming', upcoming);
  return (
    <div className='flex flex-col items-center gap-4'>
        <div className='w-full relative flex flex-col h-[600px] max-h-[100vh] items-center'>
            <div className='absolute top-0 bottom-0 left-0 right-0'>
                <img className='object-cover h-full w-full'  src={`https://image.tmdb.org/t/p/original/${tradings.results[0].backdrop_path}`} alt='image'/>
            </div>
            <div className='absolute gradient_top_to_down top-0 bottom-0 left-0 right-0' />
            <div className='z-50  container flex flex-col w-full h-full justify-end mb-10'>
                <Link to={`/${tradings.results[0].media_type}/${tradings.results[0].id}`}>
                    <h3 className='font-medium text_shadow_black sm:text-[60px] sm:leading-[80px] leading-[50px] text-[35px] font-poppins text-brownSandy'>{tradings.results[0].media_type === 'tv' ? tradings.results[0].name : tradings.results[0].original_title}</h3>
                    <p className='sm:text-[26px] text-[18px] mt-2 text_shadow_white text-whitePowder'>{tradings.results[0].overview}</p>
                </Link>
            </div>
        </div>
        
        <div className='container mt-10 flex gap-10 min-h-[800px] flex-col'>
            <h4 className='sm:text-[45px] w-full text-center font-bold xs:text-[35px] text-[30px] container  tracking-tighter uppercase mt-10'>upcoming</h4>
            <div className='w-full flex flex-row gap-4 flex-wrap' >
            {upcoming.results.slice(0,4).map((elem, index) => (
                <Upcoming key={`${elem.id}key`} upcoming={elem}/>
            ))}
            </div>
            
        </div>
        
        
    </div>
    
  )
}

export default Homepage