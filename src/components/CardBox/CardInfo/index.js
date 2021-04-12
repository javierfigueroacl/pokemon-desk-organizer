import React from "react";
import styled from "styled-components";
import {
  blue,
  softGray,
  lightGray,
  lightestGray
} from "../../../helpers/colors";

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

const Container = styled.div`
  width: calc(25vw);
  grid-area: card-info;
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

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: ${lightGray};
  box-sizing: border-box;
  padding: 0.5rem;
`;

const FieldContainer = styled.span`
  display: flex;
  margin-right: 2rem;
  color: ${blue};
  font-size: 0.8rem;
`;

const Field = styled.span`
  margin: 0 0.5rem 0.5rem 0;
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

export default CardInfo;
