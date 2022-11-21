
import Pokedex from 'pokedex-promise-v2';
import { useEffect, useState, Suspense } from "react";
import './styles.css';
import { CirclePicker } from 'react-color';
import LazyLoad from 'react-lazy-load';
import { json } from 'stream/consumers';

var firstLoad: boolean = false;

function PokemonBox() {

    const P = new Pokedex();

    const colors = ['#ffffff', '#808080', '#000000', '#0000ff', '#008000', '#ff0000', '#ffff00', '#a52a2a', '#800080', '#ffc0cb'];
    const [pokemons, setPokemon] = useState<Pokedex.Pokemon[]>([]);
    var pokemonsAux: Pokedex.Pokemon[] = [];
    var pokeCores: Pokedex.PokemonColor;
    const [colorPick, setColorPick] = useState<String>('');
    const [color, setColor] = useState<string>('');
    let auxString: string = "";

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

    useEffect(() => {
        do {
            pokeCores=JSON.parse(JSON.stringify(""));

            (async () => {
                P.getPokemonColorByName(color)
                    .then((data) => {
                        auxString = JSON.stringify(data);
                        pokeCores = JSON.parse(auxString);
                    })
                    .catch((error) => {
                        pokeCores=JSON.parse(JSON.stringify(""));
                        console.log('There was an ERROR: ', error);
                    });

                await new Promise(resolve => setTimeout(resolve, 200));


                if (pokeCores !== undefined) {
                    try {
                        pokeCores.pokemon_species.map(pokemonAux => {
                            P.getPokemonByName(pokemonAux.name)
                                .then((data) => {
                                    auxString = JSON.stringify(data);
                                    pokemonsAux.push(JSON.parse(auxString));
                                })
                                .catch((error) => {
                                    console.log('There was an ERROR: ', error);
                                })
                        })
                    } catch (error) {
                        console.log('There was an ERROR: ', error);
                    } finally {
                        await new Promise(resolve => setTimeout(resolve, 200));
                        setPokemon(pokemonsAux);
                    }

                } else if (pokeCores === undefined) { console.log("Nenhum pokémon com essa cor encontrado"); }

            })();
        } while (JSON.stringify(pokeCores) === "");
    }, [color]);


    return (
        <>
            <div className='color-container'>
                <div className='title'>
                    <h1>Pokémon Color</h1>
                    <h4>By <a href='www.linkedin.com/in/juan-felipe-moura-de-melo-371200208'>Juan Felipe</a></h4>
                </div>

                <CirclePicker className='CPicker' colors={colors} onChangeComplete={(color => (setColorPick(color.hex)))}></CirclePicker>

            </div>
            <LazyLoad>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className='poke-container'>
                        {pokemons.map((pokemon, index) => {
                            let img: string | null = pokemon.sprites.front_default;
                            let imgPoke: string | undefined;
                            if (img !== null) { imgPoke = img; }

                            return (
                                <div className='poke' id='poke' key={index}>
                                    <img src={imgPoke} alt="Sprite Indisponível" />
                                    <br />
                                    <p>{pokemon.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </Suspense>
            </LazyLoad>
        </>
    );



}

export default PokemonBox;
