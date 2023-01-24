import React from 'react'
import { useUpdateUserMutation } from '../../../services/gamesApi'

const User = ({user}) => {
    const [ updateUser ] = useUpdateUserMutation();

  return (
    <div  className='border rounded-xl flex flex-col sm:flex-row items-center gap-2 p-5 font-poppins'>
        <div className='flex flex-col ss:flex-row flex-1 w-full'>
            <div className='flex flex-row gap-4 flex-1'>
                <p className='text-[16px] xs:text-[20px]'>Name:</p>
                <p className='text-[16px] xs:text-[20px] font-medium'>{user.name}</p>
            </div>
            <div className='flex flex-row gap-4 flex-1'>
                <p className='text-[16px] xs:text-[20px]'>Email:</p>
                <p className='text-[16px] xs:text-[20px] font-medium'>{user.email}</p>
            </div>
        </div>
        <div className='flex sm:flex-[0.5] justify-end  w-full'>
            <button onClick={() => updateUser(user._id)} className='border py-1 px-3 font-medium rounded-md border-blackCoffe transition duration-200 hover:bg-blackCoffe hover:text-white' >{user.isAdmin ? 'Take Admin' : 'Make Admin'}</button>
        </div>
        
    </div>
  )
}

export default User