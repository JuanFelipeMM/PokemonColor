import Pokedex, { Pokemon, PokemonColor } from 'pokedex-promise-v2';

/**
 * Busca todos os pokémons de uma cor específica.
 * @param color Cor do pokémon
 * @returns {Promise<Pokemon[]>} Lista de pokémons
 */
async function fetchData(color: string): Promise<Pokemon[]> {
    const P = new Pokedex();

    try {
        const pokeCores = await P.getPokemonColorByName(color);

        // Garante que pokeCores é do tipo PokemonColor (objeto)
        const pokeColorObj = Array.isArray(pokeCores) ? pokeCores[0] : pokeCores;
        const pokeEsp = (pokeColorObj as PokemonColor).pokemon_species;

        if (!pokeEsp) return [];

        // Aguarda todas as requisições dos pokémons
        const pokemons = await Promise.all(
            pokeEsp.map(async (pokemonAux: { name: string }) => {
                try {
                    return await P.getPokemonByName(pokemonAux.name) as Pokemon;
                } catch (error) {
                    console.error('Erro ao buscar:', pokemonAux.name, error);
                    return null;
                }
            })
        );

        // Remove pokémons que deram erro
        return pokemons.filter((p: Pokemon | null): p is Pokemon => p !== null);
    } catch (error) {
        console.error('Erro geral:', error);
        return [];
    }
}

export default fetchData;