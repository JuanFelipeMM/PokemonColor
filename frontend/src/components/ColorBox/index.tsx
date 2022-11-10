import './styles.css';
import { CirclePicker } from 'react-color';
import PokemonBox from '../PokemonBox';
import { useState } from 'react';
import { render } from '@testing-library/react';

const [colorPick, setColorPick] = useState('#000000');


function passarCor(cor:string){
    return "black";
}

function ColorBox() {
    
    const colors = ['#000000','#0000ff','#008000','#ff0000'];
    
    return (
        <div>
            <CirclePicker colors={colors} onChangeComplete={(color=>(passarCor(color.hex)))}></CirclePicker>
        </div>
        
    )
}



export default ColorBox;