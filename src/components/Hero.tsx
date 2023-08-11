"use client";

import styles from "./Hero.module.css";
import Image from "next/image";
import { logo } from "@/assets/Hero";
import { Title, Text, Button } from "@mantine/core";

const navlinks = [
  {
    name: "Usage",
    url: "/usage",
  },
  {
    name: "Explore",
    url: "/explore",
  },
  {
    name: "Create",
    url: "/create",
  },
];

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo} style={{cursor: "pointer"}}>
          <Image src={logo} alt="logo" width={50} height={50} />
          <Title color="primary" order={4}>
            MakeMeme
          </Title>
        </div>
        <div className={styles.navbarLinks}>
          {navlinks.map((link) => (
            <Text
              key={link.name}
              weight={600}
              size="sm"
              color="primary"
              className={styles.navbarLink}
              style={{ cursor: "pointer" }}
            >
              {link.name}
            </Text>
          ))}
        </div>
      </div>
      <div className={styles.rightSection}>
        <Button variant="subtle" style={{ borderRadius: "0.625rem" }}>Sign Up</Button>
        <Button style={{ borderRadius: "0.625rem" }}>Login</Button>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.contentText}>
          <Title
            weight={700}
            color="primary"
            align="center"
            order={1}
            className={styles.heroTitle}
          >
            Tweet to Meme: Unleash Laughter with Every Message!
          </Title>
          <Text
            weight={500}
            size="sm"
            color="primary.3"
            className={styles.heroTitle}
            align="center"
          >
            Lorem ipsum dolor sit amet consectetur. Nisl ac tortor diam gravida
            diam. Sem egestas cras ultricies massa morbi erat in. Nec habitasse
            a et ut duis dignissim. In dui viverra pulvinar magna nunc urna sed
            egestas. In ut aliquam netus.
          </Text>
        </div>
        <Button style={{ borderRadius: "0.625rem" }}>Get Started</Button>
      </div>
    </div>
  );
};

export default Hero;
