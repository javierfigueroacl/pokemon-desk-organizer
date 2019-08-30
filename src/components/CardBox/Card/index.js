import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

import { softGray } from "../../../helpers/colors";

const Container = styled.div`
  display: flex;
  margin: 0.5rem;
  border-bottom: 1px solid ${softGray};
  border-radius: 0.5rem;
  background-size: cover;
  background-image: url('${props => props.bgImage}');
`;

const Overlay = styled.div`
  width: 100%;
  background: rgba(247, 248, 252, 0.85);
  border-radius: 0.5rem;
  width: 8rem;
  height: 11rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  text-align: left;
  padding: 0.3rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: bold;
`;

const ScreenName = styled.span`
  color: gray;
  font-size: 0.8rem;
  margin: auto;
`;

/* Draggable is a component of the react-beautiful-dnd library, all drag
  actions can only occur within it. The Draggable component also expects
  its child to be a function that returns a React component. Note that
  we use spreading props in the Container component, since these props
  are used internally by the library. */

const Card = ({ data, id, index }) => {
  const { imageUrl, name, number, series } = data;

  return (
    <Draggable draggableId={id} key={id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id="card"
          bgImage={imageUrl}
        >
          <Overlay>
            <Info>
              <Header>
                <span>{name}</span>
                <ScreenName>{number}</ScreenName>
              </Header>
              <ScreenName>{series}</ScreenName>
            </Info>
          </Overlay>
        </Container>
      )}
    </Draggable>
  );
};

Card.defaultProps = {
  data: {
    text: "No text",
    imageUrl:
      "https://ps.is.tuebingen.mpg.de/assets/noEmployeeImage_md-eaa7c21cc21b1943d77e51ab00a5ebe9.png",
    name: "No name",
    screenName: "NoScreenName"
  }
};

Card.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string,
    createdAt: PropTypes.number,
    user: PropTypes.shape({
      biggerProfileImageURL: PropTypes.string,
      name: PropTypes.string,
      screenName: PropTypes.string
    })
  }),
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default Card;
