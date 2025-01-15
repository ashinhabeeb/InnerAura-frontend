import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo-final.png';
import { useNavigate } from 'react-router';

function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('existingUser');
    navigate('/');
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsLogin(true);
      const user = JSON.parse(sessionStorage.getItem('existingUser'));
      setLoginUser(user);
    }
  }, []);

  return (
    <>
      <div className="container flex items-center justify-between w-full px-4 py-4 bg-transparent">
        {/* Logo */}
        <div>
          <img src={Logo} alt="Logo" style={{ height: '80px', width: '100px' }} />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-white">
          <a href="/">HOME</a>
          <a href="/about">ABOUT</a>
          {isLogin ? (
            <>
              <a href="/alltracks">MEDITATIONS</a>
              <a href="/journal">JOURNAL</a>
            </>
          ) : (
            <>
              <a href="/login">MEDITATIONS</a>
              <a href="/login">JOURNAL</a>
            </>
          )}
        </div>

        {/* Bars Icon for Mobile Menu */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            <FontAwesomeIcon className="fa-2x text-white" icon={faBars} />
          </button>
        </div>

        {/* User Profile and Dropdown */}
        <div className="relative hidden lg:flex gap-5">
          {isLogin && <h1 className="text-white mt-4">Hi, {loginUser.username}</h1>}
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-white focus:outline-none"
          >
            <FontAwesomeIcon className="fa-2x" icon={faUser} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              {isLogin ? (
                <ul className="py-2">
                  <li>
                    <a href="/myplaylist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Playlist
                    </a>
                  </li>
                  <li>
                    <a href="/savedaudios" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Saved Tracks
                    </a>
                  </li>
                  <li>
                    <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="py-2">
                  <li>
                    <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Register
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-transparent  text-white w-full px-4 py-4">
          <a href="/" className="block py-2">HOME</a>
          <a href="/about" className="block py-2">ABOUT</a>
          {isLogin ? (
            <>
              <a href="/alltracks" className="block py-2">MEDITATIONS</a>
              <a href="/journal" className="block py-2">JOURNAL</a>
              <a href="/myplaylist" className="block py-2">MY PLAYLIST</a>
              <a href="/savedaudios" className="block py-2">SAVED TRACKS</a>
              <a href="/profile" className="block py-2">PTOFILE</a>
              <a href="/" onClick={handleLogout} className="block py-2">LOGOUT</a>
            </>
          ) : (
            <>
              <a href="/login" className="block py-2">MEDITATIONS</a>
              <a href="/login" className="block py-2">JOURNAL</a>
              <a href="/login" className="block py-2">LOGIN</a>
              <a href="/register" className="block py-2">REGISTER</a>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
