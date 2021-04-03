import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

import { softGray, blue } from "../../../helpers/colors";
import Card from "../Card";

const loadingImg = "https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif";

const Container = styled.div`
  width: calc(70vw);
  grid-area: ${props => props.area};
  margin: 2rem;
  border: 1px solid ${softGray};
  border-radius: 0.5rem;
  height: 17rem;
`;

const Loading = styled.img`
  width: 3rem;
  height: 3rem;
`;

const CardList = styled.div`
  display: flex;
  padding: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  width: 95%;
  margin: auto;
  color: gray;
  ${props =>
    !props.areCards &&
    `flex-direction: column;
    justify-content: center;
    align-items: center;`}
`;

const Title = styled.div`
  margin: 0.5rem 0 0 0.5rem;
  padding: 0.5rem;
  color: ${blue};
  font-weight: bold;
`;

const columnName = {
  cards: "Cards List",
  savedCards: "Saved Cards"
};

/* Droppable is a component of the react-beautiful-dnd library, all drop
  actions can only occur within it. The Droppable component also expects
  its child to be a function that returns a React component. Note that we
  use spreading props in this case to the CardList component, since these
  props are used internally by the library. */

const Column = ({ cards, id, loading }) => (
  <Droppable droppableId={id} direction="horizontal">
    {provided => (
      <Container area={id}>
        <Title>{columnName[id]}</Title>
        <CardList
          ref={provided.innerRef}
          {...provided.droppableProps}
          areCards={cards.length > 0}
        >
          {loading && id === "cards" ? (
            <Loading src={loadingImg} />
          ) : (
            [
              cards &&
                cards.map(
                  (item, index) =>
                    item && (
                      <Card
                        data={item}
                        id={item.id}
                        index={index}
                        key={item.id}
                      />
                    )
                ),
              cards && cards.length === 0 && "List is empty"
            ]
          )}
          {provided.placeholder}
        </CardList>
      </Container>
    )}
  </Droppable>
);

const mapStateToProps = state => ({
  loading: state.cards.loading
});

Column.defaultProps = {
  cards: []
};

Column.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  null
)(Column);
