import React, { ReactChild } from 'react';
import { Layout } from '../../primitives/layout';
import { Reporter } from '../reporter';
import { TopBar } from '../top-bar';
import styles from './runner.module.scss';

interface RunnerPageProps {
  title: string;
  children: ReactChild | ReactChild[];
}
export function RunnerPage(props: RunnerPageProps) {
  return (
    <Layout title={props.title}>
      <TopBar />
      <div className={styles.container}>
        <Reporter />
        {props.children}
      </div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Work+Sans:400,500&display=swap"
      />
      <link rel="stylesheet" href="/css/fontawesome.min.css" />
      <link rel="stylesheet" href="/css/light.min.css" />
      <link rel="stylesheet" href="/css/runner.front.css" />
      <script src="/js/runner.front.js" />
    </Layout>
  );
}
