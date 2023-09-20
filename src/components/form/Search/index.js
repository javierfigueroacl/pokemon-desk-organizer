import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { blue } from "../../../helpers/colors";
import useTitleSetter from "./useTitleSetter";
import { useCardsDispatch } from "../../../cardContext";
import { getCards } from "../../../state/actions/cardsActions";

let timeout = null;

const Input = styled.input`
  width: 100%;
  font-size: 1.5rem;
  height: 2rem;
  border-bottom: 1px solid ${blue};
  color: gray;
  outline: none;
`;

const Wrapper = styled.div`
  width: 50%;
  grid-area: search;
  margin: auto;
`;

/* The prop is called "input" to differentiate it from the "value"
 property of the event object. */

const Search = ({ placeholder, apiCall }) => {
  const [input, setInput] = useState("");
  useTitleSetter(input.length > 0 ? `Searching "${input}"...` : null);
  const dispatch = useCardsDispatch();

  /* In OnChange, We start a timeout, this timeout is restarted
  when we call the event again, in this way we ensure that the
  api call only occurs when the timeout has ended. */
  const onChange = (event) => {
    event.persist();
    setInput(event.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const { value } = event.target;
      if (value.length > 0) {
        getCards(dispatch, apiCall, value);
      }
    }, 500);
  };

  return (
    <Wrapper>
      <Input
        id="input-search"
        value={input}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

Search.defaultProps = {
  placeholder: "Search...",
};

Search.propTypes = {
  placeholder: PropTypes.string,
  apiCall: PropTypes.func.isRequired,
};

export default Search;
