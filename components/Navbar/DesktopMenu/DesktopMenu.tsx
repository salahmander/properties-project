import Link from "next/link";

const DesktopMenu = ({ pathName }: { pathName: string }) => {
  console.log(pathName);
  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex space-x-2">
        <Link
          href="/"
          className={`text-white ${
            pathName === "/" ? "bg-black" : ""
          } hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className={`text-white ${
            pathName === "/properties" ? "bg-black" : ""
          } hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
        >
          Properties
        </Link>
        <Link
          href="/properties/add"
          className={`text-white ${
            pathName === "/properties/add" ? "bg-black" : ""
          } hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
        >
          Add Property
        </Link>
      </div>
    </div>
  );
};

export default DesktopMenu;
