import React, { useEffect, useState } from 'react';
import fetchData from './fetchData';
import './PokemonList.css'; // Importe o CSS para responsividade

interface PokemonListProps {
  color: string;
}

function PokemonList({ color }: PokemonListProps) {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setPokemons([]);      // Limpa imediatamente ao trocar a cor
    setLoading(true);     // Mostra loading imediatamente

    fetchData(color).then((data) => {
      if (isMounted) {
        setPokemons(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [color]);

  if (loading) {
    return (
      <div className="pokemon-loading-overlay">
        Carregando os Pokémon...
      </div>
    );
  }

  if (!pokemons.length) return <div className="pokemon-empty">Nenhum pokémon encontrado.</div>;

  return (
    <div className="pokemon-list">
      {pokemons.map((p) => (
        <img key={p.id} src={p.sprites.front_default} alt={p.name} />
      ))}
    </div>
  );
}

export default PokemonList;