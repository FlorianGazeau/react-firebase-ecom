import React from 'react';
import './Button.css'

const Button = ({ children, ...otherProps }) => {
  return (
    <button {...otherProps}>
      {children}
    </button>
  );
}

export default Button
