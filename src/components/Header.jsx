import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const { currentUser } = useUser();
  return (
    <header className="navbar bg-base-100 fixed top-0 z-50 shadow-md px-6">
      <div className="flex items-center gap-4 text-base">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-lg font-bold flex items-center gap-2"
        >
          📰 <span>NC News</span>
        </Link>
        <Link to="/articles" className="btn btn-ghost btn-sm text-base px-2">
          Articles
        </Link>
        <Link to="/topics" className="btn btn-ghost btn-sm text-base px-2">
          Topics
        </Link>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Welcome, {currentUser.username}</span>
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={currentUser.avatar_url} alt={currentUser.name} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
