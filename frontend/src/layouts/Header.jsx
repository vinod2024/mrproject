import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const[titleText, setTitleText] = useState('MR Project::Home');
  const { user, login, logout } = useAuth();

  const isUserLoggedIn = (user &&  parseInt(user.data.id)>0) ? "Logout" : "LogIn / Register";
  const handleButtonToggle = () => {
    setShowMenu(!showMenu);
  };

  const logoutTest = () => {
    logout();
    navigate('/login', {
      state: { success: "Logout successful!" }
    });
  }

  const loginTest = () => {
    navigate('/login')
  }


  return (
    <header>
      <div className="container">
        <div className="grid navbar-grid">
          <div className="logo">
            <h1>MR Project</h1>
          </div>

          <nav className={showMenu ? "menu-mobile" : "menu-web"}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="#">About</NavLink>
              </li>
              <li>
                <NavLink to="#">Services</NavLink>
              </li>
              <li>
                <NavLink to="#">Contact</NavLink>
              </li>
              <li>
                <NavLink to="todo">Todo</NavLink>
              </li>
              <li>
                <NavLink to="/movies">Movies</NavLink>
              </li>
              <li>
                {/* <NavLink to={(user && parseInt(user.data.id)>0) ? '/logout' : '/login'}>{isUserLoggedIn}</NavLink> */}
                <button onClick={(user && parseInt(user.data.id) > 0) ? logoutTest : loginTest}>{isUserLoggedIn}</button>
              </li>
            </ul>
          </nav>

          <div className="ham-menu">
            <button onClick={handleButtonToggle}>
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
