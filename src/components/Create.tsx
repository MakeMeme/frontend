"use client";

import styles from "./Create.module.css";
import { Title, Text, Button, FileButton, TextInput, Box } from "@mantine/core";
import { useMouse } from "@mantine/hooks";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import DefaultImage from "@/assets/Create/DefaultImage.svg";

const leftSection = ({
  ref,
  coordinateSelect,
  state,
  setState,
}: {
  ref: React.RefObject<HTMLDivElement>;
  coordinateSelect: () => void;
  state: {
    label: string;
    coordinateX: number;
    coordinateY: number;
  }[];
  setState: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        coordinateX: number;
        coordinateY: number;
      }[]
    >
  >;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [profileImageSrc, setProfileImageSrc] = useState<string>("");
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    setState([]);
    resetRef.current?.();
  };

  const [imageHeight, setImageHeight] = useState<number>(300);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file as File);

      const img = document.createElement("img");

      const objectURL = URL.createObjectURL(file);

      img.onload = function handleLoad() {
        setImageHeight((img.height / img.width) * 500);
        URL.revokeObjectURL(objectURL);
      };

      img.src = objectURL;
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
        disabled={file ? true : false}
      >
        {(props) => (
          <div
            onClick={() => {
              file && coordinateSelect();
            }}
          >
            <Box
              ref={ref}
              style={{
                position: "relative",
                width: 500,
                height: imageHeight,
                overflow: "hidden",
              }}
            >
              <Image
                src={profileImageSrc ? profileImageSrc : DefaultImage}
                alt="Profile Picture"
                height={imageHeight}
                width={500}
                className={styles.imgSelector}
                priority
                {...props}
              />

              {state.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    position: "absolute",
                    top: item.coordinateY,
                    left: item.coordinateX,
                  }}
                  color="primary"
                  weight={700}
                >
                  {item.label}
                </Text>
              ))}
            </Box>
          </div>
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

const CoordinateInput = ({
  label,
  x,
  y,
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
        <TextInput
          icon={<Text>X</Text>}
          classNames={{ input: styles.inputCoordinateArea }}
          value={x}
        />
        <TextInput
          icon={<Text>Y</Text>}
          classNames={{ input: styles.inputCoordinateArea }}
          value={y}
        />
      </div>
    </div>
  );
};

const rightSection = ({
  x,
  y,
  state,
  setState,
}: {
  x: number;
  y: number;
  state: {
    label: string;
    coordinateX: number;
    coordinateY: number;
  }[];
  setState: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        coordinateX: number;
        coordinateY: number;
      }[]
    >
  >;
}) => {
  const [currentActive, setCurrentActive] = useState<number>(0);

  useEffect(() => {
    setState((prev) => {
      const newState = [...prev];
      newState[currentActive].coordinateX = x;
      newState[currentActive].coordinateY = y;
      return newState;
    });
  }, [x, y]);

  const handleClick = () => {
    setState((prev) => {
      return [
        ...prev,
        {
          label: "Text" + (prev.length + 1).toString(),
          coordinateX: 0,
          coordinateY: 0,
        },
      ];
    });
    setCurrentActive((prev) => prev + 1);
  };

  return (
    <div className={styles.rightSection}>
      <div className={styles.inputContainer}>
        <Text color="primary" weight={700}>
          #Name
        </Text>
        <TextInput
          icon={<Text>#</Text>}
          width="100%"
          classNames={{ input: styles.inputArea }}
        />
      </div>

      {state.map((item, index) => (
        <CoordinateInput
          key={index}
          label={item.label}
          x={item.coordinateX}
          y={item.coordinateY}
        />
      ))}

      <div>
        <Button
          variant="light"
          leftIcon={
            <Text size="lg" color="primary" weight={700}>
              +
            </Text>
          }
          color="gray"
          onClick={handleClick}
        >
          <Text size="sm" color="primary" weight={700}>
            Add
          </Text>
        </Button>
      </div>
      <div>
        <Button color="primary" onClick={handleClick}>
          <Text size="sm" weight={500}>
            Submit
          </Text>
        </Button>
      </div>
    </div>
  );
};

const Create = () => {
  const { ref, x, y } = useMouse();

  const coordinateSelect = () => {
    setXCoordinate(x);
    setYCoordinate(y);
  };

  const [xCoordinate, setXCoordinate] = useState<number>(x);
  const [yCoordinate, setYCoordinate] = useState<number>(y);

  const [state, setState] = useState<
    {
      label: string;
      coordinateX: number;
      coordinateY: number;
    }[]
  >([
    {
      label: "Text1",
      coordinateX: 0,
      coordinateY: 0,
    },
  ]);

  return (
    <div className={styles.container}>
      <Title order={1} color="primary" weight={700}>
        Create a Meme Template
      </Title>
      <Text size="md" color="primary.3" weight={500}>
        Explore your creativity
      </Text>
      <div className={styles.createInfo}>
        {leftSection({ ref, coordinateSelect, state, setState })}
        {rightSection({
          x: xCoordinate,
          y: yCoordinate,
          state,
          setState,
        })}
      </div>
    </div>
  );
};

export default Create;
