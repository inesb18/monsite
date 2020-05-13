import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';


import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const theme = {
  peach: '#FB9F89',
  darkPeach: '#E78F7B',
  lightPeach: '#FDC5B8',
  black: '#393939',
  maxWidth: '1000px',
  outPadding: '2.4rem',
  heightHeader: '8rem',
};

const StyledPage = styled.div `
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.main`
  flex: 1 0 auto;
  width: 100%;
  padding-top: ${props => props.theme.heightHeader};
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

// min-height: calc(100vh + 6rem - 5rem - 4rem - 6rem); //6rem: padding of content, 5rem: height of footer, 4rem: margin-top of footer, 6rem height of header
const GlobalStyle = createGlobalStyle`

  html {
    height: 100%;
    box-sizing: border-box;
    font-size: 12px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    height: 100%;
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
          <Header section = {this.props.section} />
          <Inner>
            { this.props.children }
          </Inner>
          <Footer/>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page;
