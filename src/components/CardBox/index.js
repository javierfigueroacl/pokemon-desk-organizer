import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDebounce } from "use-debounce";

import apiGetCards from "../../api/cardApi";
import { useCards, useCardsDispatch } from "../../cardContext";
import { saveCard, clearCards } from "../../state/actions/cardsActions";
import { red, blue } from "../../helpers/colors";
import Column from "./Column";
import CardInfo from "./CardInfo";
import Search from "../form/Search";
import useFetchCardsRequest from "../form/Search/useFetchCardsRequest";

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

const Instructions = styled.div`
  grid-area: instructions;
  text-align: center;
  color: ${blue};
`;

// DragDropContext is a component of the react-beautiful-dnd library, all
// drag and drop actions can only occur within it.
const CardBox = () => {
  const { cards, savedCards, selectedCard } = useCards();
  const [input, setInput] = useState(null);
  const dispatch = useCardsDispatch();

  /* This is the callback after drag. In this case we only perform actions
  if the source column is different from the destination column, but the
  library supports all cases. */
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    dispatch(saveCard({ source, destination }));
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = () => dispatch(clearCards());

  const [debouncedInput] = useDebounce(input, 500);
  const { refetch } = useFetchCardsRequest(apiGetCards, debouncedInput);

  useEffect(() => {
    if (debouncedInput) {
      refetch();
    }
  }, [debouncedInput, refetch]);

  return (
    <>
      <Search
        placeholder="Search Cards as you type..."
        onChange={onInputChange}
        input={input}
      />
      <Instructions>
        Move cards to the right column to save them. You can delete them by
        returning them to the left column.
      </Instructions>
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

export default CardBox;
