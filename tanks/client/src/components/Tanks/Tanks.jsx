import React from 'react'
import Tank from './Tank/Tank'
import { useGetTanksQuery } from '../../services/tanksApi'
import { CircularProgress, Grid } from '@mui/material'


export const Tanks = () => {

    const { data: tanks, isLoading } = useGetTanksQuery();

    if(isLoading) return <CircularProgress />

    const tags = [
        {name: 'Numer boczny', gridArea: 1, mongoName: 'sideNumber'},
        {name: 'Producent', gridArea: 1, mongoName: 'producer'},
        {name: 'Model', gridArea: 1, mongoName: 'model'},
        {name: 'Aktualna modyfikacja', gridArea: 1, mongoName: 'curMod'},
        {name: 'Rocznik', gridArea: 1, mongoName: 'year'},
        {name: 'Data wprowadzenia do kraju', gridArea: 1, mongoName: 'introductionDate'},
        {name: 'Aktualny przebieg (km)', gridArea: 1, mongoName: 'mileage'},
        {name: 'Ilość amunicji', gridArea: 1, mongoName: 'ammoCount'},
        {name: 'Grubość pancerza (przód/boki/tył mm)', gridArea: 1, mongoName: 'armor'},
        {name: 'Data stworzenia', gridArea: 1, mongoName: 'createdAt'},
        {name: 'Data aktualizacji', gridArea: 1, mongoName: 'updateDate'},
        {name: ' ', gridArea: 1, mongoName: 'buttons'},
    ]

  return (
    <div className='w-full flex flex-col  overflow-auto font-poppins '>
        <div className='w-full min-w-[1000px] '>
            <Grid container  >
                {tags.map((elem, index) => (
                    <Grid key={index + "tag"} item xs={elem.gridArea} className='border py-2 bg-gray-100 tracking-tighter'>
                        <div className='w-full h-full flex  justify-center'>
                            <p className='text-center font-semibold text-[12px] p-1 '>{elem.name}</p>
                        </div>
                    </Grid>
                ))}
                {tanks.map((tank, index) => 
                    <Tank tank={tank} tags={tags} isGray={index} key={tank._id} />
                )}
            </Grid>
            
        </div>
        
    </div>
  )
}

export default Tanks