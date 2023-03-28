import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { useGetMovieDetailsQuery, useGetImagesQuery, useGetVideosQuery, useGetCreditsQuery } from '../../services/moviesApi'
import { enableMapSet } from 'immer'
import { AiFillStar } from 'react-icons/ai'
import { format } from 'date-fns'
import './movieDetails.css'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { Loading } from '../index';


const MovieDetails = () => {

    const {movieId} = useParams()
    const pathname = window.location.pathname;
    const type = pathname.split('/')[1];

    
    const {data, isFetching } = useGetMovieDetailsQuery({type: type, id: movieId});
    const {data: images, isFetching: imagesLoading} = useGetImagesQuery({type: type, id: movieId});
    const {data: videos, isFetching: videosLoading} = useGetVideosQuery({type: type, id: movieId});
    const {data: credits, isFetching: creditsLoading} = useGetCreditsQuery({type: type, id: movieId});

    const scrollRef = React.useRef(null);

  
    const scroll = (direction) => {
        const { current } = scrollRef;

        if(direction === 'left'){
        current.scrollLeft -= current.offsetWidth;
        } else {
        current.scrollLeft += current.offsetWidth;
        }
    }

    if( isFetching | imagesLoading | videosLoading | creditsLoading) return <Loading />
    
    const release = type === 'movie' ?  new Date(data.release_date) : new Date(data.first_air_date);
    const trailer = videos.results.find(elem => elem.name === 'Official Trailer');
    console.log(credits);

    
    
    
    

  return (
    
    <div className='flex w-full flex-col items-center bg-whitePowder font-poppins  gap-4'>
      <div className='w-full relative flex flex-col h-[600px] max-h-[100vh] items-center'>
          <div className='absolute top-0 bottom-0 left-0 right-0'>
              <img className='object-cover h-full w-full'   src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt='image'/>
          </div>
          <div className='absolute gradient_top_to_down top-0 bottom-0 left-0 right-0' />
          <div className='z-50 container flex flex-col w-full h-full justify-end mb-4'>
            <p className='text-brownSandy font-bold tracking-tight text-[20px] leading-[28px] uppercase'>{type}</p>
            <h3 className='font-medium tracking-tight text-whitePowder text_shadow_black sm:text-[60px] sm:leading-[65px] leading-[45px] text-[35px] font-poppins '>{type === 'movie' ? data.title : data.name}</h3>
            <p className='text-[18px] text-gray-200'>{data.title !== data.original_title && <span>{data.original_title}&emsp;</span> }{data.name !== data.original_name && <span>{data.original_name}&emsp;</span> }{type === 'movie' ? data.release_date : data.first_air_date}&emsp;{parseInt(type=== 'movie' ? data.runtime / 60 : data.last_episode_to_air.runtime / 60)}hr {type === 'movie' ? data.runtime % 60 : data.last_episode_to_air.runtime % 60}min.</p>
            <div className='flex flex-row mt-4 items-center'>
              <AiFillStar size={50} className='text-brownSandy'/>
              <p className='text-[40px] leading-[40px]  text-whitePowder'>{Math.round(data.vote_average * 10) / 10}</p>
              <div className='flex flex-col ml-3 justify-center'>
                <p className='text-[15px] leading-[18px] text-gray-200'>{data.vote_count}</p>
                <p className='text-[15px] leading-[18px] text-gray-200'>oceny</p>
              </div>
            </div>
          </div>
      </div>
      <div className='container flex flex-col md:flex-row sm:gap-10 items-center gap-4 mt-4 font-poppins'>
        <div className='flex flex-[0.4] max-w-[400px]  md:max-w-none md:min-w-[250px]'>
          <img className='w-full' src={data.poster_path === null ? 'https://mystiquemedicalspa.com/wp-content/uploads/2014/11/bigstock-159411362-Copy-1.jpg' : `https://image.tmdb.org/t/p/w500${data.poster_path}`}  alt='poster'/>
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <p className='sm:text-[24px] xs:text-[16px] text-[14px] mb-10 text_shadow_white text-black'>{data.overview}</p>
          <div className='flex sm:text-[18px] text-[14px] flex-row'>
            <p className=' text-gray-600 min-w-[100px]'>genres</p>
            <p className=' text-black'>{data.genres.map((genre, index) => (
              <span key={genre+index}>{genre.name}, </span>
            ))}</p>
          </div>

          
        </div>
        
      </div>
      
      <div className='container flex flex-col' id='pictures'>
          <h4 className='sm:text-[35px] xs:text-[25px] text-[20px] font-medium tracking-tighter uppercase'>{data.title} {type} pictures:</h4>
          <div className='parent'>
            {images.backdrops.slice(0,6).map((image, index) =>(
              <div className={`overflow-hidden image${index}`} key={`image${index}`} style={{gridArea: `image${index}`}}>
                <Link to={`/${type}/${movieId}/photos/${index}`}>
                <img className='ease-in-out duration-500 object-cover h-full w-full hover:scale-[1.1]' src={index === 0 | index === 5 ? `https://image.tmdb.org/t/p/original${image.file_path}` : `https://image.tmdb.org/t/p/w500${image.file_path}`} alt='image' />
                </Link>
              </div>
            ))}
              
          </div>
      </div>
      { trailer && 
        
        <div className='w-full bg-black flex flex-col justify-center items-center' >
        <div className='container flex flex-col justify-center items-center'>
        
          <div className='player-wrapper w-full'>
            <ReactPlayer
              className='react-player'
              url={`https://www.youtube.com/embed/${trailer.key}`}
              width='100%'
              height='100%'
              controls={true}
            />
          </div>
        </div>
      </div>
      }
      <h4 className='sm:text-[35px] xs:text-[25px] text-[20px] container font-medium tracking-tighter uppercase mt-10'>{type === 'tv' ? data.name : data.title} {type} cast:</h4>
      <div className='container flex flex-row items-center justify-center font-poppins relative' >
        <div className='w-[90%] flex flex-row gap-5 xs:gap-10 overflow-auto no-scrollbar touch-pan-x p-1 pb-2' ref={scrollRef}>
        {credits.cast.slice(0, 10).map(elem => (
          <div key={elem.credit_id} className='flex  xs:text-[18px] text-[12px] text-center flex-col min-w-[100px] max-w-[100px]  xs:min-w-[200px] items-center xs:max-w-[200px] gap-2 xs:gap-4 hover:bg-white hover:drop-shadow-md transition-all duration-200 cursor-pointer'>
            <Link className='flex flex-col xs:gap-4 gap-2' to={`/person/${elem.id}`}>
            <div className='w-full flex-1 overflow-hidden'>
              <img  className='w-full overflow-hidden hover:scale-110 transition-transform duration-200 ease-in-out' alt='profile'  src={elem.profile_path === null ? 'https://mystiquemedicalspa.com/wp-content/uploads/2014/11/bigstock-159411362-Copy-1.jpg' : `https://image.tmdb.org/t/p/w500${elem.profile_path}`} />
            </div>
            <p>{elem.name}</p>
            <p className='text-brownSandy mb-2'>{elem.character}</p>
            </Link>
          </div>
        ))}
        </div>
        <div className='absolute left-[10px] m-auto  max-w-[25px] max-h-[25px]  xs:max-w-[40px] xs:max-h-[40px] h-[40%] rounded-full flex justify-center items-center cursor-pointer transition hover:bg-brownSandy'>
            <AiOutlineLeft onClick={() => scroll('left')} className='h-full w-full'/>
        </div>
        <div className='absolute right-[10px] m-auto  max-w-[25px] max-h-[25px]  xs:max-w-[40px] xs:max-h-[40px] h-[40%]  rounded-full flex justify-center items-center cursor-pointer transition hover:bg-brownSandy'>
            <AiOutlineRight onClick={() => scroll('right')} className='h-full w-full'/>
        </div>
        
      </div>
      
    </div>
  )
}

export default MovieDetails