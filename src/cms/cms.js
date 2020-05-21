import CMS from 'netlify-cms-app';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import withStyled from "./with-style";

import AboutPreview from "./preview-templates/AboutPreview";

CMS.registerMediaLibrary(cloudinary);


const globalStyle = `
  @font-face {
    font-family: 'Philosopher';
    src: url('/static/fonts/Philosopher/Philosopher-Regular.ttf')
    format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Philosopher';
    src: url('/static/fonts/Philosopher/Philosopher-Bold.ttf')
    format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Reem Kufi';
    src: url('/static/fonts/Reem_Kufi/Reem_Kufi-Regular.ttf')
    format('truetype');
    font-weight: normal;
    font-style: normal;
  }

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
CMS.registerPreviewStyle(globalStyle, { raw: true });

CMS.registerPreviewTemplate("aPropos", withStyled(AboutPreview));
