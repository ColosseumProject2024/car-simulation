import React, { useCallback, useState } from "react";
import Image from "next/image";
import arrow from "./assets/arrow.svg";
import arrowReverse from "./assets/arrowreverse.svg";
import Station from "@/types/station";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
interface SelectPlugProps {
  setCurrentStep: (step: number) => void;
}

const spots = [
  {
    id: 1,
    name: "Spot 1",
    status: "Available",
    compatibility: "Compatible with your car!",
  },
  {
    id: 2,
    name: "Spot 2",
    status: "Occupied",
    compatibility: "Not compatible with your car",
  },
  {
    id: 3,
    name: "Spot 3",
    status: "Available",
    compatibility: "Compatible with your car!",
  },
  {
    id: 4,
    name: "Spot 4",
    status: "Available",
    compatibility: "Not compatible with your car",
  },
];

export default function Step3({ setCurrentStep }: SelectPlugProps) {


  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    // 890880 lamports as of 2022-09-01
    const lamports = await connection.getMinimumBalanceForRentExemption(0);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports,
      })
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, {
      minContextSlot,
    });

    const res = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });

    if (!res.value.err) {
        setCurrentStep(4);
    }

  }, [publicKey, sendTransaction, connection]);



  return (
    <motion.div
    key={"step3"}
    initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.2 }}
    className="relative h-full">
      <h1 className="text-center font-bold text-5xl pt-4 text-zinc-200 mb-10">
        Review your purchase:
      </h1>
      <div className="w-full text-center bg-neutral-900 max-w-xl mx-auto p-10 rounded-xl">
        <div className="flex gap-2 justify-center w-full">
          <MapPin />
          <p className="font-semibold">{"Rua mmdc, 80. Ap 1003B"}</p>
        </div>
        <div className="flex justify-between pt-10">
          <div className="">
            <p>Your charge will take</p>
            <p className="text-4xl text-green-300 py-2 font-semibold">
              32 minutes
              <span className="text-lg font-normal text-white"> est.</span>
            </p>
          </div>
          <div className="">
            <p>You are paying</p>
            <p className="text-4xl py-2 font-semibold">1440 Volts</p>
          </div>
        </div>
      </div>
      <div className="max-w-xl mt-2 text-center mx-auto">
        <Button className="my-4" onClick={onClick} size={"lg"}>
          Confirm
        </Button>   
        <br />
        <Button onClick={() => setCurrentStep(2)} variant="secondary">
          Go back
        </Button>
      </div>
    </motion.div>
  );
}
