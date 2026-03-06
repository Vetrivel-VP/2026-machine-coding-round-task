import React from "react";
import { Pagination } from "./components";

const data = Array.from({ length: 142 }, (_, i) => `Item Number. : ${i}`);

const App = () => {
  const [page, setPage] = React.useState(1);
  const [products, setProducts] = React.useState([]);

  const itemsPerPage = 10;

  // const start = (page - 1) * itemsPerPage;
  // const end = start + itemsPerPage;

  // const visibleData = data.slice(start, end);

  React.useEffect(() => {
    const fetchProducts = async () => {
      await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then(setProducts);
    };

    fetchProducts();
  }, []);

  const visibleData = React.useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return products.slice(start, end);
  }, [products, page, itemsPerPage]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-md shadow p-4">
        <ul className="space-y-2">
          {visibleData.map((item) => (
            <li className="p-3 rounded-lg bg-gray-100 text-sm" key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>

        <Pagination
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default App;
