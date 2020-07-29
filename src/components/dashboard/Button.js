import React from 'react';

const Button = ({ children, func, icon }) => {
  return (
    <button className={'btn'} onClick={func}>
      <i className={`btn__icon ${icon}`} />
      {children}
    </button>
  );
};

export default Button;
