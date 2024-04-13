import React, { useState } from "react";
import HeaderApp from "@/components/HeaderApplication/HeaderApp";
import SidebarApp from "@/components/SidebarApp/SidebarApp";
import { LocationProvider } from "@/contexts/LocationContext";
import Buy from "@/components/Buy/Buy";
import Dashboard from "@/components/Dashboard/Dashboard";
import { SolanaProvider } from "../Wallet/Wallet";
import { AnimatePresence } from "framer-motion";
import { StationsProvider } from "@/contexts/StationsContext";

export default function Simulation() {
  const [activePage, setActivePage] = useState("dashboard");

  const getPageComponent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "paginaTres":
        return <Buy />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LocationProvider>
        <SolanaProvider>
      <StationsProvider>
          <HeaderApp />
          <div className="grid h-[88%] grid-cols-12 h-">
            <SidebarApp setActivePage={setActivePage} />
            <div className="flex col-span-11 flex-col">
              <main className="p-4 h-full">{getPageComponent()}</main>
            </div>
          </div>
      </StationsProvider>
        </SolanaProvider>
    </LocationProvider>
  );
}
