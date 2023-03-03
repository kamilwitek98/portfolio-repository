import React, { useState} from 'react'
import { Grid, Checkbox, FormGroup, FormControlLabel } from '@mui/material'
import Input from './Input/Input'
import { useSignInMutation, useSignUpMutation } from '../../services/tanksApi'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentToken } from '../../slices/authSlice';



const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    atomicButton: false
}


const Auth = () => {
    const [isError, setIsError] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [serverErrror, setServerErrror] = useState(' ')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ signIn ] = useSignInMutation();
    const [ signUp ] = useSignUpMutation();

    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){
            if(formData.password === formData.confirmPassword){
                setPasswordsMatch(false);
            }
            
            if(!Object.values(formData).filter(elem => typeof elem === 'string').every((elem) => !!elem === true) || !vPass(formData.password) || formData.email.length > 254){
                setIsError(true);
            } else if(formData.password !== formData.confirmPassword){
                setPasswordsMatch(true);
            } else {
                console.log(!Object.values(formData).filter(elem => typeof elem === 'string').every((elem) => !!elem === true));
                
                console.log(formData);
                
                signUp(formData).unwrap()
                    .then(fullfilled => {
                        localStorage.setItem('profile', JSON.stringify(fullfilled))
                        console.log(JSON.parse(localStorage.getItem('profile')))
                        dispatch(setCurrentToken(fullfilled.token))
                        navigate('/');
                    }).catch(rejected => {
                        console.log(rejected)
                        setServerErrror(rejected.data.message);
                    });
            }
        } else {
            signIn(formData).unwrap()
                .then(fullfilled => {
                    localStorage.setItem('profile', JSON.stringify(fullfilled));
                    console.log(JSON.parse(localStorage.getItem('profile')));
                    dispatch(setCurrentToken(fullfilled.token))
                    navigate('/');
            }).catch(rejected => {
                console.log(rejected)
                setServerErrror(rejected.data.message);
            });
        }

    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const validate = (element) => {
        if(isError){
            // console.log(formData[element]);
            return !formData[element]
        }
        return false;
    }
    const vPass = (password) => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const upperChars = /[A-Z]/;
        return specialChars.test(password) && upperChars.test(password) && password.length > 4
    }

    const validatePassword = (password) => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const upperChars = /[A-Z]/;
        if(isError && specialChars.test(password) && upperChars.test(password) && password.length > 4){
            return false;
        } else if(isError){
            return true;
        }
    }

    const validateEmail = (email) => {
        if(isError &&  email.length > 254){  
            return true;
        }
    }

    const switchMode = () => {
        setIsSignUp((prev) => !prev);
        setShowPassword(false);
        setServerErrror(" ")
    }

    

  return (
    <div className='max-w-[600px] auth p-4 rounded-md min-h-[200px] box_gradient fex flex-col items-center w-full justify-center font-poppins' >
        <h2 className='text-[30px] text-center mb-4'>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form noValidate className='w-full' onSubmit={handleSubmit}>
            <Grid container rowSpacing={0.5} columnSpacing={2}>
                {
                    isSignUp && (
                        <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} isError={validate('firstName')} autoFocus half />
                            <Input name='lastName' label='Last Name' handleChange={handleChange} isError={validate('lastName')} half />
                            <Input name='country' label='Country' handleChange={handleChange} isError={validate('country')} half />
                            <Grid item xs={12} sm={6}>
                                <div className='w-full flex items-center h-[50px]'>
                                <FormControlLabel className='' control={<Checkbox checked={formData.atomicButton} onChange={(e) => setFormData({ ...formData, atomicButton: e.target.checked})} />} label={<p className='text-[18px]'>Atomic Button</p>} />  
                                </div>
                            </Grid>
                        </>
                    )
                }
                <Input name='email' label='Email Address' handleChange={handleChange} isError={validate('email')} validateEmail={validateEmail(formData.email)} type='email' />
                <Input name='password' label='Password' handleChange={handleChange} isError={validate('password')} validatePassword={validatePassword(formData.password)} type={showPassword ? 'text' : 'password' }  handleShowPassword={handleShowPassword}/>
                { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} isError={validate('confirmPassword')} type='password' />}
            </Grid>
            <div className='h-[12px] w-full'>
            <p className='text-[10px] text-red-600 ml-[14px]'>{serverErrror}</p>
                {passwordsMatch && 
                    <p className='text-[10px] text-red-600 ml-[14px]'>Passwords don't match</p>
                }
            </div>
            
            <button className='w-full border mt-8 py-1 px-3 font-medium text-[25px] rounded-md hover:bg-slate-100 border-blackCoffe transition duration-100 bg-whitePowder' type='submit'>{ isSignUp ? "Sign Up" : "Sign In" }</button>
            <div className='w-full justify-end flex  mt-5'>
                <button type='button' onClick={switchMode}>{ isSignUp ? 'Already have and account? Sign In' : "Don't have an account? Sign Up"}</button>
            </div>
        </form>
    </div>
  )
}

export default Auth