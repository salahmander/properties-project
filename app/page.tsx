import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/properties">Go To Properties</Link>
    </div>
  );
};

export default HomePage;
