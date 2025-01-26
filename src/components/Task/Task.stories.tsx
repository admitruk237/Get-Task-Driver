import { action } from '@storybook/addon-actions';
import { Task } from './Task';
import { ChangeEvent } from 'react';

export default {
  title: 'Task Component',
  component: Task,
};

const changeTaskStatusCallBack = (
  todoListId: string,
  taskId: string,
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
  taskId: string,
  newTitle: string
) => {
  action('Title changed inside Task')([todoListId, taskId, newTitle]);
};

const removeTaskCallBack = (taskId: string, todoListId: string) => {
  action('Remove Button inside Task clicked')([taskId, todoListId]);
};

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{ id: '1', title: 'HTML', isDone: true }}
        todoListId={'todolistId1'}
        removeTask={removeTaskCallBack}
        changeTaskStatus={(todoListId, taskId, e) =>
          changeTaskStatusCallBack(todoListId, taskId, e)
        }
        changeTaskTitle={(todoListId, taskId, newTitle) =>
          changeTaskTitleCallBack(todoListId, taskId, newTitle)
        }
      />
      <Task
        task={{ id: '2', title: 'JS', isDone: false }}
        todoListId={'todolistId2'}
        removeTask={removeTaskCallBack}
        changeTaskStatus={(todoListId, taskId, e) =>
          changeTaskStatusCallBack(todoListId, taskId, e)
        }
        changeTaskTitle={(todoListId, taskId, newTitle) =>
          changeTaskTitleCallBack(todoListId, taskId, newTitle)
        }
      />
    </>
  );
};
