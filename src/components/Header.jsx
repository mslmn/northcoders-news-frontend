import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import useTopics from "../hooks/useTopics";

const Header = () => {
  const { currentUser } = useUser();
  const { topics } = useTopics();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  // Close dropdown on route change
  useEffect(() => {
    close();
    document.activeElement?.blur?.();
  }, [location.pathname, location.search]);

  return (
    <header className="navbar bg-base-100 fixed top-0 z-50 shadow-md px-4">
      <div className="navbar-start gap-2">
        <div className="dropdown md:hidden">
          <button tabIndex={0} className="btn btn-ghost btn-square" aria-label="Open menu">
            <span aria-hidden="true" className="text-xl leading-none">
              ☰
            </span>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box w-64 p-2 shadow"
            onClickCapture={() => document.activeElement?.blur()}
          >
            <li className="menu-title mt-1">
              <span>Topics</span>
            </li>
            <li>
              <Link to="/articles">All</Link>
            </li>
            {topics.map((t) => (
              <li key={t.slug}>
                <Link to={`/articles?topic=${t.slug}`} className="capitalize">
                  {t.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost normal-case text-lg font-bold gap-2">
          📰 <span>NC News</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link to="/articles" className="btn btn-ghost normal-case px-3 text-base font-semibold">
            Articles
          </Link>

          <div
            className={`dropdown ${open ? "dropdown-open" : ""}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={close}
          >
            <button
              type="button"
              className="btn btn-ghost normal-case px-3 inline-flex items-center text-base font-semibold"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={toggle}
            >
              Topics
              <span aria-hidden="true" className="ml-1 text-sm leading-none">
                ▾
              </span>
            </button>
            <ul
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 z-50"
              role="menu"
              onClick={() => {
                close();
                document.activeElement?.blur?.();
              }}
            >
              <li>
                <Link to="/articles">All</Link>
              </li>
              {topics.map((t) => (
                <li key={t.slug}>
                  <Link to={`/articles?topic=${t.slug}`} className="capitalize">
                    {t.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="navbar-end gap-2 ml-auto">
        <span className="hidden sm:inline text-sm">Welcome, {currentUser.username}</span>
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
