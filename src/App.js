import React, { useReducer } from "react";
import styled from "styled-components";
import { loadSession } from "./helpers/localStorageHelper";

import cardsReducer from "./state/reducers/cardsReducer";
import { CardsContext, CardsDispatchContext } from "./context";
import CardBox from "./components/CardBox";
import "./App.css";
import Header from "./components/Header";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4rem 6rem 2rem 22rem 22rem 2rem;
  grid-template-areas:
    "header header"
    "search search"
    "instructions instructions"
    "card-info cards"
    "card-info savedCards"
    "clear-saved-cards clear-saved-cards";
`;

function App() {
  const initialState = {
    cards: [],
    savedCards: [],
    selectedCard: null,
    loading: false,
  };

  const session = (loadSession() && loadSession().cards) || initialState;
  const [cards, dispatch] = useReducer(cardsReducer, session);

  return (
    <CardsContext.Provider value={cards}>
      <CardsDispatchContext.Provider value={dispatch}>
        <Container>
          <Header />
          <CardBox />
        </Container>
      </CardsDispatchContext.Provider>
    </CardsContext.Provider>
  );
}

export default App;
