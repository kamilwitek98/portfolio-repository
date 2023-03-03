import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import { format } from 'date-fns'
import { Form } from '../../index'
import { useDeleteTankMutation } from '../../../services/tanksApi'
import { useLocation } from 'react-router-dom';

const Tank = ({tank, tags, isGray}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [ deleteTank ] = useDeleteTankMutation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
      }, [location])

  return (
    <>
        {tags.map((elem, index) => (
            <Grid item xs={elem.gridArea} key={"ELEMENTS" +index} className={`border py-1  ${isGray % 2 ? 'bg-slate-100': 'bg-whitePowder'}`} >
                <div className='flex items-center h-full text-[12px] justify-center w-full'>
                    
                        {elem.mongoName === "updateDate" || elem.mongoName === "createdAt" || elem.mongoName === "introductionDate" || elem.mongoName === "year"
                        ? elem.mongoName === 'year' ? <p className='text-center'>{new Date(tank.year).getFullYear()}</p> : <p className='text-center'>{format((new Date(tank[elem.mongoName])), 'yyyy-MM-dd')}</p>
                        : typeof tank[elem.mongoName] === "object" 
                            ? <p className='text-center'>{tank[elem.mongoName].join('/')}</p>
                            :  elem.mongoName === "buttons" 
                                ? <div className='flex w-full justify-around'>
                                    <button type='button' disabled={!user} onClick={() => setIsEdit(prev => !prev)} className='font-popins transition duration-100 disabled:opacity-50 h-[25px] w-[42px]  text-[11px] disabled:hover:bg-slate-200  rounded bg-slate-200 border border-slate-300 hover:bg-slate-100 tracking-tighter  font-semibold text-blackCoffe'>{isEdit ? "Cancel" : "Edit"}</button>
                                    <button type='button' disabled={!user} onClick={ async () => deleteTank(tank._id)} className='font-popins transition duration-100 h-[25px] w-[42px] disabled:opacity-50 disabled:hover:bg-red-300  rounded bg-red-300 border text-[11px] border-slate-300 hover:bg-red-100  font-semibold text-blackCoffe tracking-tighter'>Delete</button>
                                </div>
                                :<p className='text-center'>{tank[elem.mongoName]}</p>}
                    
                </div>
                
            </Grid>

        ))}
        
        {isEdit && 
            <Grid item xs={12}>
                <div className='w-full border relative pt-5 px-2'>
                    <div className='max-w-[90vw] sm:max-w-[80vw] left-0 right-0 m-auto xl:max-w-none sticky'>
                        <Form changeIsEdit={isEdit => setIsEdit(isEdit)}  tank={tank} />
                    </div>
                </div>
                
            </Grid>
        }
    </>
  )
}

export default Tank