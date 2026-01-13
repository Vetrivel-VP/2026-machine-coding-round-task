import React from "react";
import ComboBox from "./components/combo-box";
import { countries } from "./utils/data";

const App = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ComboBox
        options={countries}
        placeholder="Select country..."
        onChange={(option) => {
          console.log(option);
        }}
      />
    </div>
  );
};

export default App;
