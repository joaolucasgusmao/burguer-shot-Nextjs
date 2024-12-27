import Image from "next/image";
import { IoMdCart } from "react-icons/io";

const Header = () => {
  return (
    <header className="w-full h-16 flex justify-between items-center px-4 border-b-2 border-gray-100">
      <Image src={"/Logo.svg"} alt="Site logo" width={150} height={200} />
      <div>
        <IoMdCart size={30} className="text-gray-400" />
        <span className="bg-green text-gray-0 text-sm font-bold px-1 rounded-md absolute top-2 right-2">0</span>
      </div>
    </header>
  );
};

export default Header;
