import style from './styles.module.css';
import { motion } from 'framer-motion';
import { Button, TextField, Typography } from '@mui/material';

import MyAnimation from '../MyAnimation/MyAnimation';
import SingInUp from '../SingInUp/SingInUp';

function Login() {
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
          <SingInUp />
        </div>
        <MyAnimation />
      </div>
    </div>
  );
}

export default Login;
