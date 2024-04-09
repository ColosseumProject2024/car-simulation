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
                This page simulates what you can do with your car when you want to charge it. You can see the charging station, the spot, the amount of energy to be charged and the total cost.
                <DialogFooter>
                    <Button onClick={() => setSimulationState(2)}>Got it!</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
