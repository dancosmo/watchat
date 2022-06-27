import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import LoadingScreen from '../LoadingScreen';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState({
    text: 'white',
    elementBackground: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.6)',
    navbar: 'navbar-dark',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <AuthContext.Provider value={{ user, theme, setTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
