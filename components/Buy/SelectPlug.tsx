import React, { useState } from "react";
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

interface SelectPlugProps {
  averagePrice: number;
  selectedStation: Station | null;
  toBeCharged: number;
  chargeCost: number;
}

const SelectPlug = ({
  averagePrice,
  selectedStation,
  toBeCharged,
  chargeCost,
}: SelectPlugProps) => {
  const [openPopUp, setOpenPopUp] = useState(false);

  // Mocked data for charging spots
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

  const handleNextStep = () => {
    // Logic for what happens on the next step
    setOpenPopUp(true); // Assume this opens the dialog for review
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-zinc-900 h-[800px] w-[50%] rounded-3xl p-8 relative">
        <h1 className="ml-4 font-bold text-[30px] text-zinc-200 my-6 mt-0">
          #3 Select your preferred charging spot
        </h1>
        <h2 className="m-6">
          The nearest charging station to your current location is automatically
          selected, but you can choose any DeVolt station you prefer.
        </h2>

        {spots.map((spot) => (
          <div
            className="bg-zinc-950 rounded-lg h-24 w-full my-6"
            key={spot.id}
          >
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="flex justify-center items-center">
                <h1 className="text-center text-xl font-semibold">
                  {spot.name}
                </h1>
              </div>
              <div className="flex justify-center items-center">
                {spot.compatibility}
              </div>
              <div className="flex justify-end items-center mr-8">
                <h1>{spot.status}</h1>
                <input type="radio" name="spot" className="ml-2" />
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0">
          <div className="flex justify-between m-4">
            <button>
              <Image src={arrowReverse} alt="" />
            </button>
            <button
              onClick={handleNextStep}
              className="bg-[#3AFF4E] h-10 w-32 flex items-center justify-center rounded-md"
            >
              <h1 className="text-black mr-2">Next Step</h1>
              <Image src={arrow} alt="" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={openPopUp}>
        <DialogContent className="bg-[#1a1a1a] border-none shadow-lg">
          <DialogTitle className="text-3xl text-white pb-2">
            Review your purchase:
          </DialogTitle>
          <DialogDescription>
            <p className="text-xl font-semibold">
              Selected Station: {selectedStation?.id}
            </p>
            <p className="text-xl font-semibold">
              Address: {selectedStation?.address}
            </p>
            <p className="pt-6 text-xl font-semibold">
              Price for each Kw: {averagePrice} Voltz/Kw
            </p>
            <p className="pt-6 text-xl font-semibold">
              Amount of Kw to be charged: {toBeCharged}
            </p>
            <p className="pt-6 text-xl font-semibold">
              Total to be paid: V${chargeCost}
            </p>
          </DialogDescription>
          <button
            onClick={() => setOpenPopUp(false)}
            className="bg-primary text-black font-semibold px-4 py-2 rounded-lg"
          >
            Place Bid and Unlock Charger
          </button>
          <button
            onClick={() => setOpenPopUp(false)}
            className="bg-[#444] text-white px-4 py-2 rounded-lg"
          >
            Go back
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectPlug;
