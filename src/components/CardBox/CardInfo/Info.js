import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { blue, lightGray } from "../../../helpers/colors";

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
          <FieldContainer key={item.field}>
            <Field>{item.field}:</Field>
            <span>{item.text}</span>
          </FieldContainer>
        )
    )}
  </InfoContainer>
);

Info.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      text: PropTypes.text
    })
  ).isRequired
};

export default Info;
