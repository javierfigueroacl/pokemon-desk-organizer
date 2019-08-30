import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import PropTypes from "prop-types";

import { red } from "../../helpers/colors";
import Column from "./Column";

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

/* This is the callback after drag. In this case we only perform actions
  if the source column is different from the destination column, but the
  library supports all cases. */
const onDragEnd = (result, saveCard) => {
  const { destination, source } = result;

  if (!destination) return;

  /*
  if (destination.droppableId === source.droppableId) {
    if (destination.droppableId.index === source.droppableId.index) return;
    else 
  } */

  saveCard({ source, destination });
};

// DragDropContext is a component of the react-beautiful-dnd library, all
// drag and drop actions can only occur within it.
const CardBox = ({ cards, savedCards, saveCard, clearCards }) => {
  console.log({ savedCards });
  return [
    <DragDropContext onDragEnd={result => onDragEnd(result, saveCard)}>
      <Column cards={cards} id="cards" />
      <Column cards={savedCards} id="savedCards" />
    </DragDropContext>,
    savedCards.length > 0 && (
      <ClearButton onClick={clearCards}>Clear Saved Cards List</ClearButton>
    )
  ];
};

CardBox.defaultProps = {
  cards: [],
  savedCards: []
};

CardBox.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  savedCards: PropTypes.arrayOf(PropTypes.object),
  saveCard: PropTypes.func.isRequired,
  clearCards: PropTypes.func.isRequired
};

export default CardBox;
