import { useContext } from 'react';

// Context
import { UserContext } from '../../context/userContext';

// Routes
import AuthRoutes from '../auth.routes';
import UserRoutes from '../user.routes';

export function Routes() {
  const { user } = useContext(UserContext);

  return user ? <UserRoutes /> : <AuthRoutes />;
}