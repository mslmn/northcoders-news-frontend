import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="navbar-container">
        <Link to="/">
          <h1>NC News App</h1>
        </Link>

        <nav>
          <Link to="/articles">Articles</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
