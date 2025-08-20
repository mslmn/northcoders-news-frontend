import { useEffect, useState } from "react";
import { getTopics } from "../utils/api";

export default function useTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    getTopics()
      .then((list) => {
        if (alive) setTopics(list);
      })
      .catch((e) => {
        if (alive) setError(e?.msg || "Failed to load topics");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { topics, loading, error };
}
