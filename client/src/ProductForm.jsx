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
    >
      {({ isSubmitting, status }) => (
        <Form>
          <ProductField name="name" placeholder="Product Name" />
          <SelectCategory />
          <ProductField name="price" placeholder="Price" type="number" />

          {status && status.message && (
            <div
              className={status.success ? 'success-message' : 'error-message'}
            >
              {status.message}
            </div>
          )}

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
