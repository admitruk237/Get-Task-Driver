import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { SetLongOutAC } from '../../state/user-reducer';
import { AppDispatch } from '../../state/store';
import ThemeSwitch from '../ThemeSwich/ThemeSwich';

const SignOut = FaSignOutAlt as React.ElementType;
function Header() {
  const dispatch: AppDispatch = useDispatch();

  const longOutHandler = () => {
    dispatch(
      SetLongOutAC({
        email: '',
        userName: '',
        password: '',
        accessToken: '',
        refreshToken: '',
      })
    );
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#24292e',
          height: 60,
          boxShadow: 'none',
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
          <div
            style={{
              width: '150px',
              position: 'relative',
            }}
          >
            <ThemeSwitch />
            <SignOut onClick={longOutHandler} className={styles.longOut} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
