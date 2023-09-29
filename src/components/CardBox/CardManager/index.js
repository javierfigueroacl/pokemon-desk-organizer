import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import { MAXIMUM_CARDS } from "../../../helpers/constants";
import { red } from "../../../helpers/colors";
import { useCards, useCardsDispatch } from "../../../cardContext";
import { saveCard, clearCards } from "../../../state/actions/cardsActions";
import Column from "../Column";
import CardInfo from "../CardInfo";

const ClearButton = styled.button`
  grid-area: clear-saved-cards;
  background-color: ${red};
  color: white;
  font-weight: bold;
  border-radius: 1rem;
  width: 20%;
  min-width: 15rem;
  margin: auto;
  height: 2rem;
  cursor: pointer;
`;

const CardManager = () => {
  const { cards, savedCards, selectedCard } = useCards();
  const dispatch = useCardsDispatch();
  const areMaximumCardsReached = savedCards.length === MAXIMUM_CARDS;

  /* This is the callback after drag. In this case we only perform actions
  if the source column is different from the destination column, but the
  library supports all cases. */
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.droppableId === "savedCards" && areMaximumCardsReached)
      return;
    dispatch(saveCard({ source, destination }));
  };

  const handleClick = () => dispatch(clearCards());
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column cards={cards} id="cards" />
        <Column cards={savedCards} id="savedCards" />
      </DragDropContext>
      {savedCards.length > 0 && (
        <ClearButton onClick={handleClick}>Clear Saved Cards List</ClearButton>
      )}
      <CardInfo selectedCard={selectedCard} />
    </>
  );
};

export default CardManager;
