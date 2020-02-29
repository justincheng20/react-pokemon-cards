import React from "react";

import {useAxios} from "./hooks";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const url = "https://deckofcardsapi.com/api/deck/new/draw/";
  const formatResponse = (response) => {
    return {image: response.data.cards[0].image}
  };
  const [cards, addCard, removeCards] = useAxios(url, formatResponse, "playingCards");
  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard()}>Add a playing card!</button>
        <button onClick={removeCards}>Remove all the playing cards!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
