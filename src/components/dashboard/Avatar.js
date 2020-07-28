import React from 'react';

const Avatar = ({ user }) => {
  return <div>{user.split('')[0]}</div>;
};

export default Avatar;
