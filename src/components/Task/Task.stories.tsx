import { action } from '@storybook/addon-actions';
import { Task } from './Task';
import { ChangeEvent } from 'react';

export default {
  title: 'Task Component',
  component: Task,
};

const changeTaskStatusCallBack = (
  todoListId: string,
  taskId: number,
  e: ChangeEvent<HTMLInputElement>
) => {
  action('Status changed inside Task')([
    todoListId,
    taskId,
    e.currentTarget.checked,
  ]);
};

const changeTaskTitleCallBack = (
  todoListId: string,
  taskId: number,
  newTitle: string
) => {
  action('Title changed inside Task')([todoListId, taskId, newTitle]);
};

const removeTaskCallBack = (taskId: number, todoListId: string) => {
  action('Remove Button inside Task clicked')([taskId, todoListId]);
};

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{
          id: 1,
          title: 'React',
          description: 'Its not important task',
          completed: false,
          endDate: '2025-02-27T16:33:37.861Z',
          date: new Date('2025-02-27T16:33:37.861Z'),
          todoId: 'todoListId1',
          order: 0,
          userId: '1',
          priority: 'Low',
          status: 'PENDING',
        }}
        todoListId={'todolistId1'}
        removeTask={removeTaskCallBack}
        changeTaskStatus={(todoListId, taskId, e) =>
          changeTaskStatusCallBack(todoListId, taskId, e)
        }
        changeTaskTitle={(todoListId, taskId, newTitle) =>
          changeTaskTitleCallBack(todoListId, taskId, newTitle)
        }
        priority={'Medium'}
        deadline={null}
      />
      <Task
        task={{
          id: 2,
          title: 'JS',
          description: 'Its not important task',
          completed: false,
          endDate: '2025-02-27T16:33:37.861Z',
          date: new Date('2025-02-27T16:33:37.861Z'),
          todoId: 'todoListId1',
          order: 0,
          userId: '1',
          priority: 'Low',
          status: 'PENDING',
        }}
        todoListId={'todolistId2'}
        removeTask={removeTaskCallBack}
        changeTaskStatus={(todoListId, taskId, e) =>
          changeTaskStatusCallBack(todoListId, taskId, e)
        }
        changeTaskTitle={(todoListId, taskId, newTitle) =>
          changeTaskTitleCallBack(todoListId, taskId, newTitle)
        }
        priority={'Low'}
        deadline={null}
      />
    </>
  );
};
