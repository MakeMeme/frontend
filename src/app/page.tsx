"use client";

import styles from "@/styles/LandingPage.module.css";
import { Hero, Usage, Explore, Create, Footer } from "@/components";
import { useDescope, useSession, useUser } from "@descope/react-sdk";
import { GetServerSideProps } from "next";
import { validateRequestSession } from "@/utils/auth";
import { SyntheticEvent, useCallback, useEffect } from "react";

type Repo = {
  name: string;
  stargazers_count: number;
};

const getUserDisplayName = (user: any) => user?.name || user?.externalIds?.[0] || '';

const LandingPage = () => {
  const { isAuthenticated } = useSession();
  const { user } = useUser();
  const { logout } = useDescope();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

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

export const getServerSideProps: GetServerSideProps<{
  repo: Repo;
}> = async () => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  return { props: { repo } };
};
