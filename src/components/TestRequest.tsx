import { useEffect, useState } from 'react';
import {
  CreateTypeTodoListResponseType,
  todoListsApi,
} from '../api/todoListsApi';
import { TodoListType } from '../AppWithRedux';

const TestRequest = () => {
  const [data, setData] = useState<TodoListType[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  );
};

export default TestRequest;
