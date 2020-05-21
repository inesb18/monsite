/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

import GlobalStyle from '../components/Page';

function StyleInjector({ children }) {
  const [iframeRef, setIframeRef] = useState(null);

  useEffect(() => {
    const iframe = document.getElementsByTagName('iframe')[0];
    const iframeHeadElem = iframe.contentDocument.head;
    setIframeRef(iframeHeadElem);
  }, []);

  return (
   iframeRef &&
      <ThemeProvider
        theme={{  peach: '#FB9F89',
                  darkPeach: '#E78F7B',
                  lightPeach: '#FDC5B8',
                  veryLightPeach: '#FFF3F1',
                  black: '#393939',
                  maxWidth: '1200px',
                  outPadding: '2.4rem',
                  outPaddingSmall: '1rem',
                  heightHeader: '8rem',
                  heightHeaderSmall: '6rem',
                  innerVerticalPadding: '6rem' }}
      >
        <StyleSheetManager target={iframeRef}>
          {children}
        </StyleSheetManager>
      </ThemeProvider>
  );
}

export default function withStyled(Comp) {
  return props => (
      <StyleInjector>
        <Comp {...props} />
      </StyleInjector>
  );
}


