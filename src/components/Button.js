import React from 'react';
import '../css/Button.css';

const Button = ({ onClick = null, children = null, customStyle = null }) => (
    <button onClick={onClick} className={customStyle} >{children}</button>
)

export default Button;