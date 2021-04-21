import React from "react";
import "../assets/Pokecard.css";

const Poke_DB =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

// Shows a single Pokemon, with their name, image, and type.
const Pokecard = (props) => {
  let img = `${Poke_DB}${props.id}.png`;

  return (
    <div className="Pokecard">
      <div className="Pokecard-name">{props.name}</div>
      <img className="Pokecard-img" src={img}/>
      <div className="Pokecard-type">TYPE: {props.type}</div>
      <div className="Pokecard-exp">EXP: {props.exp}</div>
    </div>
  );
};

export default Pokecard;
