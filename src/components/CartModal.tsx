import { IProducts } from "@/interfaces/product";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface CartModalProps {
  cartList: IProducts[];
  setCartList: (cartList: IProducts[]) => void;
  closeModal: () => void;
  modalIsOpen: boolean;
  toast: any;
}

const CartModal = ({
  cartList,
  closeModal,
  setCartList,
  modalIsOpen,
  toast,
}: CartModalProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const totalValue = cartList.reduce((acc, product) => {
    const price = Number(product.price);
 
    return acc + price;
  }, 0);

  const removeProduct = (id: number) => {
    const newCartList = cartList.filter((product) => product.id !== id);
    setCartList(newCartList);
    toast.success("Produto removido do carrinho!");
  };

  const removeAllProducts = () => {
    if (cartList.length > 0) {
      setCartList([]);
      toast.success("Produtos removidos do carrinho!");
    } else {
      toast.error("O seu carrinho já está vazio!");
    }
  };

  return (
    <div
      id="modalOverlay"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm"
    >
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            className="w-[30.25rem] h-[25.5rem] flex flex-col gap-4 bg-gray rounded-md"
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 500 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-[3.5625rem] flex justify-between items-center p-4 bg-primary rounded-t-md">
              <h1 className="text-lg font-bold text-gray">
                Carrinho de compras
              </h1>
              <button
                className="text-xl text-opacity-50 text-gray"
                onClick={() => closeModal()}
              >
                X
              </button>
            </div>
            <ul className="h-40 mx-4 flex flex-col gap-4 my-2 overflow-auto">
              {cartList.length > 0 ? (
                cartList.map((product) => {
                  return (
                    <li className="flex gap-1" key={product.id}>
                      <div className="flex bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={105}
                          height={105}
                        />
                      </div>
                      <div className="w-full mr-8 ml-4 flex justify-between items-center">
                        <div className="flex flex-col gap-2">
                          <p className="text-gray-600 text-lg font-bold">
                            {product.name}
                          </p>
                          <p className="text-green text-sm font-semibold">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <FaTrash
                          onClick={() => removeProduct(product.id)}
                          className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-500"
                        />
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="flex justify-center items-center h-44">
                  <p className="text-lg font-semibold text-gray-600">
                    O seu carrinho está vazio!
                  </p>
                </div>
              )}
            </ul>

            <div className="mx-4 flex justify-between pt-4 border-t-2 border-gray-100">
              <p className="text-gray-600 font-bold text-sm">Total</p>
              <p className="text-gray-300 text-sm font-bold">
                {formatPrice(totalValue)}
              </p>
            </div>
            <div className="flex justify-center items-center mb-4">
              <button
                onClick={() => removeAllProducts()}
                className="h-16 w-11/12 bg-gray-400 rounded-md text-gray text-sm font-semibold hover:bg-green transition-colors duration-500"
              >
                Remover todos
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartModal;
