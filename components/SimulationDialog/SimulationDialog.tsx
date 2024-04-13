import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SimulationDialog({
  simulationState,
  setSimulationState,
}: {
  simulationState: number;
  setSimulationState: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Dialog open={simulationState == 1 ? true : false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Simulation ahead!</DialogTitle>
        </DialogHeader>

        <p>
          This page simulates what you can do when running the DeVolt app on
          CarPlay/Android Auto.
        </p>
        <p className="text-lg font-semibold">Payment</p>
        <p>
          For the sake of this simulation, you can pay for your charge using a
          browser wallet e.g. Phantom, Brave.
        </p>
        <p className="text-lg font-semibold">Screen</p>
        <p>
          This page won't load properly on mobile/small screens. Please use a desktop or try zooming out.
        </p>
        <p className="text-neutral-500">You can restart anytime by refreshing this page.</p>
        <DialogFooter className="mt-4">
          <Button onClick={() => setSimulationState(2)}>Got it!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
