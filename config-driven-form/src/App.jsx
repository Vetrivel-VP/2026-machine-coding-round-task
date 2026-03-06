import React from "react";
import { slides } from "./utils/helpers";
import { FormikForm, RHFForm } from "./components";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-24 items-center justify-center p-5">
      <RHFForm />
      <FormikForm />
    </div>
  );
};

export default App;
