import React, {useState} from 'react';
import { useEffect } from 'react';
import './drum_pad.css';

const Drum_pad = (props) => {

 

  const onClickStyles = {
    backgroundColor:'orange',
    boxShadow: 'none',
    paddingTop: '10px'
  }

  const offClickStyles = {
    backgroundColor:'grey',
    boxShadow: '3px 3px 5px black',
    paddingTop: '0px',
  }

  const isOffClickStyles = {
    boxShadow: 'none',
    paddingTop: '10px'
  }


  const handleKeyDown = (event) => {
    if(event.key === props.id.toLowerCase()){
      //startMusic();
      document.getElementById("div"+props.id).click();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.power]);

  const [styleClicked, setStyles] = useState({});

  function startMusic(){
    //console.log(props.power);
    if(props.power > 0){
      setStyles(onClickStyles);
      props.changeDisplay(props.name);
      var audio = document.getElementById(props.id);
      audio.volume = props.volume;
      audio.currentTime = 0;
      audio.play();
    }
    else{
      setStyles(isOffClickStyles);
    }
    setTimeout(function() {
      setStyles(offClickStyles);
    }, 100);
    
  }

  return (
    <div className='drum-pad' tabIndex='1' onKeyDown={() => console.log("xd")} id={'div'+ props.id} onClick={startMusic} style={styleClicked}>
        {props.id}
        <audio className='pad_music clip' id={props.id} src={props.music}></audio>
    </div>
  )
}

export default Drum_pad