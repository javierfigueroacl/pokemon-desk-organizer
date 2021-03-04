import React from "react";
import styled from "styled-components";
import { blue } from "../../helpers/colors";

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  grid-area: header;
  background-color: ${blue};
  padding: 0 3rem;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.span`
  color: white;
  font-size: 1.5rem;
`;

const CreatedBy = styled.span`
  color: white;
  font-size: 1rem;
`;

const Company = styled.h2`
  color: white;
`;

const Header = () => (
  <Content>
    <LeftBox>
      <Title>React Demo</Title>
      <CreatedBy>Javier Figueroa</CreatedBy>
    </LeftBox>
    <Company>XXXX</Company>
  </Content>
);

export default Header;
