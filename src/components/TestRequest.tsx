import { useEffect, useState } from 'react';
import { todoListsApi } from '../api/todoListsApi';
import { TodoListType } from '../App';
import { taskListApi } from '../api/taskListApi';

const TestRequest = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  /* 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await todoListsApi.getTodoLists();
        setData(response.data); // Оновлюємо стан отриманими тудолістами
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const createTodoList = async () => {
    try {
      const response = await todoListsApi.createTodoList('New Todo List');
      const newTodo = response.data;

      setData((prevData: any[]) => {
        const exists = prevData.some(
          (todo) => todo.id === newTodo.data.item.id
        );
        return exists ? prevData : [...prevData, newTodo]; // Додаємо, якщо ще немає
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const deleteTodoList = async (todoListId: string) => {
    try {
      await todoListsApi.deleteTodoList(todoListId);

      setData((prevData: any[]) => {
        return prevData.filter((todo) => todo.id !== todoListId); // Видаляємо
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="get-todo-lists">
        <h3>Test API Request</h3>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => deleteTodoList(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="create-todo-list">
        <h3>Create Todo</h3>
        <button onClick={createTodoList}>Add New Todo</button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
    </>
  ); */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await taskListApi.getTaskLists(
          '13e76ced-3826-40a6-9f0f-98c6199b362f'
        );
        setData(response.data); // Оновлюємо стан отриманими тудолістами
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const createTask = async () => {
    try {
      const response = await taskListApi.createTask(
        '13e76ced-3826-40a6-9f0f-98c6199b362f',
        'New Todo List'
      );
      const newTask = response.data.item;
      setData((prevData: any[]) => {
        const exists = prevData.some((task) => task.id === newTask.id);
        return exists ? prevData : [...prevData, newTask]; // Додаємо, якщо ще немає
      });
    } catch (error: any) {
      setError(error.message);
    }
  };
  const deleteTask = async (todolistId: string, taskId: string) => {
    try {
      await taskListApi.deleteTask(todolistId, taskId);

      setData((prevData: any[]) => {
        return prevData.filter((task) => task.id !== taskId); //
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const changeTaskTitle = async (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    try {
      await taskListApi.updateTask(todolistId, taskId, title);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="get">
        <h1>{JSON.stringify(data)}</h1>
        <h2>{error !== null ? error : null}</h2>
      </div>
      <div className="create">
        <button onClick={createTask}>Create Task</button>
      </div>
      <div className="delete">
        <button
          onClick={() =>
            deleteTask(
              '13e76ced-3826-40a6-9f0f-98c6199b362f',
              'e4855fc7-b62d-46d1-8a60-a256cd8915ba'
            )
          }
        >
          Delete Task
        </button>
        <button
          onClick={() =>
            changeTaskTitle(
              '13e76ced-3826-40a6-9f0f-98c6199b362f',
              '9b1933e5-185b-4cbe-a29e-32584ccc79e6',
              'dddddddddddddddd'
            )
          }
        >
          Change Task Title
        </button>
      </div>
    </div>
  );
};
export default TestRequest;
