import React from 'react';
import { Field, ErrorMessage } from 'formik';

const CATEGORIES = ['meat', 'greens', 'fish'];

export const SelectCategory = () => (
  <div className="mb-4">
    <label
      htmlFor="category"
      className="block text-sm font-medium text-gray-700"
    >
      Category
    </label>
    <Field
      as="select"
      name="category"
      className="mt-1 block w-full pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md py-3"
    >
      <option value="">Select a category</option>
      {CATEGORIES.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </Field>
    <ErrorMessage
      name="category"
      component="div"
      className="mt-2 text-sm text-red-600"
    />
  </div>
);
