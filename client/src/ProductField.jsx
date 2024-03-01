import React from 'react';
import { Field, ErrorMessage } from 'formik';

export const ProductField = ({ name, placeholder, type = 'text' }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {placeholder}
    </label>
    <Field
      name={name}
      placeholder={placeholder}
      type={type}
      className="mt-1 block w-full pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md py-3"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="mt-2 text-sm text-red-600"
    />
  </div>
);
