import './styles.css';
import Load from '../Load'
import Pokedex from 'pokedex-promise-v2';
import React from 'react';
import { useEffect, useState } from "react";
import { Suspense } from 'react';
import { CirclePicker } from 'react-color';
import LazyLoad from 'react-lazy-load';
import fetchData from '../Pokeshow/fetchData';
import wrapPromise from '../Pokeshow/wrapPromise';
const Pokeshow = React.lazy(() => {
    return import('../Pokeshow')
});

var firstLoad: boolean = false;
var firstLoadR: boolean = false;

function PokemonBox() {

    const colors = ['#ffffff', '#808080', '#000000', '#0000ff', '#008000', '#ff0000', '#ffff00', '#a52a2a', '#800080', '#ffc0cb'];
    const [pokemons, setPokemon] = useState<Pokedex.Pokemon[] | any>([]);
    const [colorPick, setColorPick] = useState<String>('');
    const [color, setColor] = useState<string>('');



    if (firstLoad === false) {
        firstLoad = true;
        setColorPick(colors[Math.floor(Math.random() * colors.length)]);


    }
    
    useEffect(() => {

        var poke = document.getElementsByClassName('poke');

        if (colorPick === "#000000") {
            for (let i = 0; i < poke.length; i++) {
                poke[i].setAttribute("style", "-webkit-text-fill-color: blueviolet");
            }
            document.getElementsByClassName('title')[0].setAttribute("style", "-webkit-text-fill-color: blueviolet");
        } else {
            for (let i = 0; i < poke.length; i++) {
                poke[i].setAttribute("style", "-webkit-text-fill-color:black");
            }
            document.getElementsByClassName('title')[0].setAttribute("style", "-webkit-text-fill-color: black");
        }

        /*if (firstLoadR === false) {
            firstLoadR = true;

           var patgrid= document.getElementsByClassName('PatternGrid');

            var ph=document.documentElement.scrollHeight;
            var pw=document.documentElement.scrollWidth;
            var quant:number=Math.floor(ph/20);
            var H:number=0;
            console.log("Quant:",quant);
            for(let i=0;i<quant;i++){
                console.log("H:",H);
                if(H<ph){
                    patgrid[0].innerHTML+= '<div style="height:'+H+'px;">OI</div>';
                    var random=Math.floor(Math.random() * (25 - (-25)) + 1) + (-25);
                    console.log("Random:",random);
                    H+=quant+random;
                }  
            }

        }*/
        
    }, [pokemons]);

    useEffect(() => {

        

        switch (colorPick) {
            case '#ffffff': setColor('white');
                document.body.style.background = 'linear-gradient(to bottom, #E2E2E2 0%,  #E1AEAE 10%, #E2E2E2 20%, #AFE1AE 40%, #E2E2E2 60%, #AEB0E1 80%, #E2E2E2 100%)';
                break;
            case '#808080': setColor('gray');
                document.body.style.background = 'linear-gradient(to bottom, #535353 0%,  #9E9C9C 10%, #535353 20%, #9E9C9C 40%, #535353 60%, #9E9C9C 80%, #535353 100%)';
                break;
            case '#000000': setColor('black');
                document.body.style.background = 'linear-gradient(to bottom, #031B30 0%, #300303 25%, #0F3003 50%, #373902 75%, #000000 100%)';
                break;
            case '#0000ff': setColor('blue');
                document.body.style.background = 'linear-gradient(to bottom, #124E84 0%, #3E8BD3 10%, #73ABDF 85%)';
                break;
            case '#008000': setColor('green');
                document.body.style.background = 'linear-gradient(to bottom, #115002 0%, #4ABD2E 10%, #8AE872 85%)';
                break;
            case '#ff0000': setColor('red');
                document.body.style.background = 'linear-gradient(to bottom, #8A0808 0%, #E12626 10%, #E8921D 85%)';
                break;
            case '#ffff00': setColor('yellow');
                document.body.style.background = 'linear-gradient(to bottom, #898305 0%, #EDDC0E 10%, #F4E85B 85%)';
                break;
            case '#a52a2a': setColor('brown');
                document.body.style.background = 'linear-gradient(to bottom, #7F5419 0%, #B8843D 10%, #E2B26F 85%)';
                break;
            case '#800080': setColor('purple');
                document.body.style.background = 'linear-gradient(to bottom, #620085 0%, #A139C6 10%, #B265CD 85%)';
                break;
            case '#ffc0cb': setColor('pink');
                document.body.style.background = 'linear-gradient(to bottom, #92008C 0%, #E16EDC 10%, #F7CFF6 85%)';
                break;

        }

    }, [colorPick]);

    /*useEffect(() => {

        setPokemon([]);
    }, [color]);*/

    useEffect(() => {

        (async () => {


            fetchData(color).then(async (result) => {

                await new Promise(resolve => setTimeout(resolve, 200));

                setPokemon(result);


            })

        })()

    }, [color]);


    return (
        <>
            <div className='PatternGrid'></div>    
            <div className='color-container'>
                <div className='title'>
                    <h1>Pokémon Color</h1>
                    <h4>By <a href='https://www.linkedin.com/in/juan-felipe-moura-de-melo-371200208' target="_blank">Juan Felipe</a></h4>
                </div>

                <CirclePicker className='CPicker' colors={colors} onChangeComplete={(color => (setColorPick(color.hex)))}></CirclePicker>

            </div>
  
                <div className='poke-container'>
                    {pokemons.map((pokemon: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; sprites: { front_default: string | null; }; id: React.Key | null | undefined; }) => {

                        let imgPoke = wrapPromise(Promise.resolve(pokemon.sprites.front_default));

                        /*let img: string | null = pokemon.sprites.front_default;
                        let imgPoke: string | undefined;
                        if (img !== null) { imgPoke = img }*/

                        return (

                            <div className='poke' id='poke' key={pokemon.id} >
                                <LazyLoad>
                                    <Suspense fallback={<Load/>}>
                                        <Pokeshow imgPoke={imgPoke} />
                                    </Suspense>
                                </LazyLoad>
                                <br />
                                <p> {pokemon.name} </p>
                            </div>

                        );
                    }


                    )
                    }
                </div>

        </>
    );



}

export default PokemonBox;
