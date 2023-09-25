import React from "react";
import styled from "styled-components";
import { QueryClientProvider, QueryClient } from "react-query";

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CardsProvider>
        <Container>
          <Header />
          <CardBox />
        </Container>
      </CardsProvider>
    </QueryClientProvider>
  );
}

export default App;
