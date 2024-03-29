"use client";

import "./globals.css";
import { MantineProvider, ButtonStylesParams } from "@mantine/core";
import { Manrope } from "next/font/google";
import { AppProps } from "next/app";
const manropeFont = Manrope({ subsets: ["latin"] });
import { RouterTransition } from "@/components/RouterTransition";
import { AuthProvider } from "@descope/react-sdk";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Mantine theme override here */
          colorScheme: "light",
          colors: {
            primary: [
              "#ebf6ff",
              "#9BB0C3",
              "#6487A4",
              "#283b4bb3",
              "#364E62",
              "#283B4B",
              "#1C2832",
              "#131B22",
              "#0D1217",
              "#090D0F",
            ],
            secondary: [
              "#F1F3F5",
              "#CED8E0",
              "#A9BFD4",
              "#80AAD1",
              "#4F98DC",
              "#0F89F9",
              "#2676BF",
              "#356692",
              "#3B5873",
              "#3A4C5D",
            ],
            black: [
              "#000000",
              "#111111",
              "#222222",
              "#333333",
              "#444444",
              "#555555",
              "#666666",
              "#777777",
              "#888888",
              "#999999",
            ],
          },
          components: {
            Button: {
              styles: (theme, params: ButtonStylesParams, { variant }) => ({
                label: {
                  fontWeight: 500,
                },
              }),
            },
          },
          primaryShade: 5,
          primaryColor: "primary",
          fontFamily: manropeFont.style.fontFamily,
          defaultRadius: "var(--general-box-border-radius)",
          headings: {
            fontFamily: manropeFont.style.fontFamily,
            sizes: {
              h1: { fontSize: "var(--h1)" },
              h2: { fontSize: "var(--h2)" },
              h3: { fontSize: "var(--h3)" },
              h4: { fontSize: "var(--h4)" },
              h5: { fontSize: "var(--h5)" },
              h6: { fontSize: "var(--h6)" },
            },
          },
          fontSizes: {
            xs: "0.625rem",
            sm: "0.875rem",
            md: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            xxl: "1.5rem",
          },
        }}
      >
        {/* <RouterTransition /> */}
        <AuthProvider
          projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID!}
          baseUrl={process.env.NEXT_PUBLIC_DESCOPE_BASE_URL}
          // use the bellow option when you need to use session token in the SSR render cycle
          sessionTokenViaCookie
        >
          <body
            className={manropeFont.className}
            suppressHydrationWarning={true}
          >
            {children}
          </body>
        </AuthProvider>
      </MantineProvider>
    </html>
  );
}
