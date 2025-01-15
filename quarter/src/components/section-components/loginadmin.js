import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Gardez useNavigate pour react-router-dom v5
import { Link } from 'react-router-dom';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Utilisez useNavigate pour react-router-dom v5

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Connexion échouée.');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', 'admin');
      navigate('/admin');  // Rediriger avec navigate() pour react-router-dom v5
    } catch (error) {
      setError('Une erreur est survenue.');
    }
  };

  return (
    <div className="ltn__login-area pb-65">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">Sign In <br />To Your Account</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                Sit aliquid, Non distinctio vel iste.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email*"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password*"
                  required
                />
                <div className="btn-wrapper mt-0">
                  <button className="theme-btn-1 btn btn-block" type="submit">
                    SIGN IN
                  </button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="go-to-btn mt-20">
                  <button
                    type="button"
                    className="small"
                    data-bs-toggle="modal"
                    data-bs-target="#ltn_forget_password_modal"
                  >
                    FORGOTTEN YOUR PASSWORD?
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="account-create text-center pt-50">
              <h4>DON'T HAVE AN ACCOUNT?</h4>
              <p>
                Add items to your wishlist, get personalized recommendations <br />
                check out more quickly, track your orders, register
              </p>
              <div className="btn-wrapper go-top">
                <Link to="/register" className="theme-btn-1 btn black-btn">
                  CREATE ACCOUNT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginAdmin;
