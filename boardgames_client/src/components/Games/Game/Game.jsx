import React, { useState, useEffect } from 'react'
import { AiFillStar, AiOutlineMenu, AiFillDelete } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useDeleteGameMutation } from '../../../services/gamesApi';
import { useDispatch } from 'react-redux';
import { setUpdatedGame } from '../../../slices/updatedGameSlice';
import { useNavigate, useLocation } from 'react-router-dom';


const Game = ({game}) => {
  const [isDesc, setIsDesc] = useState(false);
  const [ deleteGame ] = useDeleteGameMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  
  const item = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div layout className='border rounded-xl flex flex-col w-full p-5 font-poppins'>
        <motion.div layout className='flex flex-col md:flex-row w-full gap-4'>
          <motion.div layout className='flex max-h-[200px] xs:max-h-[300px] flex-[0.8] md:flex-[0.5] justify-center'>
            <img src={game.selectedFile} alt='gameImg' className='bg-red object-contain'/>
          </motion.div>
          <motion.div layout className='flex flex-col flex-1'>
            <motion.div layout className='flex flex-row justify-between'>
              <div className='flex flex-col'>
                <h3 className='text-[30px] underline underline-offset-4 mb-4'>{game.title}</h3>
                <p className='text-[20px]'>Players: <span className='font-medium ml-2'>{`${game.players[0]} - ${game.players[1]}`}</span></p>
                <p className='text-[20px]'>Game time: <span className='font-medium ml-2'>{`${game.gameTime[0]} - ${game.gameTime[1]}`}</span></p>
                <div className='flex flex-row items-center'>
                    <p className='text-[20px] mr-4'>Difficulty: </p>
                    {[...Array(3)].map((elm, index) => (
                      <AiFillStar key={'start'+ index}  className={`h-[25px] w-[25px] ${index+1 <= game.difficulty ? 'text-brownRosy' : 'text-slate-200'}`} />
                    ))} 
                  </div>
                <p className='text-[20px]'>Publisher: <span className='font-medium ml-2'>{game.publisher}</span></p>    
                <button onClick={() => setIsDesc((prev) => !prev)} className='mt-2 border py-1 max-w-[250px] px-3 font-medium rounded-md border-blackCoffe hover:bg-blackCoffe hover:text-white'>{isDesc ? 'Hide Description' : 'Show Description'}</button>
              </div>
              {(user?.result?._id === game?.creator || user?.result?.isAdmin ) && 
                <div className='flex flex-col gap-3'>
                <AiOutlineMenu onClick={() => {
                  dispatch(setUpdatedGame(game))
                  navigate('/addgame')
                  }} className='w-[30px] h-[30px] cursor-pointer text-blackCoffe hover:text-brownRosy transition'/>
                <AiFillDelete onClick={ async () => {
                  deleteGame(game._id);
                }} 
                className='w-[30px] h-[30px] cursor-pointer text-blackCoffe hover:text-brownRosy transition'/>
              </div>
              }
              
              
            </motion.div>
            {isDesc && 
              <motion.div 
                variants={item}
                initial='hidden' 
                animate='visible'
              ><p className='text=[20px] mt-8'>{game.description}</p>
              </motion.div>
            }
          </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default Game