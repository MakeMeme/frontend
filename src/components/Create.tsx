"use client";

import styles from "./Create.module.css";
import { Title, Text, Button, FileButton } from "@mantine/core";
import { useMouse } from "@mantine/hooks";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import DefaultImage from "@/assets/Create/DefaultImage.svg";

const Create = () => {
  const [file, setFile] = useState<File | null>(null);
  const [profileImageSrc, setProfileImageSrc] = useState<string>("");
  const resetRef = useRef<() => void>(null);

  const { ref, x, y } = useMouse();

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file as File);
    } else {
      setProfileImageSrc("");
    }
  }, [file]);

  return (
    <div className={styles.container}>
      <Title order={1} color="primary" weight={700}>
        Create a Meme
      </Title>
      <Text size="md" color="primary.3" weight={500}>
        Explore your creativity
      </Text>
      <div className={styles.createInfo}>
        <div className={styles.profileImage}>
          <FileButton
            resetRef={resetRef}
            onChange={setFile}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Image
                src={profileImageSrc ? profileImageSrc : DefaultImage}
                alt="Profile Picture"
                height={300}
                width={500}
                className={styles.imgSelector}
                priority
                {...props}
              />
            )}
          </FileButton>
          <div className={styles.saveButtons}>
            <Button
              color="secondary"
              variant="filled"
              size="md"
              // radius={"xl"}
              disabled={!file}
              fullWidth
            >
              Save
            </Button>
            <Button
              variant="outlined"
              size="md"
              // radius={"xl"}
              color="primary"
              disabled={!file}
              onClick={clearFile}
              fullWidth
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
