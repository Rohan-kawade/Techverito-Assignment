import Product from "../../dataType";
import useProduct from "../../hooks/useProduct";
import ProductCard from "../ProductCard/productCard";

export const CartItems = () => {
  const { cartItems } = useProduct();
  return (
    <div data-testid="cart-items-component">
      {cartItems?.length > 0 &&
        cartItems?.map((item: Product) => {
          return <ProductCard key={item?.id} product={item} />;
        })}
    </div>
  );
};

export default CartItems;
