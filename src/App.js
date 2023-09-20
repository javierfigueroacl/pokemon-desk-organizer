import React from "react";
import styled from "styled-components";
import { CardsProvider } from "./cardContext";
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
  return (
    <CardsProvider>
      <Container>
        <Header />
        <CardBox />
      </Container>
    </CardsProvider>
  );
}

export default App;
