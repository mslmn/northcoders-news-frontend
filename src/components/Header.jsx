import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="navbar fixed top-0 bg-base-100 shadow-sm">
        <Link to="/" className="btn btn-ghost text-xl">
          <h1>NC News</h1>
        </Link>

        <nav className="btn btn-ghost text-xl">
          <Link to="/articles">Articles</Link>
        </nav>
      </div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </header>
  );
};

export default Header;
