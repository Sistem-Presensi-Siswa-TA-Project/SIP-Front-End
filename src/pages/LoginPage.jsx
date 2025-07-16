//Filename: LoginPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { PrimaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';
import { TextInput } from '../components/Forms.jsx';
import { loginUser } from '../handlers/AuthHandler';
import { getLoginErrorMessage } from '../handlers/ErrorHandler';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginBg = iconList.find((i) => i.label === 'Login Image 2')?.src;
  const logo = iconList.find((i) => i.label === 'Logo')?.src;

  // Cek jika user sudah login (punya token & session masih aktif)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      // Redirect sesuai role
      navigate(`/${role}`, { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error
    setError([]);

    // Validasi kosong
    if (!username && !password) {
      setError(getLoginErrorMessage('FIELD_REQUIRED'));
      return;
    } else if (!username) {
      setError(getLoginErrorMessage('USERNAME_REQUIRED'));
      return;
    } else if (!password) {
      setError(getLoginErrorMessage('PASSWORD_REQUIRED'));
      return;
    }

    try {
      const data = await loginUser(username, password);
      // Simpan token ke localStorage/sessionStorage kalau ingin digunakan (opsional)
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role.toLowerCase());

      // Routing berdasarkan role dari backend
      if (data.role?.toLowerCase() === 'guru') {
        navigate('/guru', { replace: true }); // Ganti history
      } else if (data.role?.toLowerCase() === 'admin') {
        navigate('/admin', { replace: true });
      } else if (data.role?.toLowerCase() === 'piket') {
        navigate('/piket', { replace: true });
      } else {
        setError(['Role tidak dikenali!!']);
      }
    } catch (err) {
      if (err.code === 'FIELD_REQUIRED') {
        setError(getLoginErrorMessage('FIELD_REQUIRED'));
      } else {
        setError(getLoginErrorMessage('AUTH_FAILED'));
      }
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Background Login Page */}
      <div
        className="d-none d-md-block bg-slide-in"
        style={{
          flex: 6.5,
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Form Login */}
      <div
        className="d-flex flex-column justify-content-center p-4 gap-4 form-slide-in"
        style={{ flex: 3.5, backgroundColor: '#FFF' }}
      >
        <div className="text-center mb-3">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '100px', height: '100px' }}
            className="mb-3 d-block mx-auto"
          />
          <h1 className="fw-bold" style={{ fontSize: '26px' }}>
            SIPLUS BABUSSALAM
          </h1>
        </div>

        <Form
          className="d-flex flex-column mx-auto"
          style={{ width: '100%', maxWidth: '300px' }}
        >
          <div className="mb-4">
            <TextInput
              label="Username"
              required
              type="text"
              placeholder="Masukkan Username"
              controlId="formUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {error.includes('error kode 1') && (
              <p className="text-danger fst-italic mt-1 mb-0" style={{ fontSize: '13px' }}>
                Please fill out this field!
              </p>
            )}
          </div>

          <div className="mb-3"> 
            <TextInput
              label="Password"
              required
              type="password"
              placeholder="Masukkan Password"
              controlId="formPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              show={showPassword}
              toggleIcon={() => setShowPassword(!showPassword)}
            />

            {error.includes('error kode 2') && (
              <p className="text-danger fst-italic mt-1 mb-0" style={{ fontSize: '13px' }}>
                Please fill out this field!
              </p>
            )}

            {error.includes('error kode 3') && (
              <p className="text-danger fst-italic mt-1 mb-0" style={{ fontSize: '13px' }}>
                Login failed, please check your username and password again!
              </p>
            )}
          </div>


          <div className="d-flex mt-3" onClick={handleSubmit}>
            <PrimaryButton
              variant="primary"
              type="submit"
              fontSize="16px"
              width="125px"
              height="38px"
              className="ms-auto"
              onClick={handleSubmit}
            >
              Login
            </PrimaryButton>
          </div>
        </Form>

        <small className="text-center mt-4" style={{ fontSize: '12px', color: '#808080' }}>
          Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
        </small>
      </div>
    </div>
  );
}

export default Login;