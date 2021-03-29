import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { blue } from "./helpers/colors";
import * as CardsCreators from "./state/actions/cardsActions";
import CardBox from "./components/CardBox";
import "./App.css";
import Search from "./components/form/Search";
import Header from "./components/Header";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4rem 6rem 2rem 22rem 22rem 2rem;
  grid-template-areas:
    "header"
    "search"
    "instructions"
    "cards"
    "savedCards"
    "clear-saved-cards";
`;

const Instructions = styled.div`
  grid-area: instructions;
  text-align: center;
  color: ${blue};
`;

function App({ getCards, Cardstate, saveCard, clearCards }) {
  const { cards, savedCards } = Cardstate;
  const [searchInput, setSearchInput] = useState("");

  return (
    <Container>
      <Header />
      <Search
        placeholder="Search Cards as you type..."
        input={searchInput}
        changeValue={setSearchInput}
        apiCall={getCards}
      />
      <Instructions>
        Move cards to the right column to save them. You can delete them by
        returning them to the left column.
      </Instructions>
      <CardBox
        cards={cards}
        savedCards={savedCards}
        saveCard={saveCard}
        clearCards={clearCards}
      />
    </Container>
  );
}

App.propTypes = {
  getCards: PropTypes.func.isRequired,
  saveCard: PropTypes.func.isRequired,
  clearCards: PropTypes.func.isRequired,
  Cardstate: PropTypes.shape({
    savedCards: PropTypes.array,
    cards: PropTypes.array
  }).isRequired
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
)(App);
