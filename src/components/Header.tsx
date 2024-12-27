import Image from "next/image";
import { IoMdCart } from "react-icons/io";

const Header = () => {
  return (
    <header>
      <Image src={"/Logo.svg"} alt="Site logo" width={300} height={300} />
      <div>
        <IoMdCart size={30} />
        <span>0</span>
      </div>
    </header>
  );
};

export default Header;
