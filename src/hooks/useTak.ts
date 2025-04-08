import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppRootStateType } from '../state/store';

const useTask = () => {
  const dispatch = useDispatch();

  const task = useSelector((state: AppRootStateType) => state.tasks);
};
