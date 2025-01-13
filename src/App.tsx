import { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './components/TodoList/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';

export type FilteredValuesType = 'All' | 'Active' | 'Completed';
type TodoListType = {
  id: string;
  title: string;
  filter: FilteredValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  function addTask(title: string, todoListId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let task = tasksObj[todoListId];
    let newTasks = [newTask, ...task];
    tasksObj[todoListId] = newTasks;
    setTasksObj({ ...tasksObj });
  }

  function changeFilter(value: FilteredValuesType, todoListId: string) {
    let todoList = todoLists.find((t) => t.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function removeTask(id: string, todoListId: string) {
    let task = tasksObj[todoListId];

    let filterredtTask = task.filter((t) => t.id !== id);
    tasksObj[todoListId] = filterredtTask;

    setTasksObj({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasksObj({ ...tasksObj });
    }
  }
  const todoListId1 = v1();

  const todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'All' },
    { id: todoListId2, title: 'What to buy', filter: 'All' },
  ]);

  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJs', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: false },
    ],
  });

  let removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasksObj({ ...tasksObj });
  };

  const changeTodoListTitle = (taskId: string, newTitle: string) => {
    const todoList = todoLists.find((tl) => tl.id === taskId);
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  const addTodoList = (title: string) => {
    let todoList: TodoListType = {
      id: v1(),
      filter: 'All',
      title: title,
    };

    setTodoLists([todoList, ...todoLists]);
    setTasksObj({ ...tasksObj, [todoList.id]: [] });
  };

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl) => {
        let taskForTodoList = tasksObj[tl.id];
        console.log(taskForTodoList);

        if (tl.filter === 'Completed') {
          taskForTodoList = taskForTodoList.filter((t) => t.isDone === true);
        }

        if (tl.filter === 'Active') {
          taskForTodoList = taskForTodoList.filter((t) => t.isDone === false);
        }
        return (
          <TodoList
            id={tl.id}
            key={tl.id}
            changeStatus={changeStatus}
            addTask={addTask}
            changeFilter={changeFilter}
            removeTask={removeTask}
            title={tl.title}
            tasks={taskForTodoList}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
