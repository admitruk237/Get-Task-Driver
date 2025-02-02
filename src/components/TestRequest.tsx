import { useEffect, useState } from 'react';
import { todoListsApi, TodoListType } from '../api/todoListsApi';

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

      setData((prevData) => {
        const exists = prevData.some((todo) => todo.id === newTodo.id);
        return exists ? prevData : [...prevData, newTodo]; // Додаємо, якщо ще немає
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
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>

      <div className="create-todo-list">
        <h3>Create Todo</h3>
        <button onClick={createTodoList}>Add New Todo</button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </>
  );
};

export default TestRequest;
