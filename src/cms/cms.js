import CMS from 'netlify-cms-app';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import AboutPreview from "./preview-templates/AboutPreview";

CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("aPropos", AboutPreview);
