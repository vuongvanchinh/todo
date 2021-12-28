import React from 'react'
import './button.css'

const Button = ({children, variant='contained', onClick=() => {}, style={}, fullWidth=false, disabled=false, type='button', size='small'}) => {
    const classes = `button button--${size} button--${variant} ${fullWidth? 'button--fullwidth':''}`;

    return (
        <button type={type} onClick={onClick} className={classes} style={style} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button
