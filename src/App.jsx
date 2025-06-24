import "./App.css";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:articleId" element={<ArticleDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
