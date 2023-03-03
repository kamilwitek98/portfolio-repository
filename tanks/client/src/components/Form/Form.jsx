import React, { useState, useEffect } from 'react'
import { Grid, TextField, InputAdornment, Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useCreateTankMutation, useUpdateTankMutation } from '../../services/tanksApi';



const Form = ({tank, changeIsEdit}) => {

  const [formProps, setFormProps] = useState({
    sideNumber: '',
    producer: '',
    model: '',
    curMod: '',
    year: new Date(),
    introductionDate: new Date(),
    mileage: '',
    ammoCount: '',
    armorFront: '',
    armorSide: '',
    armorBack: '',
  })

  const [isError, setIsError] = useState(false);

  const [addTank] = useCreateTankMutation();
  const [updateTank] = useUpdateTankMutation();

  useEffect(() => {
    if(tank){
      setFormProps({
        sideNumber: tank.sideNumber,
        producer: tank.producer,
        model: tank.model,
        curMod: tank.curMod,
        year: new Date(tank.year),
        introductionDate: new Date(tank.introductionDate),
        mileage: tank.mileage,
        ammoCount: tank.ammoCount,
        armorFront: tank.armor[0],
        armorSide: tank.armor[1],
        armorBack: tank.armor[2],
      })
      console.log(tank);
      
    }
  }, [])
  
  const handleSubmit = (e) =>{
    e.preventDefault();

    console.log(!Object.values(formProps).every((v) => !!v === true) || formProps.ammoCount < 0 || formProps.mileage < 0 || formProps.introductionDate > new Date()  || formProps.introductionDate < dayjs('1970-01-01') || formProps.year > new Date()  || formProps.year < dayjs('1900-01-01') || formProps.armorBack < 0 || formProps.armorFront < 0 || formProps.armorSide < 0 )
    if(!Object.values(formProps).every((v) => !!v === true) || formProps.ammoCount < 0 || formProps.mileage < 0 || formProps.introductionDate > new Date()  || formProps.introductionDate < dayjs('1970-01-01') || formProps.year > new Date()  || formProps.year < dayjs('1900-01-01') || formProps.armorBack < 0 || formProps.armorFront < 0 || formProps.armorSide < 0){
       setIsError(true);
    }else{
      const patch = {
        sideNumber: formProps.sideNumber,
        producer: formProps.producer,
        model: formProps.model,
        curMod: formProps.curMod,
        year: formProps.year,
        introductionDate: formProps.introductionDate,
        mileage: Number(formProps.mileage),
        ammoCount: Number(formProps.ammoCount),
        armor: [Number(formProps.armorFront), Number(formProps.armorSide), Number(formProps.armorBack)]
      }
      if(tank){
        updateTank({id: tank._id, patch: patch});
        changeIsEdit(false);
      }else{
        addTank(patch);
      }
      clear()
    }
  }

  

  const isNumberValid = (e) => {
    return e < 0;
  }

  const isNotEmpty = (e) => {
    
    return  !!e || parseInt(e) == 0  ;
  }

  const clear = () => {
    setFormProps({
      sideNumber: '',
      producer: '',
      model: '',
      curMod: '',
      year: new Date(),
      introductionDate: new Date(),
      mileage: '',
      ammoCount: '',
      armorFront: '',
      armorSide: '',
      armorBack: '',
    })
    setIsError(false);
  }

  const textFieldStyles = {style: {fontSize: 12}}


  return (
    <Box component='form'  autoComplete='off' noValidate onSubmit={handleSubmit}>

    
    <Grid container  rowSpacing={0} columnSpacing={1}  className='text-[10px]  ss:pb-0 pb-5'  >
      <Grid item xl={1} md={2} sm={3} xs={6}>
        <TextField 
         inputProps={textFieldStyles} // font size of input text
         InputLabelProps={textFieldStyles}
        error={isError ? !isNotEmpty(formProps.sideNumber) : false}
        helperText={!isNotEmpty(formProps.sideNumber) && isError ? "Pole nie może być puste" : " "}
        size='small' name='sideNumber' label='Numer boczny' variant='outlined' required value={formProps.sideNumber} onChange={(e) => setFormProps({ ...formProps, sideNumber: e.target.value})} type='text' fullWidth/>
      </Grid>
      <Grid item xl={1} md={2} sm={3} xs={6}>
        <TextField 
        inputProps={textFieldStyles} // font size of input text
        InputLabelProps={textFieldStyles}
        error={isError ? !isNotEmpty(formProps.producer) : false}
        helperText={!isNotEmpty(formProps.producer) && isError ? "Pole nie może być puste" : " "}
        size='small' name='producer' label='Producent' variant='outlined' required value={formProps.producer} onChange={(e) => setFormProps({ ...formProps, producer: e.target.value})} type='text' fullWidth/>
      </Grid>
      <Grid item xl={1} md={2} sm={3} xs={6}>
        <TextField
        inputProps={textFieldStyles} // font size of input text
        InputLabelProps={textFieldStyles}
        helperText={!isNotEmpty(formProps.model) && isError ? "Pole nie może być puste" : " "}
        error={isError ? !isNotEmpty(formProps.model) : false}
        size='small' name='model' label='Model' variant='outlined' required value={formProps.model} onChange={(e) => setFormProps({ ...formProps, model: e.target.value})} type='text' fullWidth/>
      </Grid>
      <Grid item xl={1} md={2} sm={3} xs={6}>
        <TextField 
        inputProps={textFieldStyles} // font size of input text
         InputLabelProps={textFieldStyles}
        error={isError ? !isNotEmpty(formProps.curMod) : false}
        helperText={!isNotEmpty(formProps.curMod) && isError ? "Pole nie może być puste" : " "}
        size='small' name='curMod' label='Aktualna modyfikacja' variant='outlined' required value={formProps.curMod} onChange={(e) => setFormProps({ ...formProps, curMod: e.target.value})} type='text' fullWidth/>
      </Grid>
      <Grid item xl={1} md={2} sm={3} xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker 
            minDate={dayjs('1900-01-01')}
            maxDate={dayjs(new Date())}
            views={['year']}
            label="Rocznik"
            inputProps={textFieldStyles} // font size of input text
         
            value={formProps.year}
            onChange={(e) => setFormProps({ ...formProps, year: e})}
            renderInput={(params) => <TextField required size='small' {...params} 
            helperText={ formProps.year > new Date()  || formProps.year < dayjs('1900-01-01') ? (formProps.year < dayjs('1900-01-01') ? "Od roku 1900" : "Maksymalnie do dzisiaj") : !isNotEmpty(formProps.year) && isError ? "Pole nie może być puste" : " "}
            error={ formProps.year > new Date()  || formProps.year < dayjs('1900-01-01') ? true : isError ? !isNotEmpty(formProps.year) : false}  InputLabelProps={textFieldStyles} fullWidth/>}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xl={1} md={2} sm={3} xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            
            minDate={dayjs('1970-01-01')}
            maxDate={dayjs(new Date())}
            label="Data wprowadzenia do kraju"
            value={formProps.introductionDate}
            inputProps={textFieldStyles} // font size of input text
            InputAdornmentProps={textFieldStyles}
            InputLabelProps={textFieldStyles}
            onChange={(e) => setFormProps({ ...formProps, introductionDate: e})}
            renderInput={(params) => <TextField required size='small' {...params}
            helperText={ formProps.introductionDate > new Date()  || formProps.introductionDate < dayjs('1970-01-01') ? (formProps.introductionDate < dayjs('1970-01-01') ? "Od roku 1970" : "Maksymalnie do dzisiaj") :!isNotEmpty(formProps.introductionDate) && isError ? "Pole nie może być puste" : " "}
            error={ formProps.introductionDate > new Date()  || formProps.introductionDate < dayjs('1970-01-01') ? true : isError ? !isNotEmpty(formProps.introductionDate) : false} InputLabelProps={textFieldStyles} fullWidth  />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xl={1} md={2} sm={3} xs={6}>
        <TextField size='small' InputProps={{
            endAdornment: <InputAdornment  position="end">km</InputAdornment>,
            style: {fontSize: 12}
          }}
            inputProps={{ min: 0, style: {fontSize: 12} }}
            InputLabelProps={textFieldStyles}
            error={isNumberValid(formProps.mileage) ? true  : isError ? !isNotEmpty(formProps.mileage) : false }
            helperText={isNumberValid(formProps.mileage) ? "Nie może być mniejszy od 0" : (!isNotEmpty(formProps.mileage) && isError) ? "Pole nie moze byc puste" : " "}
            name='mileage' label='Przebieg' variant='outlined'  required value={formProps.mileage} onChange={(e) => setFormProps({ ...formProps, mileage: e.target.value})} type='number' fullWidth/>
      </Grid>
      <Grid item xl={1} md={2} sm={3} xs={6}> 
        <TextField
        InputLabelProps={textFieldStyles}
        error={isNumberValid(formProps.ammoCount) ? true  : isError ? !isNotEmpty(formProps.ammoCount) : false}
        helperText={isNumberValid(formProps.ammoCount) ? "Nie może być mniejsza od 0" : (!isNotEmpty(formProps.ammoCount) && isError) ? "Pole nie moze byc puste" : " "}
        size='small' inputProps={{ min: 0, style: {fontSize: 12} }} name='ammoCount' label='Ilość amunicji' variant='outlined' required value={formProps.ammoCount} onChange={(e) => setFormProps({ ...formProps, ammoCount: e.target.value})} type='number' fullWidth/>
      </Grid>
      <Grid item xl={3} md={6} sm={8} xs={12}>
        <div className='flex flex-row gap-2 text-12'>
          
          <TextField  fullWidth
          InputProps={{
            endAdornment: <InputAdornment  position="end">mm</InputAdornment>,
            style: {fontSize: 12}
          }}
          InputLabelProps={textFieldStyles}
          error={isNumberValid(formProps.armorFront) ? true  : isError ? !isNotEmpty(formProps.armorFront) : false}
          helperText={isNumberValid(formProps.armorFront) ? "Nie może być mniejsza od 0" : (!isNotEmpty(formProps.armorFront) && isError) ? "Pole nie moze byc puste" : " "}
          size='small' inputProps={{ min: 0, style: {fontSize: 12} }} name='armorFront' label='Armor Front' variant='outlined' required value={formProps.armorFront} onChange={(e) => setFormProps({ ...formProps, armorFront: e.target.value})} type='number' />
               
          <TextField fullWidth
          InputProps={{
            endAdornment: <InputAdornment  position="end">mm</InputAdornment>,
            style: {fontSize: 12}
          }}
          InputLabelProps={textFieldStyles}
          error={isNumberValid(formProps.armorSide) ? true  : isError ? !isNotEmpty(formProps.armorSide) : false}
          helperText={isNumberValid(formProps.armorSide) ? "Nie może być mniejsza od 0" : (!isNotEmpty(formProps.armorSide) && isError) ? "Pole nie moze byc puste" : " "}
          size='small' inputProps={{ min: 0, style: {fontSize: 12} }} name='armorSide' label='Armor Side' variant='outlined' required value={formProps.armorSide} onChange={(e) => setFormProps({ ...formProps, armorSide: e.target.value})} type='number' />
      
          <TextField fullWidth
          InputProps={{
            endAdornment: <InputAdornment  position="end">mm</InputAdornment>,
            style: {fontSize: 12}
          }}
          InputLabelProps={textFieldStyles}
          error={isNumberValid(formProps.armorBack) ? true  : isError ? !isNotEmpty(formProps.armorBack) : false}
          helperText={isNumberValid(formProps.armorBack) ? "Nie może być mniejsza od 0" : (!isNotEmpty(formProps.armorBack) && isError) ? "Pole nie moze byc puste" : " "}
          size='small' inputProps={{ min: 0, style: {fontSize: 12} }} name='armorBack' label='Armor Back' variant='outlined' required value={formProps.armorBack} onChange={(e) => setFormProps({ ...formProps, armorBack: e.target.value})} type='number' />
        </div>
      </Grid>            
      <Grid item xs={12}  sm={1}   >
        <div className=' flex w-full min-w-[100px] h-full item-center justify-center'>
          <button type='submit' className={`font-popins transition duration-100 h-[34px] w-full  rounded bg-slate-200 border border-slate-300 hover:bg-slate-100   ${tank ? 'text-[12px]' : 'text-[14px]'} font-bold text-blackCoffe`}>Submit</button>
        </div>
      </Grid>
    </Grid>
    
    </Box>
  )
}

export default Form
