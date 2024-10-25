import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/Header";
import "./globals.css";
import ThemeToggleButton from "@/app/toggle";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Create E -Commerce App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={"bg-white dark:bg-black text-black dark:text-white"}
      >
        <Toaster />
        <NextUIProvider>
        {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
