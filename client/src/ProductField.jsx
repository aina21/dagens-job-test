import React from 'react';
import { Field, ErrorMessage } from 'formik';

export const ProductField = ({ name, placeholder, type = 'text' }) => (
  <div>
    <label htmlFor={name}>{placeholder}</label>
    <Field name={name} placeholder={placeholder} type={type} />
    <ErrorMessage name={name} component="div" className="field-error" />
  </div>
);
