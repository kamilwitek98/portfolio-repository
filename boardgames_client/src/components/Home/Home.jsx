import React, { useState, useEffect } from 'react'
import { AnimateSharedLayout } from 'framer-motion';
import { Games } from '../'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setUpdatedGame } from '../../slices/updatedGameSlice';


const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  const dispatch = useDispatch();
  const currentToken = useSelector(
    (state) => state.token.token
  );

  useEffect(() => {
   
    setUser(JSON.parse(localStorage.getItem('profile')));
    dispatch(setUpdatedGame({}));
  }, [location, currentToken, dispatch])
  
  const handleUserId = () => {
    if(userId === ''){
      setUserId(user.result._id);
    }else{
      setUserId('');
    }
    console.log(userId);
  }
  
  return (
    <div className='justify-center items-center flex-col w-full'>
      <div className='flex mb-4 mt-4 ss:mt-10 gap-2 flex-col-reverse ss:flex-row items-center ss:justify-between font-poppins'>
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search...' className='py-2 px-4 rounded-md bg-whitePowder text-[17px] w-full ss:w-auto ss:text-[20px] text-blackRich' />
        { user ? 
        <div className='flex justify-center flex-row gap-2'>
          <button onClick={handleUserId}
          className='border py-1 px-3 text-[20px] font-medium rounded-md border-blackCoffe transition duration-200 hover:bg-blackCoffe hover:text-white'>{userId === '' ? 'My Games' : 'Show All'}</button>
          <Link to='/addgame'><button  className='border h-full py-1 px-3 text-[20px] font-medium rounded-md border-blackCoffe transition duration-200 hover:bg-blackCoffe hover:text-white'>Add Game</button></Link> 
          { user.result.isAdmin &&
            <Link to='/users'><button  className='border h-full py-1 px-3 text-[20px] font-medium rounded-md border-blackCoffe transition duration-200 hover:bg-blackCoffe hover:text-white'>Users</button></Link> 
          }
        </div>
        
        : <Link to='/auth'><button className='border py-1 px-3 text-[20px] font-medium rounded-md border-blackCoffe transition duration-200 hover:bg-blackCoffe hover:text-white'>Sign In to Add Game</button></Link>}
       
      </div>
      <AnimateSharedLayout >
        
        <Games searchTerm={searchTerm} userId={userId} />
      </AnimateSharedLayout>
    </div>
  )
}

export default Home