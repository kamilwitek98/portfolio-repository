import React, { useState} from 'react'
import { useGetImagesQuery } from '../../services/moviesApi';
import { useParams } from 'react-router-dom'
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';



const Photos = () => {
    const pathname = window.location.pathname;
    const type = pathname.split('/')[1];

    const {movieId, photoIndex} = useParams()
    const [currentPhoto, setCurrentPhoto] = useState(Number(photoIndex));
    const{data, isFetching: imagesLoading} = useGetImagesQuery({type: type, id: movieId});
    
    const scrollRef = React.useRef(null);

  
    const scroll = (direction) => {
        const { current } = scrollRef;

        if(direction === 'left'){
        current.scrollLeft -= current.offsetWidth;
        } else {
        current.scrollLeft += current.offsetWidth;
        }
    }

    if(imagesLoading) return 'Loading...'
    
    console.log(data)
    
    return (
    <div className='bg-black bottom-0 flex flex-col w-full h-[calc(100vh-50px)] justify-between items-center py-2 relative'>
        <div className='max-w-[1900px] h-[90%] flex justify-center'>
            <img className='object-contain' src={`https://image.tmdb.org/t/p/original/${data.backdrops[currentPhoto].file_path}`} alt='photo'/>
        </div>
        <div className='w-full bg-slate-900 h-[10%] flex flex-row items-center justify-center relative'>
            <div className='flex w-[90%] h-full flex-row items-center justify-center gap-2 overflow-hidden'  ref={scrollRef}>
                {data.backdrops.map((elem, index) => (
                    <div key={`${elem.file_path}`} className='h-[90%] min-w-[100px] w-[12%] bg-blue'>
                        <img src={`https://image.tmdb.org/t/p/w500${elem.file_path}`} alt='img' className='object-cover w-full h-full hover:opacity-70 transition-opacity duration-200 cursor-pointer' onClick={() => setCurrentPhoto(index)}/>
                    </div>
                ))}
            </div>
            <div className='absolute left-[10px] m-auto bg-slate-600 max-w-[40px] max-h-[40px] h-[40%] rounded-full flex justify-center items-center cursor-pointer transition hover:bg-brownSandy'>
                <AiOutlineLeft onClick={() => scroll('left')} className='h-full w-full'/>
            </div>
            <div className='absolute right-[10px] m-auto bg-slate-600 max-w-[40px] max-h-[40px] h-[40%]  rounded-full flex justify-center items-center cursor-pointer transition hover:bg-brownSandy'>
                <AiOutlineRight onClick={() => scroll('right')} className='h-full w-full'/>
            </div>
        </div>
        
        <div className='md:w-[40px] md:h-[40px] w-[25px] h-[25px] cursor-pointer hover:bg-brownSandy transition absolute top-[5%] right-[5%] rounded-full bg-whitePowder bg-opacity-80'>
        <Link to={`/${type}/${movieId}`}>
            <AiOutlineClose className='w-full h-full'/>
        </Link>
        </div>
    </div>
  )
}

export default Photos