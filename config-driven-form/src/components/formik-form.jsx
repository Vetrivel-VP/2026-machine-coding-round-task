import React from "react";
import { useFormik } from "formik";
import { formikSchema } from "../validations/formik-schema";
import FieldRenderer from "./field-renderer";
import { formConfig } from "../config/form.config";

const FormikForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      gender: "",
    },
    validationSchema: formikSchema,
    onSubmit: (data) => {
      console.log("Formik Data : ", data);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl text-neutral-700 text-center font-semibold tracking-wider">
        Formik Form
      </h2>

      {formConfig.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          isFormik
          formikProps={formik}
        />
      ))}

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-200 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default FormikForm;
