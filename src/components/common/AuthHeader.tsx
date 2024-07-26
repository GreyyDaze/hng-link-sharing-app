import Image from "next/image";
 
const AuthHeader = () => {
  return (
    <div className="flex md:justify-center ml-7 md:ml-0 items-center md:w-[476px] ">
      <Image
        loading="lazy"
        src="/icons/logo.png"
        className="aspect-[1] w-[40px]"
        alt="Logo"
        width={200}
        height={200}
      />
      <h2 className="text-gray-dark font-bold text-2xl md:text-heading-m ml-1 ">
        devLinks
      </h2>
    </div>
  );
};
export default AuthHeader;
