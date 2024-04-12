import React, { useEffect } from "react";
import Map from "../Map/Map";
import { IDL, DEVOLT_PROGRAM_ID, Devolt } from "@/utils/devolt/types";
import { DevoltClient } from "@/utils/devolt";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import Station from "@/types/station";
import { arrayBuffer } from "stream/consumers";
import { randomInt } from "crypto";

export default function MapComponentDashboard() {
  const [stations, setStations] = React.useState<Station[]>([
    {
      address: "Rua dos Pinheiros, jardim angela dos piraguaios, 220",
      batteryLevel: 50,
      id: 1,
      latitude: -23.572448,
      longitude: -46.06937,
      maxCapacity: 100,
      meanPrice: 2.5,
      availablePlugs: "asdgadf",
      maxVoltage: 220,
    },
  ]);

  const connection = useConnection();

  useEffect(() => {
    const getData = async () => {
      const program = new Program<Devolt>(IDL, DEVOLT_PROGRAM_ID, connection);
      return await program.account.station.all();
    };

    getData().then((data) => {
      const arr: Station[] = data.map((i) => {
        return {
          address: i.account.id,
          id: i.account.id,
          latitude: i.account.latitude,
          longitude: i.account.longitude,
          batteryLevel: i.account.batteryLevel,
          maxCapacity: i.account.maxCapacity,
          meanPrice: 15 + Math.ceil(Math.random()*10),
          availablePlugs: "BYD",
          maxVoltage: 220,
        };
      });
      setStations(arr);
    });
  }, []);

  return (
    <Map
      center={[-23.572448, -46.706937]}
      stations={stations}
      height="520px"
      roundedBottomCorners
      roundedTopCorners
      userLocation={[-23.572448, -46.706937]}
    />
  );
}
