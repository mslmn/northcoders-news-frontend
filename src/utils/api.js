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
