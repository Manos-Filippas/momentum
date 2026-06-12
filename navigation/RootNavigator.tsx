import { useAuth } from '../context/AuthContext';
import PublicNavigator from './PublicNavigator';
import AuthenticatedNavigator from './AuthenticatedNavigator';

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedNavigator /> : <PublicNavigator />;
}
