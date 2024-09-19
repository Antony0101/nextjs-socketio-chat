import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import { Toaster } from "../components/ui/toaster";
import ReactQueryProvider from "../utils/Providers/ReactQueryProvider";
import { UserContextProvider } from "../lib/contexts/userContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Simple Chat App",
    description: "simple chat app with Next.js and socket.io and mongodb",
};

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.variable}>
                <ReactQueryProvider>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                        position={"left"}
                    />
                    <UserContextProvider>{children}</UserContextProvider>
                </ReactQueryProvider>
                <Toaster />
            </body>
        </html>
    );
}
