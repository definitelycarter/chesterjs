import React, { ReactChild } from 'react';

interface LayoutProps {
  title: string;
  children: ReactChild | ReactChild[];
}
export function Layout(props: LayoutProps) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="/css/reset.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
