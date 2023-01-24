import React from 'react'
import Game from './Game/Game'
import { useGetGamesQuery } from '../../services/gamesApi'
import { CircularProgress } from '@mui/material'


const Games = ({ searchTerm, userId }) => {
    const {data: games, isLoading } = useGetGamesQuery();
    
    if(isLoading) return <CircularProgress />

  return (
    <div  className='w-full flex flex-col gap-4'>
        {games.filter((game) => (userId === '' || game.creator === userId))
        .filter((game) => (searchTerm === '' || game.title.toLowerCase().includes(searchTerm.toLowerCase())))
        .map((game) => (
            <Game game={game} key={game._id} />
        ))}
    </div>
  )
}

export default Games