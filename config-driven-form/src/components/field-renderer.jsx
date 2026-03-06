import React from "react";

const FieldRenderer = ({
  field,
  register,
  errors,
  control,
  formikProps,
  isFormik,
}) => {
  const baseStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out";

  if (isFormik) {
    const { values, handleChange, handleBlur } = formikProps;

    if (field.type === "select") {
      return (
        <div className="space-y-2">
          <label className="font-medium">{field.label}</label>
          <select
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={baseStyle}
          >
            <option value="">Select an option</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formikProps.errors[field.name] && (
            <p className="text-red-500 text-sm">
              {formikProps.errors[field.name]}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label className="font-medium">{field.label}</label>
        <input
          type={field.type}
          name={field.name}
          value={values[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          className={baseStyle}
        />

        {formikProps.errors[field.name] && (
          <p className="text-red-500 text-sm">
            {formikProps.errors[field.name]}
          </p>
        )}
      </div>
    );
  }

  // react hook form
  if (field.type === "select") {
    return (
      <div className="space-y-2">
        <label className="font-medium">{field.label}</label>
        <select {...register(field.name)} className={baseStyle}>
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[field.name] && (
          <p className="text-red-500 text-sm">{errors[field.name].message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="font-medium">{field.label}</label>
      <input
        type={field.type}
        {...register(field.name)}
        placeholder={field.placeholder}
        className={baseStyle}
      />

      {errors[field.name] && (
        <p className="text-red-500 text-sm">{errors[field.name].message}</p>
      )}
    </div>
  );
};

export default FieldRenderer;
