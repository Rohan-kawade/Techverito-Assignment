import axios from "axios";
import Product from "../dataType";

export const getAllProducts = () => {
  return axios
    .get<Product[]>("https://fakestoreapi.com/products")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPaginatedResult = (allItems: Product[], start: number, count: number = 5) => {
  return allItems?.splice(start, count);
};
