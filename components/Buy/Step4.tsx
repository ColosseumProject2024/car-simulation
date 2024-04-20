import React, { useEffect } from "react";
import Image from "next/image";
import Station from "@/types/station";
import chargerDevolt from "./assets/chargerdevoltweb.png";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ConfirmChargeProps {
    selectedStation: Station | null;
    chargeCost: number;
}

const Step4 = ({
    selectedStation,chargeCost
}: ConfirmChargeProps) => {

    const [openEndDialog, setOpenEndDialog] = React.useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOpenEndDialog(true);
        }, 7000);
    })

    return (
        <>
            <div className="flex justify-center items-center min-h-full">
                <div className="bg-zinc-900 w-1/2 rounded-3xl p-4 flex flex-col items-center">
                    <h1 className="font-bold text-[30px] text-zinc-200 my-6 text-center">
                        Your spot is unlocked!
                    </h1>
                    <Image
                        src={chargerDevolt}
                        alt="Charger"
                        width="200"
                        height="200"
                        className="mb-6"
                    />
                    <div className="text-center">
                        <p className="text-xl font-semibold">
                            Station: {selectedStation?.address || "Rua Piracicaba"}
                        </p>
                        <p className="text-xl">Spot: { "Rua piraciba"}</p>
                        <p className="text-xl">
                            To be Charged: { "2500"} kW
                        </p>
                        <p className="text-xl font-semibold">
                            Total Cost: ${"1440"} VOLTS
                        </p>
                    </div>
                </div>
            </div>
            <Dialog open={openEndDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Simulation ahead!</DialogTitle>
                    </DialogHeader>
                    This page simulates what you can do with your car when you want to charge it. You can see the charging station, the spot, the amount of energy to be charged and the total cost.
                    <DialogFooter>
                        <Button onClick={() => { window.location.reload() }}>Got it!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Step4;
