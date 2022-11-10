
import Pokedex, { Pokemon } from 'pokedex-promise-v2';
import { useEffect, useState } from "react";
import './styles.css';
import { CirclePicker } from 'react-color';


function PokemonBox() {

    const P = new Pokedex();

    const colors = ['#ffffff','#808080','#000000', '#0000ff', '#008000', '#ff0000','#ffff00','#a52a2a','#800080','#ffc0cb'];
    const [pokemons, setPokemon] = useState<Pokedex.Pokemon[]>([]);
    var pokemonsAux: Pokedex.Pokemon[] = [];
    var pokeCores: Pokedex.PokemonColor;
    const [colorPick, setColorPick] = useState<String>('');
    const [color, setColor] = useState<string>('');
    let auxString: string = "";

    useEffect(() => {

        switch (colorPick) {
            case '#ffffff': setColor('white'); break;
            case '#808080': setColor('gray'); break;
            case '#000000': setColor('black'); break;
            case '#0000ff': setColor('blue'); break;
            case '#008000': setColor('green'); break;
            case '#ff0000': setColor('red'); break;
            case '#ffff00': setColor('yellow'); break;
            case '#a52a2a': setColor('brown'); break;
            case '#800080': setColor('purple'); break;
            case '#ffc0cb': setColor('pink'); break;

        }
    }, [colorPick]);

    useEffect(() => {

        (async () => {
            P.getPokemonColorByName(color)
                .then((data) => {
                    auxString = JSON.stringify(data);
                    pokeCores = JSON.parse(auxString);
                })
                .catch((error) => {
                    console.log('There was an ERROR: ', error);
                });

            await new Promise(resolve => setTimeout(resolve, 200));
            console.log("PokeCores:", pokeCores);

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

    }, [color]);


    return (
        <>
            <CirclePicker colors={colors} onChangeComplete={(color => (setColorPick(color.hex)))}></CirclePicker>
            <table>
                <tbody>
                    {pokemons.map((pokemon, index) => {
                        let img: string | null = pokemon.sprites.front_default;
                        let imgPoke: string | undefined;
                        if (img !== null) { imgPoke = img; }

                        return (
                            <tr key={index}>
                                <td>
                                    <img src={imgPoke} alt="Sprite Indisponível" />
                                    <br />
                                    {pokemon.name}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );



}

export default PokemonBox;
