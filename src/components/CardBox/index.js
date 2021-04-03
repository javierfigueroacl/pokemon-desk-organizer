import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as CardsCreators from "../../state/actions/cardsActions";

import { red, blue } from "../../helpers/colors";
import Column from "./Column";
import CardInfo from "./CardInfo";
import Search from "../form/Search";

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

/* This is the callback after drag. In this case we only perform actions
  if the source column is different from the destination column, but the
  library supports all cases. */
const onDragEnd = (result, saveCard) => {
  const { destination, source } = result;

  if (!destination) return;
  saveCard({ source, destination });
};

// DragDropContext is a component of the react-beautiful-dnd library, all
// drag and drop actions can only occur within it.
const CardBox = ({ getCards, Cardstate, saveCard, clearCards }) => {
  const { cards, savedCards, selectedCard } = Cardstate;
  return (
    <>
      <Search placeholder="Search Cards as you type..." apiCall={getCards} />
      <Instructions>
        Move cards to the right column to save them. You can delete them by
        returning them to the left column.
      </Instructions>
      <DragDropContext onDragEnd={result => onDragEnd(result, saveCard)}>
        <Column cards={cards} id="cards" />
        <Column cards={savedCards} id="savedCards" />
      </DragDropContext>
      {savedCards.length > 0 && (
        <ClearButton onClick={clearCards}>Clear Saved Cards List</ClearButton>
      )}
      <CardInfo selectedCard={selectedCard} />
    </>
  );
};

CardBox.defaultProps = {
  Cardstate: { cards: [], savedCards: [] }
};

CardBox.propTypes = {
  saveCard: PropTypes.func.isRequired,
  clearCards: PropTypes.func.isRequired,
  getCards: PropTypes.func.isRequired,
  Cardstate: PropTypes.shape({
    savedCards: PropTypes.array,
    cards: PropTypes.array,
    selectedCard: PropTypes.object
  })
};

function mapDispatchToProps(dispatch) {
  const combiner = { ...CardsCreators, dispatch };
  return bindActionCreators(combiner, dispatch);
}

const mapStateToProps = state => ({
  Cardstate: state.cards
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardBox);
