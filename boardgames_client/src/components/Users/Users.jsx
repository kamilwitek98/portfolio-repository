import React from 'react'
import User from './User/User'
import { useGetUsersQuery } from '../../services/gamesApi';
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const {data: users, isLoading } = useGetUsersQuery();
    const navigate = useNavigate();
    

    if(isLoading) return <CircularProgress />

    if(users === undefined){
        navigate('/');
    }

    
    
  return (
    <div  className='w-full flex flex-col gap-4 font-poppins'>
        { users !== undefined &&
            <>
            <h2 className='text-[30px] font-medium underline'>Admins:</h2>
            <div className='flex flex-col gap-2'>
                {users.filter((user) => (user.isAdmin))
                .map((user) => (
                    <User user={user} key={user._id} />
                ))}
            </div>
            
            <h2 className='text-[30px] mt-10 font-medium underline'>Users:</h2>
            <div className='flex flex-col gap-2'>
            {users.filter((user) => (!user.isAdmin))
            .map((user) => (
                <User user={user} key={user._id} />
            ))}
            </div>
            
            </>
        }
        
    </div>
  )
}

export default Users