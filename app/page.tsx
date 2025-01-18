import Hero from "@/components/Hero/Hero";
import HomeProperties from "@/components/HomeProperties/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes/InfoBoxes";
import connectDB from "@/config/database";

const HomePage = () => {
  connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
