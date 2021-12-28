import React, {useState} from 'react'
import Button from '../../core/Button'
import TextField from '../../core/TextField'
import TextArea from '../../core/TextArea'
import DatePicker from '../../core/DatePicker'
import SelectField from '../../core/SelectField'

import { useDispatch } from 'react-redux'
import {priorityOptions} from '../../../contants/task'
import { updateTask, addNewTask } from '../../../redux/features/task'
import { formatDate } from '../../../utils'

import './taskform.css'

// let date = new Date()

const initialState = {
    title: '',
    description: '',
    dateDue: formatDate(),
    priority: 'normal',
    isPicked: false
}

const validate = (data) => {
    let errors = {}
    if (data.title.trim().length === 0) {
        errors.title = 'This field can not empty.'

    }
    if (data.description.trim().length === 0) {
        errors.description = 'This field can not empty.'

    }
    return errors
}

const TaskForm = (props) => {
    const {pre_data=initialState, action='add'} = props
    const [data, setData] = useState(pre_data)
    const [errors, setError] = useState({})

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let error = validate(data)
        console.log(error, data)
        setError(error)
        if  (Object.keys(error).length === 0) {
            if(action === 'add') {
                dispatch(addNewTask(data))
                setData(initialState)
            } else if (action === 'update') {
                dispatch(updateTask(data))
            }
            
        } 
    }
    return (
        <form className={`task-form task-form--${action}`} onSubmit={handleSubmit}>
            <TextField 
                name='title'
                value={data.title}
                placeholder={`${action === 'add'? 'Add new tasks':''}`}
                fullWidth={true}
                onChange={handleChange}
                error = {errors.title}
            />
            <TextArea 
                label='Description'
                value={data.description}
                name='description'
                onChange={handleChange}
                error = {errors.description}
            />
            
            <div className='row' style={{justifyContent: 'space-between'}}>
                <div className='col-5'>
                    <DatePicker min={formatDate()} name='dateDue' label='Date due' onChange={handleChange} value={data.dateDue}/>
                </div>
                {/* <input type="date" name="dateDue" id="dateDue" format="MMM dd yyyy"/> */}
                <div className='col-5'>
                    <SelectField 
                    // fullWidth={true}
                        label= 'Priority'
                        options = {priorityOptions}
                        name='priority'
                        value={data.priority}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <Button type='submit' fullWidth={true}>{action==='add'? 'Add': 'Update'}</Button>
        </form>
    )
}

export default TaskForm
