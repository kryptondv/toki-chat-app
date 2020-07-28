import React from 'react';

const Avatar = ({ user }) => {
  return <div className="avatar">{user.split('')[0]}</div>;
};

export default Avatar;
