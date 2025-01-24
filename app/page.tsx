import connectDB from "@/config/database";

import Hero from "@/components/Hero/Hero";
import HomeProperties from "@/components/HomeProperties/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes/InfoBoxes";
import FeaturedProperties from "@/components/FeaturedProperties/FeaturedProperties";

const HomePage = () => {
  connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
