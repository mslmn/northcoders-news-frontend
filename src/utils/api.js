const baseUrl = "https://northcoders-news-gida.onrender.com/api";

export const getAllArticles = () => {
  return fetch(`${baseUrl}/articles`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({ status: res.status, msg: "failed to fetch articles" });
      }
      return res.json();
    })
    .then(({ articles }) => {
      return articles;
    });
};

export const getArticleById = (articleId) => {
  return fetch(`${baseUrl}/articles/${articleId}`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({ status: res.status, msg: "failed to fetch article" });
      }
      return res.json();
    })
    .then(({ article }) => {
      return article;
    });
};
