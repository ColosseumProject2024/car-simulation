import React, { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
export default function MapComponentDashboard() {

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map/Map"), {
        loading: () => <p>Map is loading...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <Map
      center={[-23.572448, -46.706937]}
      height="520px"
      roundedBottomCorners
      roundedTopCorners
      userLocation={[-23.572448, -46.706937]}
    />
  );
}
