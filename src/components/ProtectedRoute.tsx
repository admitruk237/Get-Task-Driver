import { FC, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectTo: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectTo }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!accessToken) {
    return <Navigate to={redirectTo} />;
  }

  console.log('ProtectedRoute accessToken:', accessToken); // Додайте цей рядок
  console.log('ProtectedRoute Outlet rendered'); // Додайте цей рядок
  return <Outlet />;
};

export default ProtectedRoute;
