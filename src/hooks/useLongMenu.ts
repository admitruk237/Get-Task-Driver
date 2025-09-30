import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeTaskDeadlineAC,
  changeTaskPriorityAC,
} from '../state/tasksState/taskActionCreators';
import { Dayjs } from 'dayjs';

export const useLongMenu = (todoListId: string, taskId: number) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPriorityDialog, setOpenPriorityDialog] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState<Dayjs | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>('Medium');

  const dispatch = useDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePriorityClick = () => {
    setOpenPriorityDialog(true);
    handleMenuClose();
  };

  const handlePriorityClose = () => {
    setOpenPriorityDialog(false);
  };

  const handlePriorityConfirm = () => {
    setOpenPriorityDialog(false);
    dispatch(changeTaskPriorityAC(todoListId, taskId, selectedPriority));
  };

  const handleDeadlineClick = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeadlineConfirm = () => {
    setOpenDialog(false);
    dispatch(
      changeTaskDeadlineAC(
        todoListId,
        taskId,
        selectedDeadline?.format('YYYY-MM-DD HH:mm') || ''
      )
    );
  };

  return {
    anchorEl,
    openDialog,
    openPriorityDialog,
    selectedDeadline,
    selectedPriority,
    setAnchorEl,
    setOpenDialog,
    setOpenPriorityDialog,
    setSelectedDeadline,
    setSelectedPriority,
    handleMenuOpen,
    handleMenuClose,
    handlePriorityClick,
    handlePriorityClose,
    handlePriorityConfirm,
    handleDeadlineClick,
    handleDialogClose,
    handleDeadlineConfirm,
  };
};
