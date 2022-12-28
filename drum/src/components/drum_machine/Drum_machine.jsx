import React, { useState} from 'react';
import Control from '../control/Control';
import Drum_pad from '../drum_pad/Drum_pad';
import './drum_machine.css';

const padList = [
{key: 'Q', src1: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', name1: 'Chord-1', name2: 'Heater-1'},
{key: 'W', src1: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', name1: 'Chord-2', name2: 'Heater-2'},
{key: 'E', src1: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', name1: 'Chord-3', name2: 'Heater-3'},
{key: 'A', src1: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', name1: 'Shaker', name2: 'Heater-4'},
{key: 'S', src1: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3', name1: 'Open-HH', name2: 'Clap'},
{key: 'D', src1: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3', name1: 'Closed-HH', name2: 'Open-HH'},
{key: 'Z', src1: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', name1: 'Punchy-Kick', name2: "Kick-n'-Hat"},
{key: 'X', src1: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', name1: 'Side-Stick', name2: 'Kick'},
{key: 'C', src1: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', src2: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', name1: 'Snare', name2: 'Closed-HH'}
];

const Drum_machine = () => {
  const [ power, setPower ] = useState(1);
  const [ bank, setBank ] = useState(-1);
  const [ volume, setVolume ] = useState(0.3);
  const [ display, setDisplay ] = useState('');

  return (
    <div className='drum_machine' id="drum-machine">
        <div className='drum_machine-pad_container'>
            {bank < 0 ? 
            padList.map(elem => <Drum_pad  music={elem.src1} id={elem.key} key={elem.key} name={elem.name2} volume={volume} changeDisplay={display => setDisplay(display)} power={power}/> ):
            padList.map(elem => <Drum_pad  music={elem.src2} id={elem.key} key={elem.key} name={elem.name1} volume={volume} changeDisplay={display => setDisplay(display)} power={power}/> )}
        </div>
        <div className='drum_machine-switchs'>
            <p className='logo'>FCC</p>
            <Control name='Power' changeState={ power => setPower(power)} currentState={power} changeDisplay={display => setDisplay(display)}/>
            <h3 className='display' id="display">{display}</h3>
            <input type='range' step='0.01' min='0' max='1' value={volume} onChange={event => {
              if(power >0){setVolume(event.target.value)}}} class="istyle"/>
            <Control name='Bank' changeState={bank => setBank(bank)} currentState={bank} changeDisplay={display => setDisplay(display)} power={power}/>
        </div>
    </div>
  )
}

export default Drum_machine