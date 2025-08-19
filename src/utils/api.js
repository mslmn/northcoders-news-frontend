const baseUrl = "https://northcoders-news-gida.onrender.com/api";

export const getTopics = () => {
  return fetch(`${baseUrl}/topics`)
    .then((res) => {
      if (!res.ok) return Promise.reject({ status: res.status, msg: "failed to fetch topics" });
      return res.json();
    })
    .then(({ topics }) => topics);
};

export const getAllArticles = (params = {}) => {
  const qs = new URLSearchParams();
  if (params.topic) qs.set("topic", params.topic);
  if (params.sort_by) qs.set("sort_by", params.sort_by);
  if (params.order) qs.set("order", params.order);

  const url = qs.toString() ? `${baseUrl}/articles?${qs.toString()}` : `${baseUrl}/articles`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) return Promise.reject({ status: res.status, msg: "failed to fetch articles" });
      return res.json();
    })
    .then(({ articles }) => articles);
};

export const getArticleById = (articleId) => {
  return fetch(`${baseUrl}/articles/${articleId}`)
    .then((res) => {
      if (!res.ok) return Promise.reject({ status: res.status, msg: "failed to fetch article" });
      return res.json();
    })
    .then(({ article }) => article);
};

export const getCommentsByArticleId = (articleId) => {
  return fetch(`${baseUrl}/articles/${articleId}/comments`)
    .then((res) => {
      if (!res.ok)
        return Promise.reject({ status: res.status, msg: "failed to fetch article comments" });
      return res.json();
    })
    .then(({ comments }) => comments);
};

export const postComment = (articleId, { username, body }) => {
  return fetch(`${baseUrl}/articles/${articleId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, body }),
  })
    .then((res) => {
      if (!res.ok) return Promise.reject({ status: res.status, msg: "failed to add comment" });
      return res.json();
    })
    .then(({ comment }) => comment);
};

export const deleteCommentById = (commentId) => {
  return fetch(`${baseUrl}/comments/${commentId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) return Promise.reject({ status: res.status, msg: "failed to delete comment" });
    return;
  });
};

export const updateArticleVotes = (articleId, incVotes) => {
  return fetch(`${baseUrl}/articles/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inc_votes: incVotes }),
  })
    .then((res) => {
      if (!res.ok)
        return Promise.reject({ status: res.status, msg: "failed to update article votes" });
      return res.json();
    })
    .then(({ article }) => article);
};
