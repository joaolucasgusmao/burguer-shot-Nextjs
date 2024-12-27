import { IProducts } from "@/interfaces/product";
import ProductCard from "./ProductCard";

interface ProductsSectionProps {
  products: IProducts[];
}

const ProductsSection = ({ products }: ProductsSectionProps) => {
  return (
    <section>
      {/* <ProductCard products={products} /> */}
    </section>
  );
};

export default ProductsSection;
