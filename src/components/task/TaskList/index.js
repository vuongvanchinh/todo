import React, {useState, useEffect, useMemo} from 'react'
import TextField from '../../core/TextField'
import Button from '../../core/Button'
import TaskDetail from '../TaskDetail'
import {useSelector, useDispatch} from 'react-redux'
import {  deleteBulkTasks, startApp } from '../../../redux/features/task'
import { dateCompare } from '../../../utils'

import './tasklist.css'

const priority = {
    low: 0,
    normal: 1,
    high: 2

}
const TaskList = () => {
    const {startedApp, tasks} = useSelector(state => state.app)
    const [query, setQuery] = useState('')
    const handleQuery = (e) => {
        setQuery(e.target.value)
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startApp())
    }, [])

    
    const tasksShow = useMemo(() => {
        let result = []
        if (query === '') {
            result = [...tasks]
        } else {
            result = tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()))
        }
        if (result) {
            result.sort((a, b) => {
                // console.log(a, b)
                let d = dateCompare(a.dateDue, b.dateDue)
                console.log("🚀 ~ file: index.js ~ line 40 ~ result.sort ~ d", d)
                // console.log(d)
                if (d !== 0) {
                    return d
                }            
                return priority[b.priority] - priority[a.priority]            
            })
        }
        
        return result
    }, [tasks, query])

    const showBulkAction = useMemo(() => {
        for (let i = 0; i < tasksShow.length; i++) {
            if (tasksShow[i].isPicked) {
                return true
            }       
        }
        return false
    }, [tasksShow])
    
    const bulkDelete = () => {
        let ids = []
        for(let i = 0; i <  tasksShow.length; i++) {
            if (tasksShow[i].isPicked) {
                ids.push(tasksShow[i].id)
            }
            dispatch(deleteBulkTasks(ids))

        }
    }
    
    if (! startedApp) {
        return <div>
            đang khởi tạo
        </div>
    }

    return (
        <div className='task-list-container'>
            <div className='task-list-top'>
                <TextField placeholder='Search...' fullWidth={true} value={query} onChange={handleQuery}/>
                <div className="task-list">
                    { 
                        tasksShow.map((task, index) => (
                            <TaskDetail data={task} key={task.id}/>
                        ))
                    }
                    {
                        query && tasksShow.length === 0? (
                            <p>{`No task has a title containing '${query}'.`}</p>
                        ):(
                            tasks.length === 0? (
                                <p>There are no tasks.</p>
                            ):null
                        )
                    }
                    
                </div>
            </div>
            <div className="flexible"></div>
            {
                showBulkAction && (
                    <div className="bulk-actions">
                        <span>Bulk actions:</span>
                        <div className="bulk-actions__action">
                            <Button onclick={() => alert('Not installed yet')} size='lagre' variant='primary'>Done</Button>
                            <Button onClick={bulkDelete} size='lagre' variant='danger'>Remove</Button>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default TaskList
