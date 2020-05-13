import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';


// import Header from '../components/Header';
// import Header from '../components/Header';
import SEO from '../components/SEO';

const theme = {
  peach: '#FB9F89',
  darkPeach: '#E78F7B',
  lightPeach: '#FDC5B8',
  black: '#393939',
  maxWidth: '1000px',
};

const StyledPage = styled.div `
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.main`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Reem Kufi', sans-serif;
  }
  h1 {
    font-family: 'Philosopher', sans-serif;
    letter-spacing: 0.3rem;
    font-weight: normal;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

class Page extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <SEO title="Inès Belghiti"/>
        <GlobalStyle/>
        <StyledPage>

          <Inner>
            { this.props.children }
          </Inner>

        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page;
