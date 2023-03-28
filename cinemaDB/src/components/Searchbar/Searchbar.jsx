import React, {useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { AiOutlineClose } from 'react-icons/ai';
import {  useLazyGetSearchQuery } from '../../services/moviesApi';
import { Link } from 'react-router-dom';

const Searchbar = () => {

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchOutput, setSearchOutput] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [trigger, result, lastPromiseInfo] = useLazyGetSearchQuery()
    useEffect(() => {
        if(result.isSuccess && result.isFetching === false){
            setSearchData(result.data.results);
            console.log(result);
            setSearchOutput(true);
        }
    }, [result])
    
    let timer;

    const search = (text) => {
        console.log(text);
        // TODO: Make HTTP Request HERE
         trigger({search: text});
        
    };

    const handleInput = (e) => {
        
        if(e.target.value.length !== 0){
            clearTimeout(timer);
            
            timer = setTimeout(() => {
                search(e.target.value);
            }, 2000);
        }
        
    }

    
  return (
    <>
    <div className='flex-[0.8] flex relative'>
        <div className='bg-white ss:flex hidden flex-row w-full p-1 rounded'>
            <BsSearch className='w-[45px] h-[30px] pr-[5px] text-black border-r cursor-pointer'/>
            <input  
            onBlur={() => {
                setTimeout(() => {
                    setSearchOutput(false);
                }, 100);
            }}
            onFocus={() => {
                if(searchData.length){
                    setSearchOutput(true)
                }
            }} 
            onChange={(e) => handleInput(e)} className='text-[20px] text-black ml-2 focus:outline-none' type='text' placeholder='Search Cinema DB' name='searchbar' />
        </div>
        <div className='flex ss:hidden rounded flex-row h-[40px] w-full justify-end items-center'>
            <BsSearch onClick={() => setSearchOpen(prev => !prev)} className='w-[40px] h-[40px] p-1 rounded bg-whitePowder text-black cursor-pointer' />
            
                
            
        </div>
        {searchOutput &&
            <div className='absolute ss:flex hidden overflow-y-auto p-2 gap-2 bg-whitePowder touch-pan-y max-h-[400px] z-[100] w-full top-[40px] flex-col rounded'>
            {searchData.slice(0, 10).map((elem, index) => (
                <Link className='flex cursor-pointer' key={'search_' + elem.id} to={`/${elem.media_type}/${elem.id}`}>
                <div className='flex flex-row h-[120px] gap-4   border-b last:pb-0 last:border-none pb-2'  >
                    <img className='h-full' alt='poster'
                        src={elem.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${elem.poster_path}` 
                        : elem.profile_path 
                            ?  `https://image.tmdb.org/t/p/w500${elem.profile_path}` 
                            :  'https://mystiquemedicalspa.com/wp-content/uploads/2014/11/bigstock-159411362-Copy-1.jpg' } />
                    
                    <div className='flex flex-col justify-between'>
                        <div>
                            <p className='text-sm font-bold text-brownSandy uppercase'>{elem.media_type}</p>
                            <p className='text-xl text-black'>{elem.media_type === 'movie' ? elem.title : elem.name }</p>
                        </div>
                        {elem.media_type !== 'person' && 
                            <p className='text-black text-lg'>{elem.media_type === 'tv' ? new Date(elem.first_air_date).getFullYear() : new Date(elem.release_date).getFullYear() }</p>
                        }
                        
                    </div>
                    
                </div>
                </Link>
            ))}
            <div className='absolute z-[1000] w-[50px] h-[50px] top-0 right-0'>
                <AiOutlineClose onClick={() => setSearchOutput(false)} className='w-full h-full text-black' />
            </div>
        </div>
        }
            
    </div>
    {searchOpen && 
        <div className='absolute top-0 right-0 left-0 w-full bg-white flex flex-row h-[49px] p-1 rounded items-center'>
            <input
            onBlur={() => {
                setTimeout(() => {
                    setSearchOutput(false);
                }, 100);
            }}
            onFocus={() => {
                if(searchData.length){
                    setSearchOutput(true)
                }
            }}
            onChange={(e) => handleInput(e)} 
            className='  text-[15px]  text-black ml-2 focus:outline-none w-full' type='text' placeholder='Search Cinema DB' name='searchbar' />
            <GrFormClose className='h-[30px] min-w-[30px] w-[30px] pl-2 border-l border-slay-200 mr-2' onClick={() => setSearchOpen(false)}/>
        </div>
    }
    {searchOutput &&
            <div className='absolute ss:hidden flex overflow-y-auto left-0 p-2 gap-2 bg-whitePowder max-h-[400px] z-[100] w-full top-[50px] flex-col rounded'>
            {searchData.slice(0, 10).map((elem, index) => (
                <Link className='flex cursor-pointer' to={`/${elem.media_type}/${elem.id}`}>
                <div className='flex flex-row h-[120px] gap-4   border-b last:pb-0 last:border-none pb-2' key={'search_' + elem.id} >
                    <img className='h-full' alt='poster'
                        src={elem.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${elem.poster_path}` 
                        : elem.profile_path 
                            ?  `https://image.tmdb.org/t/p/w500${elem.profile_path}` 
                            :  'https://mystiquemedicalspa.com/wp-content/uploads/2014/11/bigstock-159411362-Copy-1.jpg' } />
                    
                    <div className='flex flex-col justify-between'>
                        <div>
                            <p className='text-sm font-bold text-brownSandy uppercase'>{elem.media_type}</p>
                            <p className='text-xl text-black'>{elem.media_type === 'movie' ? elem.title : elem.name }</p>
                        </div>
                        {elem.media_type !== 'person' && 
                            <p className='text-black text-lg'>{elem.media_type === 'tv' ? new Date(elem.first_air_date).getFullYear() : new Date(elem.release_date).getFullYear() }</p>
                        }
                        
                    </div>                    
                </div>
                </Link>

            ))}
            <div className='absolute z-[1000] w-[50px] h-[50px] top-0 right-0'>
                <AiOutlineClose onClick={() => setSearchOutput(false)} className='w-full h-full text-black' />
            </div>
        </div>
        }
    
    </>
  )
}

export default Searchbar