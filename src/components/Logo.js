import React from 'react';
import logo from '../assets/logo.png';

const Logo = ({ addClass }) => {
  return <img className={`logo ${addClass}`} src={logo} alt="" />;
}

export default Logo;
