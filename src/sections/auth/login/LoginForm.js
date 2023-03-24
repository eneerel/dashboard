import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { AuthContext } from '../../../context/authContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, SetPassword] = useState(null);

  const handleClick = async () => {
    try {
      const result = await axios.post('http://localhost:8000/users/login', { email, password });
      setUser(result.data.user);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Имэйл" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Нууц үг"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Нууц үг сануулах
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Нэвтрэх
      </LoadingButton>
    </>
  );
}
