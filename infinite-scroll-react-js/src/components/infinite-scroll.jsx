import React from "react";
import { Loader } from "lucide-react";

const InfiniteScroll = () => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const observer = React.useRef();

  React.useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setData((prev) => [...prev, ...data]);

        if (data.length < 20) {
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, [page]);

  const lastPostRef = React.useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6 border border-gray-200 rounded-md grid grid-cols-1 md:grid-cols-2 gap-2">
      {data.map((item, index) => {
        if (data.length === index + 1) {
          return (
            <div key={item.id} ref={lastPostRef}>
              <Card item={item} index={index} />
            </div>
          );
        }

        return <Card key={item.id} item={item} index={index} />;
      })}

      {loading && <Loader className="animate-spin mx-auto col-span-2" />}

      {error && <p className="text-red-500 text-center col-span-2">{error}</p>}

      {!hasMore && !loading && (
        <p className="text-gray-500 text-center col-span-2">
          No more data to load
        </p>
      )}
    </div>
  );
};

export default InfiniteScroll;

const Card = ({ item, index }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-md relative">
      <p className="absolute top-2 right-2 font-bold text-base text-gray-900">
        {" "}
        {index + 1}
      </p>
      <h2 className="mt-2 text-sm text-gray-600">{item.title}</h2>
      <p className="text-xs text-gray-500">{item.body}</p>
    </div>
  );
};
