import PlantPromoSection from "../../components/PlantPromoCard";
import ShopPage from "../../components/dashboard/ShopPage";
import Showcase from "../../components/Showcase";
import BlogListSection from "../../components/BlogListSection";
import { memo } from "react";

const Home = () => {
  return (
    <div>
      <Showcase />
      <ShopPage />
      <PlantPromoSection />
      <BlogListSection />
    </div>
  );
};

export default memo(Home);
