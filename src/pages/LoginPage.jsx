//Filename: LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { PrimaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';
import { TextInput } from '../components/Forms.jsx';
import { users } from '../data/userData.js';
import { loginUser } from '../handlers/AuthHandler';
import { getLoginErrorMessage } from '../handlers/ErrorHandler';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginBg = iconList.find((i) => i.label === 'Login Image')?.src;
  const logo = iconList.find((i) => i.label === 'Logo')?.src;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = loginUser(username, password, users);

    if (!user) {
      setError(getLoginErrorMessage(username, password));
      return;
    }

    // Routing berdasarkan role
    if (user.role === 'guru') {
      navigate('/mapel');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'piket') {
      navigate('/piket');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div
        className="d-none d-md-block"
        style={{
          flex: 6.5,
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        className="d-flex flex-column justify-content-center p-4 gap-4"
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
            SMP Plus Babussalam
          </h1>
        </div>

        <Form
          className="d-flex flex-column mx-auto"
          style={{ width: '100%', maxWidth: '300px' }}
          onSubmit={handleSubmit}
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


          <div className="d-flex mt-3">
            <PrimaryButton
              variant="primary"
              type="submit"
              fontSize="16px"
              width="125px"
              height="38px"
              className="ms-auto"
            >
              Login
            </PrimaryButton>
          </div>
        </Form>

        <small className="text-center mt-3" style={{ fontSize: '12px', color: '#808080' }}>
          Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
        </small>
      </div>
    </div>
  );
}

export default Login;