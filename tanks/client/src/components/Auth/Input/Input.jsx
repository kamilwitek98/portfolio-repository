import React from 'react'
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material'
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'
const Input = ({name, handleChange, isError, validatePassword, validateEmail, label, half, autoFocus, type, handleShowPassword}) => {
    
    
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField 
            name={name}
            error={validatePassword ? true : isError ? true : validateEmail  }
            onChange={handleChange}
            variant='outlined'
            helperText={ validatePassword ? "At least 6 characters, 1 upper, 1 special" : isError ? "Can't be empty" : validateEmail ? "Can't be longer than 255 chars" : " " }
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <MdVisibility /> : <MdVisibilityOff /> }
                        </IconButton>
                    </InputAdornment>
                )
            } : null}
        />
    </Grid>
  )
}

export default Input