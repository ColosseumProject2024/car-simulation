import React, { useEffect, useMemo, useState } from "react";
import { Step2 } from "./Step2";
import Station from "../../types/station";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { AnimatePresence } from "framer-motion";

const mockStations: Station[] = [
  {
    latitude: -22.979267,
    longitude: -43.212659,
    address: "Rua piraciba",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    id: "1",
    meanPrice: 40,
    batteryLevel: 50,
    maxCapacity: 100,
  },
  {
    latitude: -22.97097,
    longitude: -43.21734,
    address: "Rua Maringá",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    id: "2",
    meanPrice: 30,
    batteryLevel: 50,
    maxCapacity: 100,
  }
];

const Buy = () => {
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedEnergyAmount, setSelectedEnergyAmount] = useState(0);
  const [chargeCost, setChargeCost] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [intialBatteryLevel, setInitialBatteryLevel] = useState(50);

  useEffect(()=>{
    setInitialBatteryLevel(Math.floor(Math.random() * 30)+5)
  }, [])

  return (
    <>
        <AnimatePresence mode="wait">
      {currentStep == 1 && <Step1 setCurrentStep={setCurrentStep} stations={stations} setSelectedStation={setSelectedStation}/>}
      {currentStep == 2 && (
        <Step2
        initialBatteryLevel={intialBatteryLevel}
        selectedStation={selectedStation}
        setChargeCost={setChargeCost}
        setCurrentStep={setCurrentStep}
        />
        )}
      {currentStep == 3 && <Step3 setCurrentStep={setCurrentStep} chargeCost={chargeCost} />}
      {currentStep == 4 && <Step4 selectedStation={selectedStation} chargeCost={chargeCost} />}
      </AnimatePresence>
    </>
  );
};

export default Buy;
