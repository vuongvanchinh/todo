import React, {useEffect} from 'react'
import { uuid} from '../../../utils'
import './textfield.css'


const TextField = (props) => {
    const {
        value, 
        name, 
        id=`text-field--${uuid(5)}`, 
        label, placeholder='', 
        type='text', 
        fullWidth,
        required=false,
        onChange,
        error
    } = props;

    useEffect(() => {
        if(error) {
            document.getElementById(id).focus()
        }
    }, [error])
    const classes = `text-field ${fullWidth && 'text-field--fullWidth'} ${error? 'text-field__error':''}`
    return (
        <div className={classes}>
            <input 
                id={id} type={type} 
                placeholder={placeholder} 
                value={value} name={name} 
                required={required}
                onChange={onChange}
            />
            {error && (
                <p className='error-message'>{error}</p>
            )}
            {label && <label htmlFor={id}>{label}</label>}
        </div>
    )
}

export default TextField
