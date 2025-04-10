import style from './styles.module.css';
import { Box, colors, Tab, Tabs } from '@mui/material';
import MyAnimation from '../../components/MyAnimation/MyAnimation';
import { useState } from 'react';
import SingUp from '../../components/SingUp/SingUp';
import SignIn from '../../components/SignIn/SignIn';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useColorMode } from '../../components/ColorModeContext/ColorModeContext';

function Login() {
  const [value, setValue] = useState('signUp');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { mode } = useColorMode();

  const tabTextColor = {
    color: mode === 'dark' ? colors.grey[50] : colors.grey[900],
  };

  return (
    <div className={style.wrapper}>
      <PageTitle
        title="GET TASK DRIVER"
        subTitle="Welcome! Please log in to your account or sign up to access all the
        features of our service."
      />
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
              aria-label="Sign In and Sign Up tabs"
            >
              <Tab
                sx={{ width: '50%', ...tabTextColor }}
                value="signUp"
                label="Sign Up"
              />
              <Tab
                sx={{ width: '50%', ...tabTextColor }}
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
