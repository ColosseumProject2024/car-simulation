import dynamic from "next/dynamic";
import React, { useEffect, useMemo } from "react";
import { useLocation } from "../../contexts/LocationContext";
import queryAllStations from "../../utils/queryAllStations";
import Station from "@/types/station";

interface MapSectionBuypageProps {
  roundedTopCorners: boolean;
  roundedBottomCorners: boolean;
  stations: any;
  width: string;
  setSelectedStation: (station: Station) => void;
}

export const MapSectionBuypage = ({
  roundedTopCorners,
  roundedBottomCorners,
  stations,
  width,
  setSelectedStation,
}: MapSectionBuypageProps) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>Map is loading...</p>,
        ssr: false,
      }),
    []
  );


  return (
    <Map
      buttonText="Select"
      userLocation={[-23.572448, -46.706937]}
      roundedTopCorners={roundedTopCorners}
      roundedBottomCorners={roundedBottomCorners}
      center={[-23.572448, -46.706937]}
      width={width}
      setSelectedStation={setSelectedStation}
      height="460px"
    />
  );
};
