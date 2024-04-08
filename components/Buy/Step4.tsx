import React, { useEffect } from "react";
import Image from "next/image";
import Station from "@/types/station";
import chargerDevolt from "./assets/chargerdevoltweb.png";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

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

const Step4 = ({
  selectedStation,
  selectedSpot,
  toBeCharged,
  chargeCost,
}: ConfirmChargeProps) => {

  const [openEndDialog, setOpenEndDialog] = React.useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setOpenEndDialog(true);
    }, 7000);
  })

  return (
    <>
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
              Station: {selectedStation?.address || "Unknown"}
            </p>
            <p className="text-xl">Spot: {selectedSpot?.name || "Unknown"}</p>
            <p className="text-xl">
              To be Charged: {toBeCharged || "Unknown"} kWh
            </p>
            <p className="text-xl font-semibold">
              Total Cost: ${chargeCost || "Unknown"}
            </p>
          </div>
        </div>
      </div>
      <Dialog open={openEndDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Simulation ahead!</DialogTitle>
          </DialogHeader>
          This page simulates what you can <br /> do with your car screen bla
          bla! ble ble blee! <br /> You can interact with the car and the
          screen. Enjoy!
          <DialogFooter>
            <Button onClick={() => {window.location.reload()}}>Got it!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Step4;
