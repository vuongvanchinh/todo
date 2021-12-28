import React from 'react'
import { uuid} from '../../../utils'
import './textarea.css'


const TextArea = (props) => {
    const {
        value, 
        name, 
        id=`textarea--${uuid(5)}`, 
        label, placeholder='', 
        type='text', 
        fullWidth=true,
        required=false,
        readOnly=false,
        onChange,
        error
    } = props;

    const classes = `textarea ${fullWidth && 'textarea--fullWidth'} ${error? 'textarea__error':''}`
    return (
        <div className={classes}>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea 
                id={id} type={type} 
                placeholder={placeholder} 
                value={value} name={name} 
                required={required} readOnly={readOnly}
                onChange={onChange}
            >
            </textarea>
            {error && (
                <p className='error-message'>{error}</p>
            )}
            
        </div>
    )
}

export default TextArea
