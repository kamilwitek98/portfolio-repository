import React, { useState, useEffect, useCallback } from 'react'
import logoIcon from '../../images/dice.png';
import './style.css';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentToken } from '../../slices/authSlice';


const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const currentToken = useSelector(
        (state) => state.token.token
    );
    
    const logout = useCallback(() => {
        setUser(null);
        dispatch(setCurrentToken(''));
        localStorage.clear();
        navigate('/');
    }, [dispatch, navigate]);

    useEffect(() => {
      if(currentToken){
        const decodedToken = decode(currentToken);

        if(decodedToken.exp * 1000 < new Date().getTime()){
            logout();
        }
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, logout, currentToken])

    
    


  return (
    <nav className='outContainer box_gradient bg-whitePowder'>
        <div className='h-[50px] xs:h-[80px] gap-2 max-w-[1900px] w-full px-[0.3rem] ss:px-[2rem] flex font-poppins items-center justify-between'>
            <Link to='/'>
                <div className='flex gap-1 flex-row'>
                    <img src={logoIcon} alt='logo' className='w-[40px] h-[40px] xs:w-[60px] xs:h-[60px]' />
                    <p className='text_gradient text-[40px] xs:text-[60px] leading-none font-black tracking-tighter '>BG</p>
                </div>
            </Link>
            {user ? 
            <div className=' flex flex-row gap-4 xs:gap-10 items-center text-blackRich'>
                <p className='text-lg text-[15px] text-center leading-[20px] xs:text-[20px] border-b border-whitePowder'>{user.result.name}</p>
                <button onClick={logout} className='border text-[15px] leading-[17px] xs:leading-[25px] xs:text-[20px] py-1 px-3 font-medium rounded-md border-blackCoffe transition duration-200 hover:bg-blackCoffe hover:text-white'>Sign Out</button>
            </div>
            :
            <Link to='/auth'>
            <button  className='border py-1 px-3 font-medium rounded-md border-blackCoffe transition duration-200 hover:bg-blackCoffe hover:text-white'>Sign In</button>
            </Link>
            }
            
        </div>
    </nav>
  )
}

export default Navbar