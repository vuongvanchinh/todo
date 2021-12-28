import { configureStore } from '@reduxjs/toolkit';

import tasks from './features/task';
export const store = configureStore({
  reducer: {
    app: tasks,
  },
});
