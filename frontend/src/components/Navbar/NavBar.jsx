import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/'
        >
          Acueil
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav'>
            {token ? (
              <Fragment>
                <li className='nav-item'>
                  <Link
                    to='/dashboard'
                    className='nav-link active'
                  >
                    Espace personnelle
                  </Link>
                </li>
                <li className='nav-item'>
                  <button
                    className='nav-link active'
                    onClick={() => {
                      localStorage.removeItem('token');
                      navigate('/');
                    }}
                  >
                    Deconnecter
                  </button>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className='nav-item'>
                  <Link
                    to='/login'
                    className='nav-link active'
                  >
                    Se connecter
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/register'
                    className='nav-link active'
                  >
                    S'abonner
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
