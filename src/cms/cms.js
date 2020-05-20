import CMS from 'netlify-cms-app';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import withStyled from "./with-style";

import AboutPreview from "./preview-templates/AboutPreview";

CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("aPropos", withStyled(AboutPreview));
