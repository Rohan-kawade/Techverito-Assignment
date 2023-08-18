import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Product from "../dataType";
import { getAllProducts } from "../Services/productDetailsServices";

interface ProductDetailsProviderProps {
  products: Product[];
  cartItems: Product[];
  setCartItems: Dispatch<SetStateAction<Product[]>>;
  countPerItem: any;
  incrementCartCount: (id: number) => void;
  decrementCartCount: (id: number) => void;
  setCountPerItem: Dispatch<SetStateAction<Map<number, number> | null>>;
}
export const ProductDetailsContext = React.createContext<ProductDetailsProviderProps>({
  products: [],
  cartItems: [],
  setCartItems: () => [],
  countPerItem: {},
  incrementCartCount: (id: number) => null,
  decrementCartCount: (id: number) => null,
  setCountPerItem: () => null,
});

export const ProductDetailsProvider: React.FC<any> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [countPerItem, setCountPerItem] = useState<Map<number, number> | null>(new Map());

  useEffect(() => {
    getAllProductsDetails();
  }, []);

  const getAllProductsDetails = async () => {
    const data: Product[] = await getAllProducts();
    setProducts(structuredClone(data));
  };

  const incrementCartCount = useCallback(
    (productId: number) => {
      const itemCount = structuredClone(countPerItem);
      if (itemCount?.has(productId)) {
        const previousCount: number = itemCount.get(productId) || 0;
        itemCount?.set(productId, previousCount + 1);
      } else {
        itemCount?.set(productId, 1);
      }
      setCountPerItem(itemCount);
    },
    [countPerItem, setCountPerItem]
  );

  const decrementCartCount = useCallback(
    (productId: number, makeCountToZero?: boolean) => {
      const itemCount = structuredClone(countPerItem);
      if (itemCount?.has(productId)) {
        const previousCount: number = itemCount.get(productId) || 0;
        if (makeCountToZero) {
          itemCount.set(productId, 0);
        } else {
          itemCount.set(productId, previousCount - 1);
        }
      }
      setCountPerItem(itemCount);
    },
    [countPerItem, setCountPerItem]
  );

  const value = useMemo(() => {
    return { products, cartItems, setCartItems, countPerItem, incrementCartCount, decrementCartCount, setCountPerItem };
  }, [products, cartItems, setCartItems, countPerItem, incrementCartCount, decrementCartCount, setCountPerItem]);

  return <ProductDetailsContext.Provider value={value}>{children}</ProductDetailsContext.Provider>;
};

export const useProduct = () => {
  return React.useContext(ProductDetailsContext);
};
export default useProduct;
