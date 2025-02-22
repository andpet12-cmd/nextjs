import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import styles from "@/app/page.module.css";
import {Search} from "@/components/search/Search";
import {Menu} from "@/components/menu/server-menu/Menu";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "App for checking users and recipes",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.page}>
            <Menu/>
            <Search/>
            {children}
            <hr/>
        </div>
        </body>
        </html>
    );
}
