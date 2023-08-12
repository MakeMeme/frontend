"use client";

import styles from "./Create.module.css";
import { Title, Text, Button, FileButton, Input, Box } from "@mantine/core";
import { useMouse } from "@mantine/hooks";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import DefaultImage from "@/assets/Create/DefaultImage.svg";

const leftSection = ({ ref }: { ref: React.RefObject<HTMLDivElement> }) => {
  const [file, setFile] = useState<File | null>(null);
  const [profileImageSrc, setProfileImageSrc] = useState<string>("");
  const resetRef = useRef<() => void>(null);

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
    <div className={styles.profileImage}>
      <FileButton
        resetRef={resetRef}
        onChange={setFile}
        accept="image/png,image/jpeg"
      >
        {(props) => (
          <Box
            ref={ref}
            style={{
              position: "relative",
              width: 500,
              height: 300,
              overflow: "hidden",
            }}
          >
            <Image
              src={profileImageSrc ? profileImageSrc : DefaultImage}
              alt="Profile Picture"
              height={300}
              width={500}
              className={styles.imgSelector}
              priority
              {...props}
            />
          </Box>
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
  );
};

const InputArea = (label: string) => {
  return (
    <div className={styles.inputContainer}>
      <Text color="primary" weight={700}>
        #{label}
      </Text>
      <div className={styles.inputField}>
        <Input icon={<Text>#</Text>} classNames={{ input: styles.inputArea }} />
      </div>
    </div>
  );
};

const CoordinateInput = ({
  label,
  x,
  y
}: {
  label: string;
  x: number;
  y: number;
}) => {
  return (
    <div className={styles.inputContainer}>
      <Text color="primary" weight={700}>
        #{label}
      </Text>
      <div className={styles.inputField}>
        <Input
          icon={<Text>X</Text>}
          classNames={{ input: styles.inputCoordinateArea }}
          value={x}
        />
        <Input
          icon={<Text>Y</Text>}
          classNames={{ input: styles.inputCoordinateArea }}
          value={y}
        />
      </div>
    </div>
  );
};

const rightSection = ({ x, y }: { x: number; y: number }) => {
  return (
    <div className={styles.rightSection}>
      {InputArea("Name")}
      {CoordinateInput(
        {
          label: "Text1",
          x: x,
          y: y,
        },
      )}
    </div>
  );
};

const Create = () => {
  const { ref, x, y } = useMouse();

  return (
    <div className={styles.container}>
      <Title order={1} color="primary" weight={700}>
        Create a Meme
      </Title>
      <Text size="md" color="primary.3" weight={500}>
        Explore your creativity
      </Text>
      <div className={styles.createInfo}>
        {leftSection({ ref })}
        {rightSection({
          x: x,
          y: y,
        })}
      </div>
    </div>
  );
};

export default Create;
