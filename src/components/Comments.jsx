import { getCommentsByArticleId } from "../utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticleComments();
  }, [articleId]);

  const loadArticleComments = () => {
    setLoading(true);
    getCommentsByArticleId(articleId).then((articleComments) => {
      setComments(articleComments);
      console.log(articleComments);
      setLoading(false);
    });
  };
};

export default Comments;
