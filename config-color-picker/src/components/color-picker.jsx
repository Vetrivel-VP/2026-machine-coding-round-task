import React from "react";

const ColorPicker = () => {
  const [color, setColor] = React.useState("#3b82f6");
  const [boxes, setBoxes] = React.useState([]);

  const handleBoxes = () => {
    if (!color) return;

    const newBox = {
      id: Date.now(),
      color,
    };

    setBoxes((prev) => [...prev, newBox]);
  };

  const handleRemoveBox = (id) => {
    setBoxes((prev) => prev.filter((box) => box.id !== id));
  };

  const handleClearBoxes = () => {
    setBoxes([]);
  };
  return (
    <div className="flex flex-col items-center justify-center p-6 w-full md:w-3/4 border border-gray-300 rounded-md">
      <h2 className="font-normal italic font-serif text-4xl tracking-wider text-neutral-700">
        Color Picker
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border-none outline-none rounded-md h-64"
          />

          <div className="w-full flex items-center justify-center gap-8">
            <button type="button" onClick={handleBoxes}>
              Add Color
            </button>
            <button type="button" onClick={handleClearBoxes}>
              Clear All
            </button>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 gap-2">
          {boxes.map((box) => (
            <div
              key={box.id}
              style={{ background: box.color }}
              className="relative group rounded-xl shadow-md w-full hover:shadow-xl h-24 transition-all duration-200 overflow-hidden flex items-center justify-center"
              onClick={() => handleRemoveBox(box.id)}
            >
              <p className="text-white font-bold text-2xl">{box.color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
