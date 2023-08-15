'use client'

import styles from "./Navbar.module.css";
import { Title, Text, Button } from "@mantine/core";
import Image from "next/image";
import { logo } from "@/assets/Hero";

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
        <div className={styles.logo} style={{ cursor: "pointer" }}>
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
        <Button variant="subtle" style={{ borderRadius: "0.625rem" }}>
          Sign Up
        </Button>
        <Button style={{ borderRadius: "0.625rem" }}>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
