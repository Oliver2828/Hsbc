import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/pexels.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('login'); // 'login' or 'verify'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (step === 'login') {
        const res = await fetch('https://hsbc-backend-rc6o.onrender.com/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Login failed');
        } else if (data.step === 'verify') {
          setStep('verify');
          setMessage(data.message);
        } else {
          setError('Unexpected response from server.');
        }
      } else if (step === 'verify') {
        const res = await fetch('https://hsbc-backend-rc6o.onrender.com/api/auth/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: code.trim() }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Verification failed');
        } else {
          setMessage(data.message);
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
          localStorage.setItem('isLoggedIn', 'true');
          setTimeout(() => {
            navigate('/user');
          }, 1000);
        }
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-4 border border-gray-200 h-[360px] flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2 text-center">Log on to HSBCnet</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {step === 'login' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  // bbbb
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-red-500" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-red-500 hover:underline">Forgot password?</a>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter code sent to your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? (step === 'login' ? 'Logging in...' : 'Verifying...') : (step === 'login' ? 'Login' : 'Verify')}
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {message && <div className="text-green-600 text-center">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;