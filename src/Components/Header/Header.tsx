import { useEffect, useState } from "react";
import useProduct from "../../hooks/useProduct";
import "./header.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Header = () => {
  const { countPerItem, cartItems } = useProduct();
  const [totalCartItemCount, setTotalCartItemCount] = useState<number>(0);
  useEffect(() => {
    let totalCartItemCount = 0;
    if (countPerItem?.size) {
      countPerItem?.forEach((value: number, key: number) => {
        return (totalCartItemCount += value);
      });
      setTotalCartItemCount(totalCartItemCount);
    }
  }, [cartItems, countPerItem, countPerItem?.size]);

  return (
    <div className="header-container">
      <Link style={{ color: "inherit", textDecoration: "inherit" }} to={"/products"}>
        <h2 data-testid="header-title" className="title">
          TechVerito E-Commerce
        </h2>
      </Link>

      <span data-testid="cart-item-count" className="product-count">
        {totalCartItemCount}
      </span>
      <Link style={{ color: "inherit", textDecoration: "inherit" }} to={"/cart"}>
        <FaShoppingCart className="shopping-cart" />
      </Link>
    </div>
  );
};

export default Header;
