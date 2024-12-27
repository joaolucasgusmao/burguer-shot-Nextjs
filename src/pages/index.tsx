import fetchProducts from "@/api/fetchProducts";
import Header from "@/components/Header";
import ProductsSection from "@/components/ProductsSection";
import { IProducts } from "@/interfaces/product";
import { GetStaticProps } from "next";

interface HomeProps {
  productsData: IProducts[];
}

const Home = ({ productsData }: HomeProps) => {
  return (
    <>
      <Header />
      <ProductsSection products={productsData} />
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
