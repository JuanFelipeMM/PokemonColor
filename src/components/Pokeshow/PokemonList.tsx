import React, { useEffect, useState } from 'react';
import fetchData from './fetchData';

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
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.8)',
          zIndex: 1000,
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        Carregando os Pokémon...
      </div>
    );
  }

  if (!pokemons.length) return <div>Nenhum pokémon encontrado.</div>;

  return (
    <div>
      {pokemons.map((p) => (
        <img key={p.id} src={p.sprites.front_default} alt={p.name} />
      ))}
    </div>
  );
}

export default PokemonList;