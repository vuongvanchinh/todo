import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { formatDate, wiriteToLocalStorage, validateTask } from '../../utils';

const task = {
    id: 0,
    title: 'Test Alo Alo Alo Alo Todo app programming',
    description: 'Test Alo Alo Alo Alo Todo app programming',
    dateDue: formatDate(),
    priority: 'normal',
    isPicked: false
} 
const initialState = {
  tasks: [],
  startedApp: false

};



export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    startApp: (state) => {
        // validate task
        try {
            let tasks = localStorage.getItem('tasks')
            if (!tasks) {
                state.tasks = []
            } else {
                
                tasks = JSON.parse(tasks)
                if (tasks.length > 0) {
                    for (let i = 0; i < tasks.length; i++) {
                        const rs = validateTask(tasks[i])
                        console.log(rs, tasks[i])
                        if (!rs) {//fail
                            state.tasks = []
                            wiriteToLocalStorage('tasks', state.tasks)
                            return state // end the function 
                        }
                    }

                }
                state.tasks = tasks
                
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            state.startedApp = true
            // alert('All')
            wiriteToLocalStorage('tasks', state.tasks)
            return state
         }
    },
    addNewTask: (state, action) => {
        let l = state.tasks.length
        let id = state.tasks.at(-1)
        if (l === 0) {
            id = 0
        } else {
            id = state.tasks[l - 1].id + 1
        }
        // action.payload.id = id
        state.tasks.push({...action.payload, id: id})
        wiriteToLocalStorage('tasks', state.tasks)
    },
    
  
    updateTask: (state, action) => {
        let index = state.tasks.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
            state.tasks[index] = action.payload
            wiriteToLocalStorage('tasks', state.tasks)
        }
    },

    deleteTask: (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload)
        wiriteToLocalStorage('tasks', state.tasks)
    },
    deleteBulkTasks: (state, action) => {
        let ids = action.payload
        state.tasks = state.tasks.filter(task => !ids.includes(task.id))
        wiriteToLocalStorage('tasks', state.tasks)
    },
    togglePick: (state, action) => {
        
        try {
            let index = state.tasks.findIndex(task => task.id === action.payload)
            state.tasks[index].isPicked = ! state.tasks[index].isPicked 

        } catch (error) {
            console.log(error)
            alert('Error')
        }
    }

  },

});

export const { startApp, addNewTask, updateTask, deleteTask, togglePick, deleteBulkTasks} = taskSlice.actions;


export default taskSlice.reducer;
