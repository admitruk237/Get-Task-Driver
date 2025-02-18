import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';

import style from './styles.module.css';
import { motion } from 'framer-motion';

function SignInUp() {
  const [value, setValue] = React.useState('signUp');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="Sign In and Sign Up tabs"
      >
        <Tab
          sx={{ width: '50%', color: 'black' }}
          value="signUp"
          label="Sign Up"
        />
        <Tab
          sx={{ width: '50%', color: 'black' }}
          value="signIn"
          label="Sign In"
        />
      </Tabs>

      {value === 'signIn' && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: value === 'signIn' ? 'auto' : 0 }}
          transition={{ duration: 0.5 }}
          style={{ overflow: 'hidden' }}
        >
          <Box className={style.formContainer}>
            <TextField
              sx={{ width: 300 }}
              label="Username"
              variant="standard"
            />
            <TextField
              sx={{ width: 300 }}
              label="Password"
              type="password"
              variant="standard"
            />
            <Button variant="contained" color="primary" sx={{ mt: 3 }}>
              Sign-In
            </Button>
          </Box>
        </motion.div>
      )}

      {value === 'signUp' && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: value === 'signUp' ? 'auto' : 0 }}
          transition={{ duration: 0.5 }}
          style={{ overflow: 'hidden' }}
        >
          <Box className={style.formContainer}>
            <TextField sx={{ width: 300 }} label="Email" variant="standard" />
            <TextField
              sx={{ width: 300 }}
              label="Username"
              variant="standard"
            />
            <TextField
              sx={{ width: 300 }}
              label="Password"
              type="password"
              variant="standard"
            />
            <TextField
              sx={{ width: 300 }}
              label="Confirm Password"
              type="password"
              variant="standard"
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Sign-Up
            </Button>
          </Box>
        </motion.div>
      )}
    </Box>
  );
}

export default SignInUp;
