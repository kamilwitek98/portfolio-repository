import React, { useState} from 'react'
import { Grid } from '@mui/material'
import Input from './Input/Input'
import { useSignInMutation, useSignUpMutation } from '../../services/gamesApi'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentToken } from '../../slices/authSlice';


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {

    const [isSignUp, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ signIn ] = useSignInMutation();
    const [ signUp ] = useSignUpMutation();

    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){
            signUp(formData).unwrap()
                .then(fullfilled => {
                    localStorage.setItem('profile', JSON.stringify(fullfilled))
                    console.log(JSON.parse(localStorage.getItem('profile')))
                    dispatch(setCurrentToken(fullfilled.token))
                    navigate('/');
                }).catch(rejected => console.log(rejected));
        } else {
            signIn(formData).unwrap()
                .then(fullfilled => {
                    localStorage.setItem('profile', JSON.stringify(fullfilled));
                    console.log(JSON.parse(localStorage.getItem('profile')));
                    dispatch(setCurrentToken(fullfilled.token))
                    navigate('/');
                }).catch(rejected => console.log(rejected));
        }

    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const switchMode = () => {
        setIsSignUp((prev) => !prev);
        setShowPassword(false);
    }

    

  return (
    <div className='max-w-[600px] p-4 rounded-md min-h-[200px] box_gradient fex flex-col items-center w-full justify-center font-poppins' >
        <h2 className='text-[30px] text-center mb-4'>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form className='w-full' onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {
                    isSignUp && (
                        <>
                            <Input name='firstName' label='firstName' handleChange={handleChange} autoFocus half />
                            <Input name='lastName' label='lastName' handleChange={handleChange} half />
                        </>
                    )
                }
                <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password' }  handleShowPassword={handleShowPassword}/>
                { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
            </Grid>
            <button className='w-full border mt-8 py-1 px-3 font-medium text-[25px] rounded-md border-blackCoffe transition duration-200 hover:bg-blackCoffe hover:text-white' type='submit'>{ isSignUp ? "Sign Up" : "Sign In" }</button>
            <div className='w-full justify-end flex  mt-5'>
                <button onClick={switchMode}>{ isSignUp ? 'Already have and account? Sign In' : "Don't have an account? Sign Up"}</button>
            </div>
        </form>
    </div>
  )
}

export default Auth