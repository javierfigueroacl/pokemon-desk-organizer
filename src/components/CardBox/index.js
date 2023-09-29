import React from "react";
import styled from "styled-components";

import { blue } from "../../helpers/colors";
import CardSearch from "./CardSearch";
import CardManager from "./CardManager";

const Instructions = styled.div`
  grid-area: instructions;
  text-align: center;
  color: ${blue};
`;

// DragDropContext is a component of the react-beautiful-dnd library, all
// drag and drop actions can only occur within it.
const CardBox = () => {
  return (
    <>
      <CardSearch />
      <Instructions>
        Move cards to the right column to save them. You can delete them by
        returning them to the left column.
      </Instructions>
      <CardManager />
    </>
  );
};

export default CardBox;
