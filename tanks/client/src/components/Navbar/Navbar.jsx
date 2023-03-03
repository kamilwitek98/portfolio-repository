import React, { useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode'
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
    <nav className='outContainer bg-blueDeep'>
        <div className='h-[50px] xs:h-[60px] gap-2 max-w-[1900px] w-full px-[0.3rem] ss:px-[2rem] flex font-poppins items-center justify-between'>
            <Link to='/'>
                <div className='flex gap-1 flex-row'>
                    <p className='text_gradient text-[30px] xs:text-[40px] font-semibold text-whitePowder leading-none tracking-tighter '>Tanks</p>
                </div>
            </Link>
            {user ? 
            <div className=' flex flex-row gap-4 xs:gap-10 items-center text-blackRich'>
                <p className='text-lg xs:block hidden text-[15px] text-white text-center leading-[20px] xs:text-[20px] border-b border-whitePowder'>{user.result.name}</p>
                <button onClick={logout} className='border py-1 px-3 hover:bg-slate-100 font-medium rounded-md border-blackCoffe transition duration-100 bg-whitePowder  '>Sign Out</button>
            </div>
            :
            <Link to='/auth'>
            <button  className='border py-1 px-3  font-medium rounded-md hover:bg-slate-100 border-blackCoffe transition duration-100 bg-whitePowder  '>Sign In</button>
            </Link>
            }
        </div>
    </nav>
  )
}

export default Navbar