import React from 'react';
import { useAuth } from './AuthContext';
import { Link,useNavigate } from 'react-router-dom';
import '../App.css'; // Upewnij się, że importujesz styl CSS

const Navbar = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      // Funkcja wylogowania - należy ją zaimplementować
      logout();
      navigate('/'); // Przekieruj na stronę logowania po wylogowaniu
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-links">
            <Link to="/stronaglowna" className="nav-link">Strona Główna</Link>
            <Link to="/profil" className="nav-link">Profil</Link>
            <Link to="/grupy" className="nav-link">Grupy</Link>
            <Link to="/dodajnews" className="nav-link">Dodaj Newsa</Link>
            <Link to="/mecze" className='nav-link'>Mecze</Link>
          </div>
          <button onClick={handleLogout} className="nav-link logout-button">Wyloguj</button>
        </div>
      </nav>
    );
};

export default Navbar;
