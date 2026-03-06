import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/use-deboune";
import { updateSearchParam } from "../hooks/update-search-param";

const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "";

  const [search, setSearch] = React.useState(searchQuery);

  const debouncedSearch = useDebounce(search);

  React.useEffect(() => {
    updateSearchParam("search", debouncedSearch, searchParams, setSearchParams);
  }, [debouncedSearch]);

  return (
    <div className="bg-white w-full p-2.5 rounded-lg flex items-center">
      {/* search */}
      <input
        className="bg-gray-100 min-w-md rounded-md p-2.5 text-base font-semibold"
        type="text"
        placeholder="Search here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="ml-auto flex items-center justify-center gap-2">
        <select
          value={category}
          onChange={(e) =>
            updateSearchParam(
              "category",
              e.target.value,
              searchParams,
              setSearchParams,
            )
          }
        >
          <option value="">All Categories</option>
          <option value="beauty">Beauty Products</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furnitures</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
