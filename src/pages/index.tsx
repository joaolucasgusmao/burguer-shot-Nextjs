import fetchProducts from "@/api/fetchProducts";
import CartModal from "@/components/CartModal";
import Header from "@/components/Header";
import ProductsList from "@/components/ProductsList";
import { IProducts } from "@/interfaces/product";
import { GetStaticProps } from "next";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface HomeProps {
  productsData: IProducts[];
}

const Home = ({ productsData }: HomeProps) => {
  const [cartList, setCartList] = useState<IProducts[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const addToCart = (productToAdd: IProducts) => {
    const isProductInCart = cartList.some(
      (product) => product.id === productToAdd.id
    );

    !isProductInCart
      ? (() => {
          setCartList([...cartList, productToAdd]);
          toast.success("Produto adicionado ao carrinho!");
        })()
      : toast.error("Produto já adicionado ao carrinho");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Header cartList={cartList} openModal={openModal} />
      <ProductsList products={productsData} addToCart={addToCart} />
      {modalIsOpen ? (
        <CartModal
          closeModal={closeModal}
          cartList={cartList}
          setCartList={setCartList}
        />
      ) : null}
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const productsData = await fetchProducts();

    return {
      props: {
        productsData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
