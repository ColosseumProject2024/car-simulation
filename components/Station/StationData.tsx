import React from "react";
import Image from "next/image";
import Station from "../../types/station";
import makePercentage from "../../utils/makePercentage";
import { CircleCheckBig, CircleGauge, Coins, LandPlot, MapPin } from "lucide-react";

interface StationDataProps {
  selectedStation: Station | null;
}

export const StationData = ({ selectedStation }: StationDataProps) => {
  return (
    <>
      <p className="text-3xl text-[#37e231] font-bold">Selected station</p>
      <div className="flex gap-2 items-center my-4">
        <MapPin width={30} height={30} />
        <p className="font-bold">Address</p>
        <span>{selectedStation?.address || "-"}</span>
      </div>
      <div className="flex gap-2 items-center my-4">
      <CircleCheckBig  width={30} height={30} />
        <b>Compatibility</b>
        <span>BYD, EC20 and Volvo Plugs</span>
      </div>
      <div className="flex gap-2 items-center my-4">
      <Coins  width={30} height={30} />
        <b>Price per Kw ($V)</b>
        <span>{selectedStation?.meanPrice || "-"}</span>
      </div>
      <div className="flex gap-2 items-center my-4">
      <CircleGauge  width={30} height={30} />

        <p className="font-bold">Charge Speed:</p>
        <span>
          {selectedStation?.batteryLevel !== undefined &&
          selectedStation?.maxCapacity !== undefined
            ? `${makePercentage(
                selectedStation.batteryLevel,
                selectedStation.maxCapacity
              ).toFixed(0)}%`
            : "---"}
        </span>
      </div>
    </>
  );
};
