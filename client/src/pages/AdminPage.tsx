import { useState, useEffect } from 'react';
import { AdminLogin } from '../components/Admin/AdminLogin';
import { AdminDashboard } from '../components/Admin/AdminDashboard';
import { PageLoader } from '../components/shared/LoadingSpinner';
import axios from 'axios';

export const AdminPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      await axios.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken(token);
    } catch (error) {
      localStorage.removeItem('adminToken');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  if (loading) {
    return <PageLoader />;
  }

  return token ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
};
