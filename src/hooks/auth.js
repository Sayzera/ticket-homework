import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        navigate('/login');
      }
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};
