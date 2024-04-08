import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Image from "next/image";
import battery from "./assets/battery.svg";
import arrow from "./assets/arrow.svg";
import arrowReverse from "./assets/arrowreverse.svg";
import Station from "@/types/station";
import { SetStateAction, Dispatch } from "react";
import Buy from "./Buy";
import { motion } from "framer-motion";
interface BuyEnergyProps {
  selectedStation: Station | null;
  initialBatteryLevel: number;
  setChargeCost: Dispatch<SetStateAction<number>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const Step2 = ({
  selectedStation,
  initialBatteryLevel,
  setChargeCost,
  setCurrentStep,
}: BuyEnergyProps) => {
  const [selectedValue, setSelectedValue] = useState(initialBatteryLevel);
  const [showSelectPlug, setShowSelectPlug] = useState(false);

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(3);
  };

  const handleChange = (newValue: any) => {
    setChargeCost(
      (newValue - initialBatteryLevel) * (selectedStation?.meanPrice || 10)
    );
    setSelectedValue(newValue);
  };
  const toBeCharged = (currentBattery: number, selectedValue: number) =>
    selectedValue - currentBattery;
  const chargePercentage = toBeCharged(initialBatteryLevel, selectedValue);
  const chargeCost = chargePercentage * (selectedStation?.meanPrice || 10);

  const totalWidth = 170; // Total width of the battery
  const futureBatteryInWidth = (totalWidth * selectedValue) / 100; // Width of the green rectangle
  const currentBatteryInWidth = (totalWidth * initialBatteryLevel) / 100; // Width of the grey rectangle (current battery level)

  return (
    <motion.div
    key={"Step2"}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl text-center h-full p-2 relative"
    >
      <p className=" py-4 font-bold text-4xl text-zinc-200">
        Select your preferred charging amount.
      </p>
      <h2 className="pt-4 pb-6 max-w-lg mx-auto">
        The white section of the bar indicates your current battery level.
        Adjust the selector to fill the green part, representing your target
        charge level.
      </h2>
      <div className="relative flex mb-4 justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="392"
          height="126"
          fill="none"
          viewBox="0 0 196 63"
          className="z-0"
        >
          <rect
            fill="#25CB55"
            x="6"
            y="6"
            width={futureBatteryInWidth}
            height="51"
          ></rect>
          <rect
            fill="#D9D9D9"
            x="6"
            y="6"
            width={currentBatteryInWidth}
            height="51"
          ></rect>
        </svg>
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src={battery}
            alt="Battery icon"
            className="z-10"
            width="392"
            height="126"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-2/3 mx-auto">
        <Slider
          min={initialBatteryLevel}
          max={100}
          value={selectedValue}
          onChange={handleChange}
          step={1}
          railStyle={{ height: 20 }}
          handleStyle={{
            borderColor: "#0f0",
            height: 28,
            width: 28,
            marginLeft: 0,
            marginTop: -3,
            backgroundColor: "#0f0",
          }}
          trackStyle={{ backgroundColor: "#0f0", height: 20 }}
        />
        <h1 className="mt-12 text-2xl">Target Charge Level</h1>
        <p className=" text-5xl font-bold px-2 mt-4">{selectedValue}%</p>
        <p className="text-lg mt-2 px-2 ">
          {/* Total to be paid: V${(selectedValue * averagePrice).toFixed(2)} */}
          To be paid: <span className="font-bold">{chargeCost}</span>
          Volts
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex justify-between m-4">
          <button onClick={handleBackStep}>
            <Image src={arrowReverse} alt="" />
          </button>
          <button
            onClick={handleNextStep}
            className="bg-[#3AFF4E] h-10 w-32 flex items-center justify-center rounded-md"
          >
            <h1 className="text-black mr-2">Confirm</h1>
            <Image src={arrow} alt="" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
