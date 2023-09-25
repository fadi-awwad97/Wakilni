import React from 'react';

function Error() {
  const errorContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  const errorHeadingStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
  };

  const errorMessageStyle = {
    fontSize: '1.5rem',
  };

  return (
    <div style={errorContainerStyle}>
      <h1 style={errorHeadingStyle}>Oops!</h1>
      <p style={errorMessageStyle}>Something went wrong.</p>
    </div>
  );
}

export default Error;