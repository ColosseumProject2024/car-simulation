import Station from "@/types/station";
import { Devolt, IDL, DEVOLT_PROGRAM_ID } from "@/utils/devolt/types";
import { Program } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

interface ContextType {
  stations: Station[];
  loading: boolean;
}

// Criando o contexto
const StationsContext = createContext<ContextType>({
  stations: [],
  loading: false,
});

// Provider que expõe o contexto
export const StationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const solanaConnection = useConnection();

  useEffect(() => {
    const fetchStations = async () => {
      toast.loading("Fetching stations...", { toastId: "fetchToast" });

      const program = new Program<Devolt>(
        IDL as Devolt,
        DEVOLT_PROGRAM_ID,
        solanaConnection
      );
      const data = await program.account.station.all();
      const arr: Station[] = data.map((i) => {
        return {
          address: "Unknown address :(",
          id: i.account.id,
          latitude: i.account.latitude,
          longitude: i.account.longitude,
          batteryLevel: i.account.batteryLevel,
          maxCapacity: i.account.maxCapacity,
          meanPrice: 15 + Number((Math.random() * 3).toFixed(2)),
          availablePlugs: "BYD",
          maxVoltage: 220,
        };
      });

      for (const [i, station] of arr.entries()) {

        toast.update("fetchToast", {
            render: `Fetching Stations (${i}/${arr.length})`,
        });

        await axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${station.latitude},${station.longitude}&key=AIzaSyCqZt14hGPmKuo4KsNja7Ciz3eebmEL_G8`
          )
          .then((response) => {

            if (response.data.status === "ZERO_RESULTS") {
                station.address = "Unknown address :(";
            }

            const address = response.data.results[0].address_components;

            station.address = `${address[1].short_name} ${address[0].short_name}, ${address[2].short_name} - ${address[3].short_name}`
          })
          .catch((error) => {
            station.address = "Error loading this address :(";
          })
      }

      return arr;
    };

    fetchStations().then((arr) => {
      toast.update("fetchToast", {
        render: "All stations fetched!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setStations(arr);
      setLoading(false);
    });
  }, []);

  return (
    <StationsContext.Provider value={{ stations, loading }}>
      {children}
    </StationsContext.Provider>
  );
};

// Hook para usar o contexto
export const useStations = () => useContext(StationsContext);
