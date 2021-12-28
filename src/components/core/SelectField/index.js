import React, {useEffect, useMemo, useRef} from 'react'

import './selectfield.css'

const SelectField = (props) => {
    const {options,  value, error, onChange=() => {}, name='select', label} = props
    const listOptionRef = useRef(null)
    const selectBox = useRef(null)

    useEffect(() => {
        const f = (e) => {
            // console.log("🚀 ~ file: index.js ~ line 12 ~ f ~ e", e)
            if (selectBox && selectBox.current && selectBox.current.contains(e.target)) {
                listOptionRef.current.classList.toggle('select-box-close')
            } else if (listOptionRef && listOptionRef.current && !listOptionRef.current.contains(e.target) ) {
                listOptionRef.current.classList.add('select-box-close')
            }

        }
        document.addEventListener('mousedown', f)

        return () => {
            document.removeEventListener('mousedown', f)
        }

    
    }, [])
    const onSelect = (i) => {
        const e = {
            target: {name: name, value:options[i].value}
        }
        onChange(e)
        listOptionRef.current.classList.add('select-box-close')
    }
    const selected = useMemo(()=> {
        let index = options.findIndex(item => item.value === value)
        if (index !== -1) {
            return options[index]
        }

        return {value: '', content: ''}

    }, [value, options])
    
   

    return (
        <div className='select-field'>
            <p className='select-field__label'>{label}</p>
            <div  className='select-box'>
                <p ref={selectBox}>{selected.content}</p>
                <ul ref={listOptionRef} className='select-box-close'>
                    {
                        options.map((option, index) => (
                            <li key={index} onClick={() => onSelect(index)}
                                className={`option-label ${selected.value === option.value? 'option-label--selected':''}`} 
                            >
                                {option.content}
                            </li>
                        ))
                    }
                </ul>
            </div>
            
        </div>
    )
}

export default SelectField
