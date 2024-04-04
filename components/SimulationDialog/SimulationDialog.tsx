import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
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
          <DialogTitle>Simulation ahead!</DialogTitle>
        </DialogHeader>
        This page simulates what you can <br /> do with your car screen bla bla!
        ble ble blee! <br /> You can interact with the car and the screen.
        Enjoy!
        <DialogFooter>
          <Button onClick={() => setSimulationState(2)}>Got it!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
