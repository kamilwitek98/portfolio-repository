import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Grid, TextField, InputLabel, Select, MenuItem, FormControl, Slider }  from '@mui/material'
import './style.css'
import { useDropzone } from 'react-dropzone';
import { useCreateGameMutation, useUpdateGameMutation } from '../../services/gamesApi';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdatedGame } from '../../slices/updatedGameSlice';


const Form = () => {
    const [formProps, setFormProps] = useState({
        title: '',
        publisher: '',
        difficulty: 1,
        players: [1,1],
        gameTime: [15,15],
        description: '',
        selectedFile: '',
    })

    const updatedGame = useSelector(
        (state) => state.updatedGameId.updatedGame
    )

    const currentToken = useSelector(
        (state) => state.token.token
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!currentToken){
            navigate('/auth');
        }
      if(Object.keys(updatedGame).length > 0){
        const game = {
            title: updatedGame.title,
            publisher: updatedGame.publisher,
            difficulty: updatedGame.difficulty,
            players: updatedGame.players,
            gameTime: updatedGame.gameTime,
            description: updatedGame.description,
            selectedFile: updatedGame.selectedFile
        }
        console.log(game);
        setFormProps(game);
      }
    }, [updatedGame, currentToken, navigate])
    
    
    
    const [addGame] = useCreateGameMutation();
    const [updateGame] = useUpdateGameMutation();

    const fileReader = useMemo(() =>(new FileReader()), []);
    fileReader.onload = () =>  setFormProps({...formProps, selectedFile: fileReader.result });

    const onDrop = useCallback(acceptFiles => {
        if(acceptFiles.length > 0){
            const file = acceptFiles[0];
            fileReader.readAsDataURL(file)
        }
        
    }, [fileReader]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop ,accept:{'image/png': []}, maxFiles: 1})
    

    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(Object.keys(updatedGame).length > 0){
            updateGame({id: updatedGame._id, patch: formProps})
        } else{
            addGame(formProps);
        }
        dispatch(setUpdatedGame({}));
        setTimeout(() => {
            clear();
            navigate('/');
        }, "1000")
        
    }
    
    const clear = () => {
        setFormProps({
            title: '',
            publisher: '',
            difficulty: 1,
            players: [1,1],
            gameTime: [15,15],
            description: '',
            selectedFile: '',
        })
    }

    const gameTime = [15,30,45,60,90,120,150,180,210,240];
    const playersNumber =[1,2,3,4,5,6,7,8,9,10,11,12];

    

  return (
    <div className='w-full flex justify-center font-poppins'>
        <form  onSubmit={handleSubmit} autoComplete='off' noValidate className='max-w-[800px] p-4 rounded-md min-h-[200px] box_gradient fex flex-col items-center w-full justify-center'>
            <h2 className='text-4xl text-center mt-2 mb-10'>Fill out the form to {Object.keys(updatedGame).length > 0 ? 'edit ': 'add '}a game</h2>
            <Grid container spacing={3} >
                <Grid item xs={12} sm={6} >
                    <TextField name='title' label='Title' variant='outlined' required value={formProps.title} onChange={(e) => setFormProps({ ...formProps, title: e.target.value })} type='text' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField name='publisher' label='Publisher' variant='outlined' required value={formProps.publisher} onChange={(e) => setFormProps({ ...formProps, publisher: e.target.value })} type='text' fullWidth />
                
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <div className='flex flex-row w-full gap-2 items-center'>
                        <FormControl fullWidth>
                            <InputLabel id='playersFromLabel'>Players from</InputLabel>
                            <Select variant='outlined' 
                                labelId='playersFromLabel'
                                id='playersFrom'
                                label='Players from'
                                required
                                value={formProps.players[0]} 
                                onChange={(e) => setFormProps({ ...formProps, players: [parseInt(e.target.value), formProps.players[1]]})}
                                name='playersFrom'
                            >
                                {playersNumber.map((elem, index) => (
                                        <MenuItem key={"playerFrom"+index} value={elem} >{elem}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <p>-</p>
                        <FormControl fullWidth>
                            <InputLabel id='playersToLabel'>Players to</InputLabel>
                            <Select variant='outlined' 
                                labelId='playersToLabel'
                                id='playersTo'
                                required
                                label='Players from'
                                value={formProps.players[1]} 
                                onChange={(e) => setFormProps({ ...formProps, players: [formProps.players[0], parseInt(e.target.value)]})}
                                name='playersTo'
                            >
                                {playersNumber.map((elem, index) => (
                                        <MenuItem key={"playerTo"+index} value={elem} >{elem}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    
                    
                    </div>
                    
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <div className='flex flex-row w-full gap-2 items-center'>
                        <FormControl fullWidth>
                            <InputLabel id='timeFromLabel'>Time from</InputLabel>
                            <Select variant='outlined' 
                                labelId='timeFromLabel'
                                id='timeFrom'
                                label='Time from'
                                required
                                value={formProps.gameTime[0]} 
                                onChange={(e) => setFormProps({ ...formProps, gameTime: [parseInt(e.target.value), formProps.gameTime[1]]})}
                                name='timeFrom'
                            >
                                {gameTime.map((elem, index) => (
                                        <MenuItem key={"timeTo"+index} value={elem} >{elem}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <p>-</p>
                        <FormControl fullWidth>
                            <InputLabel id='timeToLabel'>Time to</InputLabel>
                            <Select variant='outlined' 
                                required
                                labelId='timeToLabel'
                                id='timeTo'
                                label='Time from'
                                value={formProps.gameTime[1]} 
                                onChange={(e) => setFormProps({ ...formProps, gameTime: [formProps.gameTime[0], parseInt(e.target.value)]})}
                                name='timeTo'
                            >
                                {gameTime.map((elem, index) => (
                                        <MenuItem key={"timeTo"+index} value={elem} >{elem}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    
                    
                    </div>
               
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <div className='flex flex-col'>
                    <InputLabel>Difficulty</InputLabel>
                    <Slider aria-label="Default" required value={formProps.difficulty} onChange={(e) => setFormProps({...formProps, difficulty: e.target.value})} min={1} max={3} valueLabelDisplay="auto" />
 
                </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <div className='rounded flex flex-col h-full'>
                <InputLabel className='mb-2'>Selected file</InputLabel>
                    <div className='border text-[15px] text-gray-500 text-center border-dashed border-blackCoffe p-2 h-full flex items-center justify-center rounded' {...getRootProps()}>
                        <input required {...getInputProps()} />
                        {
                            formProps.selectedFile ? <p>File added</p> :
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                </div>
                </Grid>
                <Grid item xs={12} md={9}>
                <div className='flex flex-col'>
                <TextField name='description' label='Description' variant='outlined' required value={formProps.description} onChange={(e) => setFormProps({...formProps, description: e.target.value})} rows={5} multiline type='text' fullWidth />

                </div>
                </Grid>
                
            </Grid>
            <button className='px-4 py-2 border rounded mt-4 border-blackCoffe hover:bg-blackCoffe hover:text-white transition duration-200'>Add game</button>
        </form>
    </div>
  )
}

export default Form