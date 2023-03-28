import React, { useState, useEffect } from 'react'
import { useGetPersonQuery, useGetPersonCombinedCreditsQuery } from '../../services/moviesApi'
import { useParams } from 'react-router-dom'
import './person.css';
import { AiFillStar, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { Loading } from '../index'

const Person = () => {
    const { personId } = useParams();
    const { data, isFetching } = useGetPersonQuery({ id: personId });
    const { data: credits, isFetching: creditsFetching } = useGetPersonCombinedCreditsQuery({ id: personId });
    const [allCredits, setAllCredits] = useState(false);

    
    
    const scrollRef = React.useRef(null);

    

    const scroll = (direction) => {
        const { current } = scrollRef;

        if(direction === 'left'){
        current.scrollLeft -= current.offsetWidth;
        } else {
        current.scrollLeft += current.offsetWidth;
        }
    }

    if( isFetching | creditsFetching ) return <Loading />

    console.log(data);
    console.log(credits);

    const compareFn = (a, b) => {
        if( a.popularity < b.popularity ){
            return 1;
        }
        if( a.popularity > b.popularity ){
            return -1;
        }
        return 0;
    }

    const orderedCredits = [...credits.cast].sort(compareFn);

    
    const dataUrodzenia = new Date(data.birthday);
    const dateNow = new Date();
    const creditsByDate = [...credits.cast].filter(elem => elem.release_date || elem.first_air_date )
    creditsByDate.sort(function(a, b){
        let bDate, aDate;
        if(a.media_type === 'tv'){
            aDate = a.first_air_date;
        }else{
             aDate = a.release_date
        }
        if(b.media_type === 'tv'){
             bDate = b.first_air_date;
        }else{
             bDate = b.release_date
        }
        return new Date(bDate) - new Date(aDate);
    })

    

    

  return (
    <div className='flex flex-col items-center bg-whitePowder font-poppins  gap-4'>
        <div className='w-full bg-black h-[300px] overflow-hidden p-4 flex gap-2 justify-between items-center flex-row ' >
            {orderedCredits.slice(0, 10).map((film, index) => (
                    <div key={index + film.credit_id } className='relative h-full min-w-[200px] poster-shadow'>
                        <img className='h-full blur-[3px] opacity-70 ' src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}  />
                    </div>

            ))}
        </div>
        <div className='container flex flex-col' >
            <div className='w-full flex flex-col  ss:flex-row gap-2 ss:gap-10 items-start mt-[-200px]'>
                <div className='flex flex-[0.4] max-w-[250px] ss:max-w-[400px] z-50  md:max-w-none md:min-w-[250px]'>
                    <img className='w-full object-contain'  src={data.profile_path === null ? 'https://mystiquemedicalspa.com/wp-content/uploads/2014/11/bigstock-159411362-Copy-1.jpg' : `https://image.tmdb.org/t/p/original${data.profile_path}`} alt='poster'/>
                </div>
                <div className='flex w-full flex-1 flex-col mt-0 ss:mt-16 gap-2'>
                    <div className='z-50 container flex flex-col w-full h-full justify-between mb-4'>
                        <div className='flex flex-col mb-[50px]'>
                            <p className='text-brownSandy font-bold tracking-tight text-[20px] leading-[28px] uppercase'>actor</p>
                            <h3 className='font-medium tracking-tight text-whitePowder text_shadow_black sm:text-[60px] sm:leading-[65px] leading-[45px] text-[35px] font-poppins '>{data.name}</h3>
                        </div>

                        <div className='flex flex-1 flex-col gap-2'>
                        <p className='sm:text-[20px] xs:text-[16px] text-[14px] mb-10 text_shadow_white text-black'>{data.biography}</p>
                            <div className='flex sm:text-[18px] text-[14px] flex-row'>
                                <p className=' text-gray-600 min-w-[130px]'>place of birth:</p>
                                <p className=' text-black'>{data.place_of_birth}</p>
                            </div>

                            <div className='flex sm:text-[18px] text-[14px] flex-row'>
                                <p className=' text-gray-600 min-w-[130px]'>age:</p>
                                <p className=' text-black'>{dateNow.getFullYear() - dataUrodzenia.getFullYear()}</p>
                            </div>

                            <div className='flex sm:text-[18px] text-[14px] flex-row'>
                                <p className=' text-gray-600 min-w-[130px]'>date of birth: </p>
                                <p className='text-black'>{format(dataUrodzenia, 'MMMM dd, yyyy')}</p>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
            

            <h4 className='sm:text-[35px] xs:text-[25px] text-[20px] font-medium tracking-tighter uppercase mt-20'>Known from:</h4>
            <div className='container flex flex-row items-center justify-center font-poppins relative' >
                <div className='w-[90%] flex flex-row gap-5 xs:gap-10 overflow-auto no-scrollbar touch-pan-x p-1 pb-2 ' ref={scrollRef}>
                {orderedCredits.slice(0, 10).map(elem => (
                <div key={elem.credit_id} className='flex  xs:text-[18px] text-[12px] text-center flex-col min-w-[100px] max-w-[100px]  xs:min-w-[200px] items-center xs:max-w-[200px] gap-2 xs:gap-4 hover:bg-white hover:drop-shadow-md transition-all duration-200 cursor-pointer'>
                    <Link className='flex flex-col xs:gap-4 gap-2' to={`/${elem.media_type}/${elem.id}`}>
                    <div className='w-full flex-1 overflow-hidden'>
                    <img  className='w-full overflow-hidden hover:scale-110 transition-transform duration-200 ease-in-out' alt='profile'  src={elem.poster_path === null ? 'https://mystiquemedicalspa.com/wp-content/uploads/2014/11/bigstock-159411362-Copy-1.jpg' : `https://image.tmdb.org/t/p/w500${elem.poster_path}`} />
                    </div>
                    <p>{elem.media_type === 'tv' ? elem.name : elem.title}</p>
                    
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
            <div className='container flex flex-col mt-10'>
                {creditsByDate.slice(0, (allCredits ? creditsByDate.length : 10 )).map((elem, index) => (
                    <Link key={elem.id + elem.credit_id + index} className='flex flex-col' to={`/${elem.media_type}/${elem.id}`}>
                    <div  className='flex font-poppins flex-row p-2 gap-2 xs:gap-5 ss:gap-10 border-b'>
                        <div className='flex flex-col text-md xs:text-xl font-medium justify-center'>
                            <p>{elem.media_type === 'tv' ? new Date(elem.first_air_date).getFullYear() :  new Date(elem.release_date).getFullYear()}</p>
                        </div>
                        <div className=' flex-1 overflow-hidden min-w-[80px] max-w-[80px] xs:max-w-[100px]'>
                            <img  className='w-full overflow-hidden hover:scale-110 transition-transform duration-200 ease-in-out' alt='profile'  src={elem.poster_path === null ? 'https://mystiquemedicalspa.com/wp-content/uploads/2014/11/bigstock-159411362-Copy-1.jpg' : `https://image.tmdb.org/t/p/w500${elem.poster_path}`} />
                        </div>
                        <div className='flex flex-1 flex-col justify-between'>
                            <div className='flex flex-col'>
                                <p className='text-sm xs:text-md uppercase text-brownSandy font-bold '>{elem.media_type}</p>
                                <p className='text-md xs:text-xl'>{elem.media_type === 'tv' ? elem.name : elem.title}</p>
                            </div>
                            <p className='text-sm xs:text-md'>{elem.character}</p>
                        </div>
                    </div>
                    </Link>
                ))}
                <div className='w-full flex items-center justify-center'>
                    { creditsByDate.length > 10 &&
                        <button className='w-full border border-brownSandy p-2 mt-5 hover:text-brownSandy font-medium text-lg max-w-[300px]' onClick={() => setAllCredits(prev => !prev)}>{ allCredits ? 'Hide' : 'Show All'}</button>
                    }
                
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Person