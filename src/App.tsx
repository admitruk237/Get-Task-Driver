import { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './components/TodoList/TodoList';
import { v1 } from 'uuid';

export type FilteredValuesType = 'All' | 'Active' | 'Completed';

function App() {
  const task1 = [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJs', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ];

  console.log(task1);

  let [task, setTask] = useState<Array<TaskType>>(task1);
  let [filter, setFilter] = useState<FilteredValuesType>('All');

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...task];
    setTask(newTasks);
  }

  function changeFilter(value: FilteredValuesType) {
    setFilter(value);
  }

  let taskForTodoList = task;
  if (filter === 'Completed') {
    taskForTodoList = task.filter((t) => t.isDone === true);
  }

  if (filter === 'Active') {
    taskForTodoList = task.filter((t) => t.isDone === false);
  }

  function removeTask(id: string) {
    let filterretTask = task.filter((t) => t.id !== id);
    setTask(filterretTask);
  }

  return (
    <div className="App">
      <TodoList
        addTask={addTask}
        changeFilter={changeFilter}
        removeTask={removeTask}
        title="What to learn"
        tasks={taskForTodoList}
      />
    </div>
  );
}

export default App;
