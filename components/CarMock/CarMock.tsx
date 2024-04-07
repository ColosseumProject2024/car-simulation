import Image from "next/image";
import React, { useEffect, useState } from "react";
import Car from "@/public/car_mock.jpg";
import { motion, useAnimate } from "framer-motion";

export default function CarMock({
  simulationState,
  setSimulationState,
}: {
  simulationState: number;
  setSimulationState: React.Dispatch<React.SetStateAction<number>>;
}) {


    const [scope, animate] = useAnimate();
    const [animationAlreadyStarted, setAnimationAlreadyStarted] = useState(false);
  
    useEffect(() => {
      if (animationAlreadyStarted || simulationState != 2) return;
        animate(
          scope.current,
          { opacity: 0, scale: 1.5},
          { duration: 1, delay: 1}
        );
        setAnimationAlreadyStarted(true);
    }, [simulationState]);


  return (
<div className="absolute flex items-center justify-center -z-10 overflow-hidden h-screen">
  <motion.div
  ref={scope}
        initial={{ opacity: 1 }}
        className="max-w-3/4 h-3/4  text-center"
      >
    <Image
      src={Car}
      alt="Car"
      className="object-contain h-full"
    />
  </motion.div>
</div>
  );
}
