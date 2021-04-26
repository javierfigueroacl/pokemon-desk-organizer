import React from "react";
import styled from "styled-components";

import Info from "./Info";
import { blue, lightGray, lightestGray } from "../../../helpers/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1rem;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: ${lightestGray};
  margin: 1rem;
  color: ${blue};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
`;

const Image = styled.div`
background-color: ${lightGray};
background-image: url('${props => props.bgImage}');
background-size: cover;
width: 16rem;
height: 22.5rem;
border: 4px solid ${lightGray};
border-radius: 0.5rem;
`;

const CardContainer = ({ selectedCard }) => (
  <Wrapper>
    <>
      <Header>
        <div>
          <b>{selectedCard.name}</b>
        </div>
        {selectedCard.hp && (
          <div>
            <b>HP:</b> {selectedCard.hp}
          </div>
        )}
      </Header>
      <div style={{ height: "0.5rem" }} />
      <Image bgImage={selectedCard.imageUrl} />
      <div style={{ height: "1rem" }} />
      <Info
        data={[
          { field: "Number", text: selectedCard.number },
          {
            field: "National Pokedex Number",
            text: selectedCard.nationalPokedexNumber
          },
          { field: "Rarity", text: selectedCard.rarity },
          { field: "Series", text: selectedCard.series },
          { field: "Set", text: selectedCard.set },
          { field: "Supertype", text: selectedCard.supertype }
        ]}
      />
      <div style={{ height: "2rem" }} />
      <div>
        Artist: <b>{selectedCard.artist}</b>
      </div>
    </>
  </Wrapper>
);

export default CardContainer;
