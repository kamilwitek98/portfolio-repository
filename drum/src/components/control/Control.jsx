import React from 'react'
import './control.css'

const Control = (props) => {
  function updateControls(){
    if (props.name == 'Power'){
      props.changeDisplay('')
      props.changeState(prevState => prevState * (-1)); 
    }
    else if(props.power > 0){
      props.currentState < 0 ? props.changeDisplay('Smooth Piano Kit') : props.changeDisplay('Heater Kit');
      props.changeState(prevState => prevState * (-1));
    }
  }

  return (
    <div className='control' >
        <p>{props.name}</p>
        <div className='drum_machine-switch_power' onClick={updateControls} style={{flexDirection: props.currentState > 0 ? 'row-reverse' : 'row'}}>
            <div className='switch-power_button'></div>
        </div>
    </div>
  )
}

export default Control