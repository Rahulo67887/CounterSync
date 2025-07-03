import { Link } from "react-router";
import { useAuth } from "../store/auth";

const Header = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <nav className="navbar navbar-expand-lg  custom_navbar">
      <div className="container-fluid">
        <a className="navbar-brand institute" href="https://www.dbuu.ac.in/">
          <img src="/images/logo.jpg" alt="DBUU Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container-fluid admin-title">Admin Dashboard</div>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item links">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/createportal"
              >
                Create Portal
              </Link>
            </li>
            {isLoggedIn ? (
              <Link className="nav-item nav-link links" to="/logout">
                Log Out
              </Link>
            ) : (
              <>
                <Link className="nav-link nav-item links" to="/login">
                  Log In
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
