import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CardsCreators from "../../../state/actions/cardsActions";
import { useCardsDispatch } from "../../../context";

import { softGray } from "../../../helpers/colors";

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

  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id="card"
          bgImage={data.imageUrl}
          onMouseEnter={() =>
            dispatch({ type: "SEND_SELECTED_CARD_DATA", data })
          }
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

function mapDispatchToProps(dispatch) {
  const combiner = { ...CardsCreators, dispatch };
  return bindActionCreators(combiner, dispatch);
}

export default connect(null, mapDispatchToProps)(Card);
