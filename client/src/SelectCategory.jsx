import React from 'react';
import { Field, ErrorMessage } from 'formik';

const CATEGORIES = ['meat', 'greens', 'fish'];

export const SelectCategory = () => (
  <div>
    <label htmlFor="category">Category</label>
    <Field as="select" name="category">
      <option value="">Select a category</option>
      {CATEGORIES.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </Field>
    <ErrorMessage name="category" component="div" className="field-error" />
  </div>
);
