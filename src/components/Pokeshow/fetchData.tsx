import Pokedex from 'pokedex-promise-v2';
import { useState } from 'react';
//import { useState } from 'react';
import wrapPromise from './wrapPromise';

/**
 * Wrap Axios Request with the wrapPromise function
 * @returns {Promise} A wrapped promise
 */
async function fetchData(color: string) {

    const P = new Pokedex();

    var pokemons: Pokedex.Pokemon[] = [];
    var pokeCores: Pokedex.PokemonColor;
    let auxString: string = "";

    console.log("COR:", color.toString());
    pokeCores = JSON.parse(JSON.stringify(""));
    P.getPokemonColorByName(color.toString())
        .then((data) => {
            auxString = JSON.stringify(data);
            pokeCores = JSON.parse(auxString);
        })
        .catch((error) => {
            pokeCores = JSON.parse(JSON.stringify(""));
            console.log('There was an ERROR: ', error);
        });

    await new Promise(resolve => setTimeout(resolve, 200));
    const pokeEsp=pokeCores.pokemon_species;

    if (pokeEsp !== undefined) {
        pokeEsp.map(async pokemonAux => {
                await P.getPokemonByName(pokemonAux.name)
                    .then((data) => {
                        auxString = JSON.stringify(data);
                        pokemons.push(JSON.parse(auxString));
                    })
                    .catch((error) => {
                        console.log('There was an ERROR: ', error);
                    })

            })
        
    }


    return pokemons;
}

export default fetchData;