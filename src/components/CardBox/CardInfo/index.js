import React from "react";
import styled from "styled-components";
import { blue, softGray } from "../../../helpers/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  grid-area: card-info;
  color: white;
  border-radius: 1rem;
  width: calc(25vw);
  height: 100%;
  padding: 1rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${blue};
  font-size: 1.5rem;
`;

const Image = styled.div`
  background-image: url('${props => props.bgImage}');
  background-size: cover;
  width: 16rem;
  height: 22.5rem;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const FieldContainer = styled.span`
  display: flex;
  margin-right: 2rem;
  color: ${blue};
  font-size: 0.8rem;
`;

const Field = styled.span`
  margin-right: 0.5rem;
  font-weight: bold;
`;

const Info = ({ data }) => (
  <InfoContainer>
    {data.map(
      item =>
        item.text && (
          <FieldContainer>
            <Field>{item.field}:</Field>
            <span>{item.text}</span>
          </FieldContainer>
        )
    )}
  </InfoContainer>
);

const CardInfo = ({ selectedCard }) => (
  <Container>
    {selectedCard && (
      <>
        <Header>
          <div>{selectedCard.name}</div>
          <div>HP: {selectedCard.hp}</div>
        </Header>
        <Image bgImage={selectedCard.imageUrl} />
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
      </>
    )}
  </Container>
);

export default CardInfo;
