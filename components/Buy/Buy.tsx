import React, { useMemo, useState } from "react";
import { BuyEnergy } from "./BuyEnergy";
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

const mockStations: Station[] = [
  {
    latitude: -22.979267,
    longitude: -43.212659,
    address: "Rio de Janeiro, RJ, Brazil",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    id: 1,
    meanPrice: 30,
    batteryLevel: 50,
    maxCapacity: 100,
  },
  {
    latitude: -22.97097,
    longitude: -43.21734,
    address: "Rio de Janeiro, RJ, Brazil",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    id: 2,
    meanPrice: 30,
    batteryLevel: 50,
    maxCapacity: 100,
  },
  {
    latitude: -22.982116185222058,
    longitude: -43.21677437969157,
    address: "Rio de Janeiro, RJ, Brazil",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    id: 3,
    meanPrice: 30,
    batteryLevel: 50,
    maxCapacity: 100,
  },
  {
    latitude: -23.555814,
    longitude: -46.733911,
    address: "Sao Paulo, SP, Brazil",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    id: 3,
    meanPrice: 30,
    batteryLevel: 80,
    maxCapacity: 100,
  },
];

const Buy = () => {
  const Map = useMemo(
    () => dynamic(() => import("@/components/Map/Map"), {
      loading: () => <p>map is loading</p>,
      ssr: false,
    }),
    []
  );

  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [value, setValue] = useState(0);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [showBuyEnergyPage, setShowBuyEnergyPage] = useState(false);

  const handleNextStep = () => {
    if (!selectedStation) {
      alert("Please select a station to proceed.");
      return;
    }
    setShowBuyEnergyPage(true);
  };

  if (showBuyEnergyPage) {
    return (
      <BuyEnergy
        averagePrice={selectedStation?.meanPrice || 0}
        selectedStation={selectedStation}
        value={value}
        setSelectedStation={setSelectedStation}
        setValue={setValue}
        onSubmit={() => setOpenPopUp(true)}
      />
    );
  }

  return (
    <LocationProvider>
      <div className={`grid h-full ${selectedStation ? 'grid-cols-3' : 'grid-cols-1'}`}>
        <div className={`${selectedStation ? 'col-span-2' : 'col-span-1'} text-center pt-4 px-4`}>
          <h1 className="font-bold text-[30px] text-zinc-200">
            Select your DeVolt Station
          </h1>
          <h2 className="m-6">
            The nearest charging station to your current location is automatically selected, but you can choose any DeVolt station you prefer.
          </h2>
          <MapSectionBuypage
            roundedTopCorners={true}
            roundedBottomCorners={true}
            stations={stations}
            setStations={setStations}
            width={"100%"}
            setSelectedStation={setSelectedStation}
          />
        </div>
        {selectedStation && (
          <div className="bg-neutral-800 rounded-lg p-4">
            <StationData selectedStation={selectedStation} />
            <div className="relative bottom-0 left-0 right-0 p-4 flex justify-between">
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
        )}
      </div>
    </LocationProvider>
  );
};

export default Buy;