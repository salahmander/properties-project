import type { Metadata } from "next";
import "@/assets/styles/globals.css";

import Navbar from "@/components/Navbar/Navbar";

type MainLayoutPropsType = Readonly<{ children: React.ReactNode }>;

export const metadata: Metadata = {
  title: "HomeWright",
  keywords:
    "property, real estate, UK, houses for sale, flats to rent, estate agents, mortgages, property search, lettings, buy, sell, rent",
  description:
    "Discover and compare the best properties across the UK. Whether you’re buying or renting, our platform connects you with detailed listings, expert estate agents, and real-time market insights to help you find the perfect home faste",
};

const MainLayout = ({ children }: MainLayoutPropsType) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default MainLayout;
