import React from "react";
import { useClickOutside } from "../hooks/use-click-outside";
import { ChevronsUpDown } from "lucide-react";
import { Search } from "lucide-react";

const ComboBox = ({
  options = [],
  placeholder = "Select option...",
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selected, setSelected] = React.useState(null);

  const containerRef = React.useRef(null);

  useClickOutside(containerRef, () => setOpen(false));

  const filteredOptions = React.useMemo(() => {
    if (!query) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const selectedOption = (option) => {
    setSelected(option);
    // setQuery(option.label);
    setOpen(false);
    onChange?.(option);
  };

  const handleKeyDown = (e) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
        break;

      case "ArrowUp":
        setSelectedIndex((i) => Math.min(i - 1, filteredOptions.length - 1));
        break;

      case "Enter":
        selectedOption(filteredOptions[selectedIndex]);
        break;

      case "Escape":
        setOpen(false);
        break;

      default:
        break;
    }
  };

  React.useEffect(() => {
    if (!open) return;

    if (selected) {
      const index = filteredOptions.findIndex(
        (opt) => opt.value === selected.value
      );

      setSelectedIndex(index >= 0 ? index : 0);
    } else {
      setSelectedIndex(0);
    }
  }, [open, selected, filteredOptions]);

  return (
    <div ref={containerRef} className="relative w-72">
      <div
        className="flex items-center gap-2 flex-1 border p-2 border-gray-200 rounded-md cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <label className="text-base text-neutral-600 cursor-pointer">
          {selected ? selected.label : placeholder}
        </label>
        <ChevronsUpDown size={16} className="text-neutral-600 ml-auto" />
      </div>

      {open && (
        <div className="absolute inset-x-0 z-50 border border-gray-200 p-2 rounded-md flex flex-col items-start justify-start gap-4 min-h-64 max-h-64 overflow-y-auto shadow-sm mt-2 ">
          <div className="flex-1 w-full flex items-center gap-2 bg-neutral-100 rounded-md px-2.5 h-10 max-h-10 min-h-10">
            <Search size={16} className="text-neutral-600" />
            <input
              type="text"
              placeholder="Search here.."
              className="w-full outline-none border-none text-neutral-600"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="flex-1 flex flex-col items-start justify-start gap-2 w-full">
            {filteredOptions.length > 0 ? (
              <>
                {filteredOptions.map((option, index) => (
                  <div
                    key={`${index}-${option.value}`}
                    className={`p-1.5 cursor-pointer text-sm rounded-md w-full hover:bg-neutral-100 ${
                      selectedIndex === index
                        ? "bg-neutral-100"
                        : "bg-transparent"
                    }`}
                    onClick={() => selectedOption(filteredOptions[index])}
                  >
                    {option.label}
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="w-full flex items-center justify-center">
                  <p>No options found</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComboBox;
