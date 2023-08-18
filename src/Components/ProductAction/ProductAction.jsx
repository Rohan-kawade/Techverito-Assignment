import { useCallback, useRef } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import useProduct from "../../hooks/useProduct";

export const ProductAction = ({ isCart, product, addToCart }) => {
  const { setCartItems, cartItems, countPerItem, incrementCartCount, decrementCartCount } = useProduct();
  const addMoreButtonRef = useRef(null);
  const minusButtonRef = useRef(null);

  const addMoreItems = useCallback(
    (event: HTMLElement) => {
      incrementCartCount(product?.id);
      addRippleEffect(addMoreButtonRef, event);
    },
    [addMoreButtonRef, product, incrementCartCount]
  );

  const removeItems = useCallback(
    (event: HTMLElement) => {
      decrementCartCount(product?.id);
      addRippleEffect(minusButtonRef, event);
    },
    [minusButtonRef, decrementCartCount, product]
  );

  const removeFromCart = useCallback(() => {
    const previousCartItems: Product = structuredClone(cartItems);
    const availableCartItems: Product = previousCartItems?.filter((item: Product) => item?.id !== product?.id);
    setCartItems(availableCartItems);
    decrementCartCount(product?.id, true);
  }, [cartItems, product, setCartItems, decrementCartCount]);

  const addRippleEffect = (ref, event) => {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ref?.current?.appendChild(ripple);
    let x = event?.clientX - event?.target.offsetLeft;
    let y = event?.clientY - event?.target.offsetTop;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    setTimeout(() => {
      ripple.remove();
    }, 300);
  };

  return (
    <>
      {(!isCart && (
        <>
          <div className="product-price">
            Current Price:<span> ${product?.price}</span>
          </div>
          <div>
            <button onClick={addToCart} className="add-to-cart-btn">
              Add To Cart
            </button>
          </div>
        </>
      )) || (
        <>
          <div className="product-price">
            Price:<span> ${product?.price * countPerItem?.get(product?.id)}</span>
          </div>
          <div className="cart-action">
            <div>
              <button onClick={removeFromCart} className="remove-from-cart-btn">
                Remove
              </button>
            </div>
            <div className="add-remove-item-container">
              <span ref={minusButtonRef} onClick={removeItems} className="remove-icon">
                <MdRemove />
              </span>
              <span className="product-quantity">{countPerItem?.get(product?.id) || 0}</span>
              <span ref={addMoreButtonRef} onClick={addMoreItems} className="add-icon">
                <MdAdd />
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductAction;
