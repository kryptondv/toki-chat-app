import React from 'react';

const Button = ({ children, func, icon, addClass }) => {
  return (
    <button className={`btn ${addClass}`} onClick={func}>
      <i className={`btn__icon ${icon}`} />
      {children}
    </button>
  );
};

export default Button;
