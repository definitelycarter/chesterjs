import { resolveFiles } from '@chester/chester';
import path from 'path';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Config from '../../config';
import { runSuite } from '../ipc';

export function SuiteList() {
  const [suites, setSuites] = useState<Suite[]>([]);
  useEffect(() => {
    resolveFiles(Config).then(matches => {
      const suites = matches.map(match => {
        return {
          name: path.basename(match),
          path: match,
        };
      });
      setSuites(suites);
    });
  }, []);

  function renderSuites(suites: Suite[]) {
    return suites.map(suite => (
      <div key={suite.path}>
        <Item onClick={() => runSuite(suite.path)}>{suite.name}</Item>
      </div>
    ));
  }

  return <Container>{renderSuites(suites)}</Container>;
}

export const Container = styled.div`
  padding: 5px 10px;
`;

type Suite = { name: string; path: string };

export const SuiteItem = styled.div``;

export const Item = styled.button`
  appearance: none;
  cursor: pointer;
  outline: none;
  border: 0px;
  color: blue;
`;
