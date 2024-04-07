import React from "react";
import Image from "next/image";
import Station from "@/types/station";
import chargerDevolt from "./assets/chargerdevoltweb.png";

interface ConfirmChargeProps {
  selectedStation: Station | null;
  selectedSpot: {
    id: number;
    name: string;
    compatibility: string;
    status: string;
  };
  toBeCharged: number;
  chargeCost: number;
}

const ConfirmCharge = ({
  selectedStation,
  selectedSpot,
  toBeCharged,
  chargeCost,
}: ConfirmChargeProps) => {
  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="bg-zinc-900 w-1/2 rounded-3xl p-4 flex flex-col items-center">
        <h1 className="font-bold text-[30px] text-zinc-200 my-6 text-center">
          Your spot is unlocked!
        </h1>
        <Image
          src={chargerDevolt}
          alt="Charger"
          width="200"
          height="200"
          className="mb-6"
        />
        <div className="text-center">
          <p className="text-xl font-semibold">
            Station: {selectedStation?.address}
          </p>
          <p className="text-xl">Spot: {selectedSpot.name}</p>
          <p className="text-xl">To be Charged: {toBeCharged} kWh</p>
          <p className="text-xl font-semibold">Total Cost: ${chargeCost}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCharge;
