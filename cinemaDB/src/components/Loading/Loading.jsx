import React from 'react'
import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <div className='flex w-full items-center justify-center min-h-[calc(100vh-350px)]'>
        <CircularProgress className='w-[50%] h-[50%]' />
    </div>
  )
}

export default Loading