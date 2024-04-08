import React, { useMemo, useState } from "react";
import { StationData } from "../Station/StationData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { MapSectionBuypage } from "../Map/MapSectionBuyPage";
import Station from "../../types/station";
import Image from "next/image";
import arrow from "./assets/arrow.svg";
import arrowReverse from "./assets/arrowreverse.svg";
import { LocationProvider } from "@/contexts/LocationContext";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

export default function Step1({
  setSelectedStation,
  setCurrentStep,
  stations,
}: {
  setCurrentStep: (step: number) => void;
  stations: Station[];
  setSelectedStation: (station: Station) => void;
}) {
  const handleStationSelected = (station: Station) => {
    setSelectedStation(station);
    setCurrentStep(2);
  };

  return (
    <motion.div
    key={"Step1"}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x:0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{duration: 0.2}}

      className={`grid h-full`}
    >
      <div className={`text-center px-4`}>
        <h1 className="font-bold pb-4 text-[30px] text-zinc-200">
          Select a DeVolt station
        </h1>
        <MapSectionBuypage
          roundedTopCorners={true}
          roundedBottomCorners={true}
          stations={stations}
          width={"100%"}
          setSelectedStation={handleStationSelected}
        />
      </div>
    </motion.div>
  );
}
