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
    () =>
      dynamic(() => import("@/components/Map/Map"), {
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

  const price = selectedStation?.meanPrice || 0;

  if (showBuyEnergyPage) {
    return (
      <BuyEnergy
        averagePrice={price}
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        value={value}
        setValue={setValue}
        onSubmit={() => setOpenPopUp(true)}
      />
    );
  }

  function placeBid() {
    throw new Error("Function not implemented.");
  }

  return (
    <LocationProvider>
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-2 text-center pt-4 px-4">
          <h1 className="font-bold text-[30px] text-zinc-200">
            Select your DeVolt Station
          </h1>
          <h2 className="m-6">
            The nearest charging station to your current location is
            automatically selected, but you can choose any DeVolt station you
            prefer.
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
        <div className="bg-neutral-800 rounded-lg p-4">
          <StationData selectedStation={selectedStation} />
          <div>
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
                    Price for each Kw: {selectedStation?.meanPrice} Voltz/Kw
                  </p>
                  <p className="pt-6 text-xl font-semibold">
                    Amount of Kw you are buying: {value} Kws
                  </p>
                  <p className="pt-6 text-xl font-semibold">
                    Total to be paid:{" "}
                    {value * (selectedStation?.meanPrice ?? 0)} Voltz
                  </p>
                </DialogDescription>
                <button
                  onClick={() => {
                    placeBid();
                    setOpenPopUp(false);
                  }}
                  className="bg-primary text-black font-semibold px-4 py-2 rounded-lg"
                >
                  Place Bid
                </button>
                <button
                  onClick={() => setOpenPopUp(false)}
                  className="bg-[#444] text-white px-4 py-2 rounded-lg"
                >
                  Go back
                </button>
              </DialogContent>
            </Dialog>
    </LocationProvider>
  );
};

export default Buy;
