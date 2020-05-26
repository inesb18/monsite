import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

const theme = {
  peach: '#FB9F89',
  darkPeach: '#E78F7B',
  lightPeach: '#FDC5B8',
  veryLightPeach: '#FFF3F1',
  black: '#393939',
  maxWidth: '1200px',
  outPadding: '2.4rem',
  outPaddingSmall: '1rem',
  heightHeader: '8rem',
  heightHeaderSmall: '6rem',
  innerVerticalPadding: '6rem',
};

const StyledPage = styled.div `
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: ${props => props.theme.black};
  overflow: hidden;
  z-index: 0;
`;

const Inner = styled.main`
  flex: 1 0 auto;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding-top: calc(${props => props.theme.heightHeader} + ${props => props.theme.innerVerticalPadding});
  padding-bottom: ${props => props.theme.innerVerticalPadding};
  width: 80%;
  @media (max-width: 1200px) {
    width: 85%;
  }
  @media (max-width: 992px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 92%;
    padding-top: calc(${props => props.theme.heightHeaderSmall} + ${props => props.theme.innerVerticalPadding});
  }
`;

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
    font-family: 'Reem Kufi', sans-serif;
  }
  h1 {
    font-family: 'Philosopher', sans-serif;
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
          <Header section = {this.props.section} lang={this.props.lang}/>
          <Inner>
            { this.props.children }
          </Inner>
          <Footer lang={this.props.lang} slug={this.props.slug}/>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page;
