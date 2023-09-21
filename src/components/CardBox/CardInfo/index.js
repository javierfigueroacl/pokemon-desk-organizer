import React from "react";
import styled from "styled-components";

import CardContainer from "./CardContainer";
import { blue } from "../../../helpers/colors";

const Container = styled.div`
  width: calc(25vw);
  grid-area: card-info;
`;

const EmptyContainer = styled.div`
  margin: auto;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  color: ${blue};
  font-size: 1.4rem;
`;

const Description = styled.div`
  color: gray;
  font-size: 1rem;
  line-height: 2rem;
`;

const CardInfo = ({ selectedCard }) => (
  <Container>
    {selectedCard ? (
      <CardContainer selectedCard={selectedCard} />
    ) : (
      <EmptyContainer>
        <Title>Pokémon Desk Card Organizer</Title>
        <div style={{ height: "2rem" }} />
        <Description>
          This tool is for helping you to organize a desk for the Pokémon
          Trading Card Game. You can search for cards and save them in your
          desk. (Your desk will be automatically saved and your cards will not
          disappear if you close the browser)
        </Description>
        <div style={{ height: "1rem" }} />
        <Description>
          This project is open source. You can see my repository on GitHub.
        </Description>
      </EmptyContainer>
    )}
  </Container>
);

export default React.memo(CardInfo);
