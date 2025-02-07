"use client";

import fetchProducts from "@/api/fetchProducts";
import CartModal from "@/components/CartModal";
import Header from "@/components/Header";
import ProductsList from "@/components/ProductsList";
import { IProducts } from "@/interfaces/product";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface HomeProps {
  productsData: IProducts[];
}

const Home = ({ productsData }: HomeProps) => {
  const [cartList, setCartList] = useState<IProducts[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedCartList = localStorage.getItem("@Products");
    if (storedCartList) {
      setCartList(JSON.parse(storedCartList));
    }
  }, []);

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

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (modalIsOpen && (event.target as HTMLDivElement).id === "modalOverlay") {
      closeModal();
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (modalIsOpen && event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, [modalIsOpen]);

  useEffect(() => {
    localStorage.setItem("@Products", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <>
      <Header cartList={cartList} openModal={openModal} />
      <ProductsList products={productsData} addToCart={addToCart} />
      {modalIsOpen ? (
        <CartModal
          closeModal={closeModal}
          cartList={cartList}
          setCartList={setCartList}
          modalIsOpen={modalIsOpen}
          toast={toast}
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
