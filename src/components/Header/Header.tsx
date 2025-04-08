import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { SetLongOutAC } from '../../state/user-reducer';
import { AppDispatch } from '../../state/store';

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
      <AppBar position="static" color={'secondary'}>
        <Toolbar variant="dense" sx={{ position: 'relative' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
          <SignOut onClick={longOutHandler} className={styles.longOut} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
