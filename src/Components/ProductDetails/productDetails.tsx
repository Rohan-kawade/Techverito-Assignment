import ProductCard from "../ProductCard/productCard";
import Product from "../../dataType";

interface Props {
  items: Product[];
}
const ProductDetails: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items?.length > 0 &&
        items?.map((item: Product) => {
          return <ProductCard key={item?.id} product={item} />;
        })}
    </>
  );
};

export default ProductDetails;
