import React, { useState } from 'react'
import TaskForm from '../TaskForm';
import Button from '../../core/Button';
import { useDispatch } from 'react-redux';
import { deleteTask, togglePick } from '../../../redux/features/task';
import './taskdetail.css'

const TaskDetail = (props) => {
    const dispatch = useDispatch()

    const {data} = props;
    const [showDetail, setShowDetail] = useState(false)

    const toggleDetail = () => {
        setShowDetail(!showDetail)
    }

    const onDelete = () => {
        dispatch(deleteTask(data.id))
    }

    return (
        <div className='task-detail'> 
            <div className="task-detail__preview">
                <input type="checkbox" onChange={() => dispatch(togglePick(data.id))} checked={data.isPicked}/>
                <div className="task-detail__title">{data.title}</div>
                <div className="task-detail__actions">
                    <Button onClick={toggleDetail} variant='info'>Detail</Button>
                    <Button variant='danger' onClick={onDelete}>Remove</Button>
                </div>
            </div>
            { 
                showDetail && (
                    <div className="task-detail__form">
                        <TaskForm pre_data={data} action='update'/>
                    </div>
                )
            }
           
        </div>
    )
}

export default TaskDetail
