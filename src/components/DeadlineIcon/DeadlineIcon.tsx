// DeadlineIcon.tsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';

interface DeadlineIconProps {
  deadline: string | null;
}

const DeadlineIcon: React.FC<DeadlineIconProps> = ({ deadline }) => {
  if (!deadline) return null;

  const date = dayjs(deadline);

  const getDeadlineColor = () => {
    const now = dayjs();
    const diffHours = date.diff(now, 'hour');
    if (diffHours >= 24) return 'green';
    if (diffHours >= 5) return 'orange';
    return 'red';
  };

  return (
    <Tooltip title={`Deadline: ${date.format('YYYY-MM-DD HH:mm')}`}>
      <IconButton size="small">
        <AccessTimeIcon
          style={{
            color: getDeadlineColor(),
            fontSize: '16px',
            paddingLeft: '10px',
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default DeadlineIcon;
