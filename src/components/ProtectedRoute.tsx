import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';

interface ProtectedRouteProps {
  redirectTo: string; // Маршрут, на який користувач буде редіректитися, якщо не авторизований
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const AauthStatus = useSelector<AppRootStateType, boolean | undefined>(
    (state) => state.user.authStatus
  );

  if (AauthStatus === false) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
