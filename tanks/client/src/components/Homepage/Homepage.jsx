import React, { useState, useEffect } from 'react';
import { Tanks, Form } from '../index';
import { useLocation } from 'react-router-dom';

const Homepage = () => {
  const [isForm, setIsForm] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
      }, [location])

  return (
    <div className=' flex justify-center items-center flex-col w-full gap-2'>
        <div className='w-full flex justify-end'>
        <button disabled={!user} type='button' onClick={() => setIsForm(prev => !prev)} className='border py-1 px-3 text-[14px] disabled:opacity-50  font-medium rounded-md hover:bg-slate-100 border-blackCoffe transition duration-100 bg-whitePowder  '>{ isForm ? "Hide Form" : "Add Tank"}</button>
        </div>
        { isForm && 
        <Form />
        }
        
        <Tanks />
    </div>
  )
}

export default Homepage