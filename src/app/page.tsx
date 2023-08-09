import styles from "@/styles/LandingPage.module.css";
import { Hero, Usage, Explore, Create, Footer } from "@/components";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Usage />
      <Explore />
      <Create />
      <Footer />
    </div>
  );
};

export default LandingPage;
