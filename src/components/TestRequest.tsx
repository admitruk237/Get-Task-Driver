/* import { useEffect, useState } from 'react';
import { ResponseTypeTodo, Task } from '../types/todo.interface';
import { todoApi } from '../api/todoApi';
import { taskApi } from '../api/taskApi';

export const TestRequest = () => {
  const [todo, setTodo] = useState<ResponseTypeTodo | null>(null);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await todoApi.getTodos();

        console.log('getTodos response:', response); // 🔍 Перевіряємо відповідь сервера

        // 🛠️ Якщо сервер повертає масив, беремо перший елемент
        if (Array.isArray(response) && response.length > 0) {
          setTodo(response[0]);
        } else {
          setTodo(response);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    getTodo();
  }, []);

  const createTodo = async () => {
    try {
      const response = await todoApi.createTodo('New todo');

      console.log('createTodo response:', response); // 🔍 Лог відповіді

      // 🛠️ Якщо сервер загортає todo в data, беремо response.data
      if (response?.data) {
        setTodo(response.data);
      } else {
        setTodo(response);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const createTask = async () => {
    try {
      const response = await taskApi.createTask({
        date: new Date('2025-03-12T13:21:55.344Z'),
        id: 0,
        title: 'string',
        description: 'string',
        endDate: new Date().toISOString(),
        completed: true,
        priority: 'string',
        todoId: todo?.id || 'id',
        order: 0,
        status: 'string',
      });

      console.log('createTask response:', response);

      if (response?.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <button onClick={createTodo}>Create todo</button>
      <button onClick={createTask}>Create task</button>
      <h1>{todo?.title || 'No todo'}</h1>
      <h2>{task?.title || 'No task'}</h2>
    </div>
  );
};
 */
export {};
