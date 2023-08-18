import { useCallback } from "react";
import Product from "../../dataType";
import "./productCard.css";
import useProduct from "../../hooks/useProduct";
import ProductAction from "../ProductAction/ProductAction";
import { useLocation } from "react-router-dom";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { setCartItems, cartItems, incrementCartCount } = useProduct();
  const route = useLocation();

  const addToCart = useCallback(() => {
    incrementCartCount(product?.id);
    const previousCartItems = [...cartItems];
    const isAddedToCartAlready = previousCartItems?.find((item: Product) => item?.id === product?.id);
    if (!isAddedToCartAlready) {
      setCartItems([...previousCartItems, product]);
    }
  }, [product, setCartItems, cartItems, incrementCartCount]);

  return (
    <div data-testid={product?.id} key={product?.id} className="main-container">
      <div className="product-info">
        <div className="image-section">
          <img alt="no" src={product?.image} />
        </div>
        <div className="product-details">
          <div className="product-title">
            <span>{product?.title}</span>
          </div>
          <div className="product-desc">{product?.description}</div>
          <ProductAction isCart={route?.pathname === "/cart"} product={product} addToCart={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
