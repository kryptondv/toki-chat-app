import React from 'react';

const Button = ({ children, func }) => {
  return <button className="btn" onClick={func}>{children}</button>;
};

export default Button;
