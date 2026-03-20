import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import doctorBg from '../assets/doctor-bg.jpg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Wait a moment for context to update or use the role from the response
      // For simplicity, we check local storage directly or trust the next navigation will have context
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${doctorBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
            CarePassport Login
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Blockchain-Secured Medical Records
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Button onClick={() => navigate('/register')} sx={{ fontWeight: 'bold' }}>Register</Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;