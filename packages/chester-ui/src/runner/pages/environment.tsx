import React, { ReactChild } from 'react';

interface LayoutProps {
  children?: ReactChild | ReactChild[];
}
export function EnvironmentPage(props: LayoutProps) {
  return (
    <html>
      <head>
        <script src="/chester.js" />
        <script src="/js/mocha.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              mocha.setup('bdd');
              mocha.reporter(window.parent.Reporter);
            `,
          }}
        />
        {props.children}
      </head>
      <body>
        <div id="root" />
      </body>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            mocha.run();
            `,
        }}
      />
    </html>
  );
}
