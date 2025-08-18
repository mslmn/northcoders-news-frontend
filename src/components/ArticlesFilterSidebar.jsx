import { useSearchParams } from "react-router-dom";
import useTopics from "../hooks/useTopics";

const SORTS = [
  { value: "created_at", label: "Date" },
  { value: "votes", label: "Votes" },
  { value: "comment_count", label: "Comments" },
  { value: "title", label: "Title" },
];

const ArticlesFilterSidebar = () => {
  const { topics, loading, error } = useTopics();
  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get("topic") || "";
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const closeDrawerIfMobile = () => {
    const cb = document.getElementById("filters-drawer");
    if (cb && !window.matchMedia("(min-width: 1024px)").matches) cb.checked = false;
  };

  const setTopic = (val) => {
    updateParam("topic", val);
    closeDrawerIfMobile();
  };

  const setOrder = (val) => {
    updateParam("order", val);
    closeDrawerIfMobile();
  };

  const resetAll = () => {
    setSearchParams(new URLSearchParams());
    closeDrawerIfMobile();
  };

  return (
    <aside className="h-full w-72 bg-base-100 lg:bg-base-200/40 border-r border-base-300/50">
      <div className="p-4 space-y-5">
        <h3 className="text-lg font-semibold">Filters</h3>

        <div>
          <div className="text-sm font-medium mb-2">Topics</div>
          {loading ? (
            <div className="flex items-center gap-2 opacity-70 text-sm">
              <span className="loading loading-spinner loading-xs" />
              Loading topics…
            </div>
          ) : error ? (
            <div className="alert alert-warning text-sm">Failed to load topics</div>
          ) : (
            <ul className="menu bg-base-100 rounded-box p-0">
              <li>
                <button className={topic === "" ? "active" : ""} onClick={() => setTopic("")}>
                  All
                </button>
              </li>
              {topics.map((t) => (
                <li key={t.slug}>
                  <button
                    className={`capitalize ${topic === t.slug ? "active" : ""}`}
                    title={t.description || t.slug}
                    onClick={() => setTopic(t.slug)}
                  >
                    {t.slug}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Sort by</div>
          <select
            className="select select-sm select-bordered w-full"
            value={sort_by}
            onChange={(e) => updateParam("sort_by", e.target.value)}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Order</div>
          <div className="join w-full">
            <button
              className={`btn btn-sm join-item w-1/2 ${order === "desc" ? "btn-active" : ""}`}
              onClick={() => setOrder("desc")}
            >
              Desc
            </button>
            <button
              className={`btn btn-sm join-item w-1/2 ${order === "asc" ? "btn-active" : ""}`}
              onClick={() => setOrder("asc")}
            >
              Asc
            </button>
          </div>
        </div>

        {(topic || sort_by !== "created_at" || order !== "desc") && (
          <div className="pt-1">
            <button className="btn btn-sm btn-ghost w-full" onClick={resetAll}>
              Reset
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ArticlesFilterSidebar;
