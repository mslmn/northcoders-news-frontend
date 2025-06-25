import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Comments from "./components/Comments";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <UserProvider>
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:articleId" element={<ArticleDetail />} />
            <Route path="/articles/:articleId/comments" element={<Comments />} />
          </Routes>
        </main>
      </UserProvider>
    </>
  );
}

export default App;
