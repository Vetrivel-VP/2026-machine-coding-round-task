import React from "react";

const TypeAhead = ({ data = [], placeholder = "Search...", onSelect }) => {
  const [query, setQuery] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const containerRef = React.useRef(null);

  const fuzzyMatch = (text, query) => {
    const pattern = query
      .split("")
      .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // escape regex chars
      .join(".*");

    return new RegExp(pattern, "i").test(text);
  };

  //   filter logic
  React.useEffect(() => {
    if (query.trim() === "") {
      setFilteredData([]);
      setIsOpen(false);
      return;
    }

    const results = data.filter((item) => fuzzyMatch(item, query));

    setFilteredData(results);
    setIsOpen(true);
  }, [query, data]);

  // outside click support
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => removeEventListener("mousedown", handleClickOutside);
  }, []);

  //   keyboard navigation support
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < filteredData.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(filteredData[activeIndex]);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  //   selection logic
  const handleSelect = (item) => {
    setQuery(item);
    setIsOpen(false);
    setActiveIndex(-1);
    onSelect && onSelect(item);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* input */}
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />

      {/* list */}
      {isOpen && filteredData.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-300 max-h-60 overflow-y-auto">
          {filteredData.map((item, index) => (
            <li
              key={`${item}-${index}`}
              onClick={() => handleSelect(item)}
              className={`px-4 py-2 cursor-pointer transition-all duration-150 
                        ${activeIndex === index ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}
                    `}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeAhead;
