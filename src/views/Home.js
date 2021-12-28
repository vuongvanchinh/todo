import React from 'react'
import './style/home.css'
import TaskForm from '../components/task/TaskForm'
import TaskList from '../components/task/TaskList'
const Home = () => {
    return (
        <div className='page'>
            <div className="page-limit">
                <div className="container">
                    <div className="left">
                        <h2 className="header">New Task</h2>
                        <div className='form-wraper'>
                            <TaskForm />
                        </div>
                    </div>
                    <div className="right">
                        <h2 className="header">To do</h2>
                        <TaskList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
