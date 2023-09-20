import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);

    // After logging out, navigate the user to the home page 
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-container">
      <div>
        <Link className="navbar-brand" to="/">Markdown App</Link>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Markdown</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list">Markdown List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chart">View Chart</Link>
              </li>
              <li >
                <button className="btn btn-outline-danger custom-btn" style={{marginLeft:850}} onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;