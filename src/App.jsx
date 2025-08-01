import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import freshCartLogo from './assets/Images/freshcart-logo.svg';

function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full flex justify-between items-center h-16 px-8 border-b bg-white">
      <div className="flex items-center cursor-pointer select-none" onClick={() => navigate('/login')}>
        <img src={freshCartLogo} alt="fresh cart logo" className="h-8" />
      </div>
      <nav className="flex items-center space-x-6">
        <button onClick={() => navigate('/register')} className="text-gray-700 hover:text-green-600 transition font-medium text-base">register</button>
        <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-green-600 transition font-medium text-base">log in</button>
      </nav>
    </header>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        // localStorage.setItem('token', data.token);
        alert('Login Success!');
        // navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col items-center pt-20">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">login now</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold text-sm">Email :</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition text-sm"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold text-sm">Password :</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition text-sm"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-between items-center mt-2">
            <button
              type="button"
              className="text-sm text-gray-700 hover:underline"
              onClick={() => navigate('/forget-password')}
            >
              forget your password ?
            </button>
            <button
              type="submit"
              className="py-2 px-6 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-green-50 transition text-sm"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'login now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, rePassword, phone }),
      });
      const data = await res.json();
      if (res.ok && data.message === "success") {
        alert('Register Success!');
        navigate('/login');
      } else {
        setError(data.message || 'Register failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col items-center pt-20">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">register now</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold text-sm">Name :</label>
            <input type="text" className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition text-sm" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold text-sm">Email :</label>
            <input type="email" className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition text-sm" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold text-sm">Password :</label>
            <input type="password" className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition text-sm" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold text-sm">Re-password :</label>
            <input type="password" className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition text-sm" placeholder="Re-password" value={rePassword} onChange={e => setRePassword(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold text-sm">Phone :</label>
            <input type="tel" className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition text-sm" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end">
            <button type="submit" className="py-2 px-6 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-green-50 transition text-sm" disabled={loading}>
              {loading ? 'Loading...' : 'Register now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleForget = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setSuccess('Check your email for the verification code.');
      } else {
        setError(data.message || 'Failed to send code');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col items-center pt-20">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">please enter your verification code</h2>
        <form className="space-y-4" onSubmit={handleForget}>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold text-sm">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 transition text-sm" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button type="submit" className="py-2 px-6 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-green-50 transition text-sm" disabled={loading}>
            {loading ? 'Loading...' : 'verify'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}
