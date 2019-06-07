import React from 'react';
import styled from 'styled-components';
import Config from '../../config';

export function TopBar() {
  return (
    <Container>
      <Item>{Config.root}</Item>
    </Container>
  );
}

const Container = styled.div`
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #333;
`;

const Item = styled.div``;
