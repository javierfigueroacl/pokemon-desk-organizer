import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { useCardsDispatch } from "../../../cardContext";

import { softGray } from "../../../helpers/colors";
import { sendSelectedCardData } from "../../../state/actions/cardsActions";

const Container = styled.div`
  display: flex;
  margin: 0.5rem;
  border-bottom: 1px solid ${softGray};
  border-radius: 0.5rem;
  background-size: cover;
  background-image: url("${(props) => props.bgImage}");
`;

const Overlay = styled.div`
  width: 100%;
  background: rgba(247, 248, 252, 0.85);
  border-radius: 0.5rem;
  width: 8rem;
  height: 11rem;
  cursor: pointer;
`;

/* Draggable is a component of the react-beautiful-dnd library, all drag
  actions can only occur within it. The Draggable component also expects
  its child to be a function that returns a React component. Note that
  we use spreading props in the Container component, since these props
  are used internally by the library. */

const Card = ({ data, id, index }) => {
  const dispatch = useCardsDispatch();
  const handleOnMouseEnter = () => dispatch(sendSelectedCardData(data));

  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id="card"
          bgImage={data.imageUrl}
          onMouseEnter={handleOnMouseEnter}
        >
          <Overlay />
        </Container>
      )}
    </Draggable>
  );
};
Card.defaultProps = {
  data: {
    imageUrl:
      "https://ps.is.tuebingen.mpg.de/assets/noEmployeeImage_md-eaa7c21cc21b1943d77e51ab00a5ebe9.png",
    name: "No name",
    screenName: "NoScreenName",
  },
};

Card.propTypes = {
  data: PropTypes.shape({
    imageUrl: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
