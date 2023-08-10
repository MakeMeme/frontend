"use client";

import styles from "./Create.module.css";
import { Title, Text, Button } from "@mantine/core";

const Create = () => {
  return (
    <div className={styles.container}>
      <Title order={1} color="primary" weight={700}>
        Create a Meme
      </Title>
      <Text size="md" color="primary.3" weight={500}>
        Explore your creativity
      </Text>
      <div className={styles.createInfo}>

      </div>
    </div>
  );
};

export default Create;
