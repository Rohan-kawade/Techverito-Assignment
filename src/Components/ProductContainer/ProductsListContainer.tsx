import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductDetails from "../ProductDetails/productDetails";
import CartItems from "../Cart/CartItems";
import { useEffect, useRef, useState } from "react";
import Product from "../../dataType";
import { getAllProducts, getPaginatedResult } from "../../Services/productDetailsServices";

const PATHS = {
  PRODUCTS: "/products",
  CART: "/cart",
};
interface RenderBasedOnROutesPros {
  items: Product[];
}

export const ProductListContainer = () => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [items, setItems] = useState<Product[]>([]);
  const allItems = useRef<Product[]>([]);

  const RenderBasedOnROutes: React.FC<RenderBasedOnROutesPros> = ({ items }) => {
    const route = useLocation();
    if (route?.pathname === PATHS?.PRODUCTS) {
      return (
        <div data-test-id="Product-Details-component">
          <ProductDetails items={items} />
        </div>
      );
    } else {
      return <CartItems />;
    }
  };

  useEffect(() => {
    const fetchListOfProducts = async () => {
      const data = structuredClone(await getAllProducts());
      allItems.current = structuredClone(data);
      setItems(structuredClone(getPaginatedResult(data, items?.length, 5)));
    };
    fetchListOfProducts();
  }, []);

  const fetchMoreData = () => {
    if (items?.length >= 20) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      const previousItems = [...items];
      const data = structuredClone(allItems.current);
      setItems([...previousItems, ...getPaginatedResult(data, items?.length, 5)]);
    }, 500);
  };
  return (
    <InfiniteScroll
      dataLength={items?.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      height={600}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }>
      <div className="product-list-section">
        <RenderBasedOnROutes items={items} />
      </div>
    </InfiniteScroll>
  );
};
export default ProductListContainer;
