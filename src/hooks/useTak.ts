import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { TasksStateType } from '../types/todo.interface';

const useTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  return {
    tasks,
    dispatch,
  };
};

export default useTask;
