import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <p style={textStyles}>© 2023 Your Company. All rights reserved.</p>
    </footer>
  );
};

const footerStyles = {
  backgroundColor: '#007BFF',
  color: '#fff',
  padding: '10px',
  textAlign: 'center',
};

const textStyles = {
  fontSize: '14px',
};

export default Footer;