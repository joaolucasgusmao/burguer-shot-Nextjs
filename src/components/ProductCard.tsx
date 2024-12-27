import { IProducts } from "@/interfaces/product";
import Image from "next/image";

interface ProductCardProps {
  products: IProducts[];
}

const ProductCard = ({ products }: ProductCardProps) => {
  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <img
              src={product.img}
              alt="Product image"
              width={600}
              height={300}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductCard;
