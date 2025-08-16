import { Routes, Route, Navigate, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import Home from "./components/Home";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";

export default function App() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.search, navType]);

  return (
    <UserProvider>
      <div className="min-h-screen bg-base-200">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:articleId" element={<ArticleDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </UserProvider>
  );
}
