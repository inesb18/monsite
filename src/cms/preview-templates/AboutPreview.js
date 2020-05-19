import React from "react";
import PropTypes from "prop-types";
import { AboutTemplate } from "../../templates/a-propos";

const AboutPreview = ({ entry, widgetFor }) => (
  <AboutTemplate
    page={{
      frontmatter: entry.getIn(["data"]).toJS(),
      html: entry.getIn(["data", "body"]),
      bodyIsMarkdown: true,
    }}
  />
);

AboutPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default AboutPreview;
