import React from 'react';
import { motion } from 'framer-motion';
import { Paper } from '@mui/material';
import { useColorMode } from '../../ColorModeContext/ColorModeContext';

type Props = {
  children: React.ReactNode;
  width?: string | number;
};

const AnimatedCard = ({ children, width = '300px' }: Props) => {
  const { mode } = useColorMode();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      <Paper
        sx={{
          backgroundColor: mode === 'dark' ? '#303030' : '#f0f0f0',
          width,
          overflow: 'hidden',
          wordBreak: 'break-word',
        }}
      >
        {children}
      </Paper>
    </motion.div>
  );
};

export default AnimatedCard;
