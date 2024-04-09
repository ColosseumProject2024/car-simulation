// components/Header.tsx
import React from "react";
import logo from "@/public/logo_horizontal.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import weather from "@/public/cloud-sun.svg";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const HeaderApp = () => {
    return (
        <header className="w-full flex h-[12%] justify-between items-center p-4 bg-black text-white">
            <div>
                <Image src={logo} alt="logo" height={50} />
            </div>
            <div className="flex gap-4">
                <div className=" text-center justify-center items-center">
                    <h1 className="font-semibold text-lg">10:30 AM</h1>
                    <span className="font-thin">06-22-2023</span>
                </div>
                <Image src={weather} width={35} alt="wather" />
            </div>
            <div className="pr-4">
                <WalletMultiButton style={{
                    backgroundColor: "rgb(58 255 78 / var(--tw-bg-opacity))",
                    color: "black"
                }} />
            </div>
        </header>
    );
};

export default HeaderApp;
