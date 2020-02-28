import React from "react";
import {useAxios} from "./hooks";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const formatResponse = (response) => {
    return {
      front: response.data.sprites.front_default,
      back: response.data.sprites.back_default,
      name: response.data.name,
      stats: response.data.stats.map(stat => {
        return {name: stat.stat.name, value: stat.base_stat} })
    }
  }
  const [pokemon, addPokemon, removePokemon] = useAxios(`https://pokeapi.co/api/v2/pokemon/`, formatResponse);

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
        <button onClick={removePokemon}>Remove all the Pokemon!</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
