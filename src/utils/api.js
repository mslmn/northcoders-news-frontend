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

export const getCommentsByArticleId = (articleId) => {
  return fetch(`${baseUrl}/articles/${articleId}/comments`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({ status: res.status, msg: "failed to fetch article comments" });
      }
      return res.json();
    })
    .then(({ comments }) => {
      return comments;
    });
};

export const updateArticleVotes = (articleId, incVotes) => {
  return fetch(`${baseUrl}/articles/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inc_votes: incVotes }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({ status: res.status, msg: "failed to update article votes" });
      }
      return res.json();
    })
    .then(({ article }) => {
      return article;
    });
};
