import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createProduct } from './api';
import { ProductField } from './ProductField';
import { SelectCategory } from './SelectCategory';

// Define the validation schema using Yup
const productValidationSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  category: Yup.string().required('Please select a category'),
  price: Yup.number()
    .positive('Price must be positive')
    .required('Price is required'),
});

const submitProductForm = async (
  values,
  { setSubmitting, resetForm, setStatus }
) => {
  try {
    await createProduct(values);
    setStatus({ success: true, message: 'Product created successfully!' });
    resetForm();
  } catch (error) {
    setStatus({
      success: false,
      message: 'Failed to create product. Please try again.',
    });
  } finally {
    setSubmitting(false);
  }
};

export const ProductForm = () => {
  return (
    <Formik
      initialValues={{ name: '', category: '', price: '' }}
      validationSchema={productValidationSchema}
      onSubmit={submitProductForm}
      className="space-y-6"
    >
      {({ isSubmitting, status }) => (
        <Form>
          <ProductField name="name" placeholder="Product Name" />
          <SelectCategory />
          <ProductField name="price" placeholder="Price" type="number" />

          {status && status.message && (
            <div
              className={`${
                status.success ? 'text-green-500' : 'text-red-500'
              } border px-4 py-3 rounded relative`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
