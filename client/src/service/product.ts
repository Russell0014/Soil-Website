import axios from "axios";
import config from "./config";

export type ProductType = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  onSpecial: boolean;
  size: number;
  unit: string;
};

export async function findProductByID(id: number) {
  try {
    const res = await axios.get(`${config.HOST}/products/${id}`);
    return res.data;
  } catch {
    return [];
  }
}

export async function allProducts() {
  try {
    const res = await axios.get(`${config.HOST}/products`);
    return res.data;
  } catch {
    return [];
  }
}
