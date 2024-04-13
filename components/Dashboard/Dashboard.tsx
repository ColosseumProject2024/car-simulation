import "../../app/globals.css";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import energy from "./assets/energy.svg";
import chargingstation from "./assets/chargingstation.svg";
import MapComponentDashboard from "./MapComponentDashboard";
import { useStations } from "@/contexts/StationsContext";

const Dashboard = () => {

  const {averagePrice} = useStations()

  return (
    <div className="grid grid-cols-3">
      <div className="p-3 col-span-2">
        <MapComponentDashboard/>
      </div>
      <div className="grid grid-rows-2 h-[545px]">
        <div className="m-3 bg-zinc-800 rounded-[25px]">
          <div className="m-6 grid grid-cols-1 grid-rows-3 gap-4">
            <div className="flex items-center">
              <Image
                src={energy}
                alt="Dashboard icon"
                width={32}
                height={32}
                className="text-zinc-400"
              />
              <h1 className="ml-4 font-bold text-[30px] text-zinc-400">
                Nearest Charging Point
              </h1>
            </div>
            <div className="text-center mt-4">
              <h1 className="text-lg  font-medium">Avenida rebouças, 3004</h1>
              <h1 className="text-lg">$15.88/kWh</h1>
            </div>
          </div>
        </div>
        <div className="m-3  bg-zinc-800 rounded-[25px]">
          <div className="m-6 h-48 grid grid-cols-1 grid-rows-3 gap-4">
            <div className="flex items-center">
              <Image
                src={chargingstation}
                alt="charging station icon"
                width={32}
                height={32}
                className="text-zinc-400"
              />
              <h1 className="ml-4 font-bold text-[30px] text-zinc-400">
                Average energy price
              </h1>
            </div>
            <div className="text-center">
              <p className="text-2xl mt-8  font-semibold">${averagePrice?.toFixed(2)}/kWh</p>
              <p className="text-xl  font-medium">VOLTs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
