import styles from "@/styles/LandingPage.module.css";
import { Hero, Usage, Explore, Create, Footer } from "@/components";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <Usage />
      <Explore />
      <Create />
      <Footer />
    </div>
  );
};

export default LandingPage;
