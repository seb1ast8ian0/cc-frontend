import { ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
  }
  
function ProtectedRoute(props: ProtectedRouteProps) {

    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return props.children;
}
  
  export default ProtectedRoute;