import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { SetLongOutAC } from '../../state/user-reducer';
import { AppDispatch } from '../../state/store';
import ThemeSwitch from '../ThemeSwitch';
import { STORAGE_KEYS } from '../../utils/constants';

const SignOut = FaSignOutAlt as React.ElementType;

const Header = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(
      SetLongOutAC({
        email: '',
        userName: '',
        password: '',
        accessToken: '',
        refreshToken: '',
      })
    );
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    window.location.reload();
  };

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: '#24292e',
        height: 60,
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          color="inherit"
          component="div"
          sx={{ marginLeft: '20px' }}
        >
          GTD
        </Typography>
        <Box
          sx={{
            width: '150px',
            position: 'relative',
          }}
        >
          <ThemeSwitch />
          <SignOut onClick={handleLogOut} className={styles.longOut} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
