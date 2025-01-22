import type { Metadata } from "next";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "@/context/AuthProvider";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import "@/assets/styles/globals.css";

type MainLayoutPropsType = Readonly<{ children: React.ReactNode }>;

export const metadata: Metadata = {
  title: "WrongMove",
  keywords:
    "property, real estate, UK, houses for sale, flats to rent, estate agents, mortgages, property search, lettings, buy, sell, rent",
  description:
    "Discover and compare the best properties across the UK. Whether you’re buying or renting, our platform connects you with detailed listings, expert estate agents, and real-time market insights to help you find the perfect home faste",
};

const MainLayout = ({ children }: MainLayoutPropsType) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
