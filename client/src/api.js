import axiosInstance from './axiosConfig';

export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
