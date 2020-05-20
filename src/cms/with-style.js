/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

import theme from '../components/Page';
import GlobalStyle from '../components/Page';

function StyleInjector({ children }) {
  const [iframeRef, setIframeRef] = useState(null);

  useEffect(() => {
    const iframe = document.getElementsByTagName('iframe')[0];
    const iframeHeadElem = iframe.contentDocument.head;
    setIframeRef(iframeHeadElem);
  }, []);

  return (
    iframeRef && (
      <StyleSheetManager target={iframeRef}>
        {children}
      </StyleSheetManager>
    )
  );
}

export default function withStyled(Comp) {
  return props => (
    // <ThemeProvider theme={theme}>
      <StyleInjector>
        <Comp {...props} />
      </StyleInjector>
    // </ThemeProvider>
  );
}



// import React, { useState, useEffect } from 'react';
// import { StyleSheetManager, ThemeProvider } from 'styled-components';

// import theme from '../components/Page';
// import GlobalStyle from '../components/Page';

// const StylesheetInjector = ({ children }) => {
//   const [iframeRef, setIframeRef] = useState(undefined);

//   useEffect(() => {
//     const iframe = document.querySelector('#nc-root iframe');
//     const iframeHeadElem = iframe && iframe.contentDocument.head;
//     setIframeRef(iframeHeadElem);
//   }, []);

//   return (
//     <div>
//       {iframeRef && (
//         <ThemeProvider theme={theme}>
//           <StyleSheetManager target={iframeRef}>
//             <GlobalStyle/>
//             {children}
//           </StyleSheetManager>
//         </ThemeProvider>
//       )}
//     </div>
//   );
// };

// export default StylesheetInjector;


