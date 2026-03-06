import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSchema } from "../validations/zodSchema";
import { formConfig } from "../config/form.config";
import FieldRenderer from "./field-renderer";

const RHFForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data : ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl text-neutral-700 text-center font-semibold tracking-wider">
        React Hook Form
      </h2>

      {formConfig.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          register={register}
          errors={errors}
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

export default RHFForm;
