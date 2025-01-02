import React from 'react';
import Admonition from '@theme/Admonition';
import GithubIcon from '@site/static/images/icos/ico-github.svg';
import { useLocation } from '@docusaurus/router';

const EditPageAdmonition = () => {
  const location = useLocation();
  const baseUrl = "https://github.com/Datasance/docs.datasance.com/edit/main";

  // Remove version segment from the pathname
  const filePath = location.pathname
    .replace(/^\/(v\d+\.\d+\.\d+\/)?/, '') // Remove version segment like "v1.3.3/"
    .replace(/\/$/, '') + '.mdx';          // Ensure the file ends with .mdx

  const editLink = `${baseUrl}/docs/${filePath}`;

  return (
    <Admonition
      type="note"
      icon={<GithubIcon />}
      title="See anything wrong with the document? Help us improve it!"
    >
      <p>
        <a href={editLink} target="_blank" rel="noopener noreferrer">
          Edit this page on GitHub!
        </a>
      </p>
    </Admonition>
  );
};

export default EditPageAdmonition;
