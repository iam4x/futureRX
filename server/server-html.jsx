import React from 'react'

type Props = {
  assets: {};
  locale: string;
  body: string;
  appState: string;
  css: string;
};

const ServerHTML = ({ assets, locale, body, appState, css }: Props) => (
  <html lang={ locale }>
    <head>
      <meta charSet='utf-8' />
      <link rel='icon' type='image/ico' href='/favicon.ico' />

      { /* Global bundled styles */ }
      { assets.style.map((href, idx) =>
        <link key={ idx } rel='stylesheet' href={ href } />) }

      { /* Critical rendered styles */ }
      <style
        type='text/css'
        dangerouslySetInnerHTML={ { __html: css } } />
    </head>
    <body>
      <div id='app--container' dangerouslySetInnerHTML={ { __html: body } } />

      { /* bundled js + app state */ }
      <script dangerouslySetInnerHTML={ { __html: `window.__appState__ = ${appState}` } } />
      <script src={ assets.script[0] } />

      { /* external js */ }
      <script
        async={ true }
        defer={ true }
        id='github-bjs'
        src='https://buttons.github.io/buttons.js' />
    </body>
  </html>
)

export default ServerHTML
