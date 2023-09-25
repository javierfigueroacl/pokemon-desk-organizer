import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useDebouncedRefetch from "./useDebouncedRequest";

import { blue } from "../../../helpers/colors";
import useTitleSetter from "./useTitleSetter";

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
  const [input, setInput] = useState(null);
  useTitleSetter(input && input.length > 0 ? `Searching "${input}"...` : null);

  useDebouncedRefetch(apiCall, input);

  const onChange = (event) => {
    setInput(event.target.value);
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

export default React.memo(Search);
