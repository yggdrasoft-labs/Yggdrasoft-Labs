import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';

interface LoginForm {
  username: string;
  password: string;
}

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('adminToken', response.data.token);
      onLogin(response.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary px-4">
      <div className="max-w-md w-full bg-background-secondary rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Login</h1>
          <p className="text-text-secondary">Access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-text-primary mb-2 font-medium">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                {...register('username', { required: 'Username is required' })}
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-background-primary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Enter username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-text-primary mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-background-primary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Enter password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};
