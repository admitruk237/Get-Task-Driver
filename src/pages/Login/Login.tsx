import style from './styles.module.css';
import { motion } from 'framer-motion';
import { Box, Button, Tab, Tabs, TextField, Typography } from '@mui/material';

import MyAnimation from '../../components/MyAnimation/MyAnimation';
import SingInUp from '../../components/SingUp/SingUp';
import { useState } from 'react';
import SingUp from '../../components/SingUp/SingUp';
import SignIn from '../../components/SignIn/SignIn';

function Login() {
  const [value, setValue] = useState('signUp');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className={style.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <Typography variant="h4" component="h1" align="center">
          GET TASKS DRIVER
        </Typography>
        <Typography
          style={{ paddingTop: '20px' }}
          variant="body1"
          align="center"
        >
          Welcome! Please log in to your account or sign up to access all the
          features of our service.
        </Typography>
      </motion.div>
      <div className={style.registration}>
        <div className={style.container}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
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

            <SingUp value={value} setTab={setValue} />
            <SignIn value={value} />
          </Box>
        </div>
        <MyAnimation />
      </div>
    </div>
  );
}

export default Login;
