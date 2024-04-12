import "../../app/globals.css";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import energy from "./assets/energy.svg";
import chargingstation from "./assets/chargingstation.svg";
import MapComponentDashboard from "./MapComponentDashboard";

const Dashboard = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="grid grid-cols-2">
      <div className="p-3">
        <MapComponentDashboard/>
      </div>
      <div className="grid grid-rows-2">
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
            <div>
              <h1 className="text-lg  font-medium">Avenida rebouças, 3004</h1>
              <h1 className="text-lg">Price 0,88/kWh</h1>
            </div>
          </div>
        </div>
        <div className="m-3  bg-zinc-800 rounded-[25px]">
          <div className="m-6 grid grid-cols-1 grid-rows-3 gap-4">
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
            <div>
              <h1 className="text-3xl  font-medium">VOLT$ 0,90 /kWh</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
