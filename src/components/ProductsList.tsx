import { IProducts } from "@/interfaces/product";
import Image from "next/image";

interface ProductsListProps {
  products: IProducts[];
  addToCart: (product: IProducts) => void;
}

const ProductsList = ({ products, addToCart }: ProductsListProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <main className="flex items-center justify-center my-20">
      <ul className="w-[90%] h-96 flex overflow-auto md:grid md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-14 md:h-full">
        {products.map((product) => {
          return (
            <li
              key={product.id}
              className="w-full h-[21.625rem] flex flex-col gap-[1.1478rem] items-center rounded-[var(--radius-2)] border-2 border-gray-100"
            >
              <div className="w-full h-[9.375rem] bg-gray-100">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={150}
                  height={300}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-[262px] h-[153px] flex flex-col gap-[1.1rem] ml-6">
                <h3 className="text-lg font-bold text-gray-600">
                  {product.name}
                </h3>
                <p className="text-sm font-normal text-gray-300">
                  {product.category}
                </p>
                <p className="text-base font-bold text-green">
                  {formatPrice(product.price)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="text-gray text-base bg-gray-400 w-fit px-5 py-1 rounded-md hover:bg-green transition-colors duration-500"
                >
                  Adicionar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default ProductsList;
