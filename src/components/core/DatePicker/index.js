import React, {useRef} from 'react'
import { uuid } from '../../../utils'
import './datepicker.css'
const options = {year: 'numeric', month: 'long', day: 'numeric' };
const DatePicker = (props) => {
    const {
        value = new Date(),
        name,
        label='',
        min,
        error
    } = props
    // const dateInput = useRef(null)
    const {onChange=() => {}} = props;
    let id = uuid(5)
    
    let string = ''
    if (value) {
        string = new Date(value).toLocaleDateString('en-EN', options)
    }
    

    return (
        <div className='date-picker'>
            <label htmlFor={id}>{label}</label>
            <input min={min} onChange={onChange} data-date={string}  id={id} name={name} type="date" value={value}/>
            { error && (
                <p className="error-message">
                    {error}
                </p>
            )}
        </div>
    )
}

export default DatePicker
