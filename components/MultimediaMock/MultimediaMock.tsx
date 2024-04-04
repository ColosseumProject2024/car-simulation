import Image from "next/image";
import React, { useEffect, useState } from "react";
import screen from "@/public/screen.png";
import { motion, useAnimate } from "framer-motion";

export default function MultimediaMock({
  simulationState,
  setSimulationState,
  children,
}: {
  simulationState: number;
  setSimulationState: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}) {
  const [scope, animate] = useAnimate();
  const [animationAlreadyStarted, setAnimationAlreadyStarted] = useState(false);

  useEffect(() => {
    if (animationAlreadyStarted || simulationState != 2) return;
    animate(
      scope.current,
      { opacity: 1, scale: 1 },
      { duration: 1, delay: 2, ease: "easeInOut", type: "spring" }
    );
    setAnimationAlreadyStarted(true);
  }, [simulationState]);

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0, scale: 0.8 }}
      className="overflow-hidden mt-32 flex justify-center content-center"
    >
      <div
        style={{
          border: "solid 2px #5f5f5f",
          borderRadius: "20px",
        }}
        className="max-w-screen-xl h-3/4 w-11/12 aspect-video bg-neutral-800"
      >
        <div
          className="h-full w-full"
          style={{
            border: "30px solid #131313",
            borderRadius: "20px",
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

//   return (
//     <div className="relative">
//   <div className="flex items-center justify-center h-screen">
//           <motion.div
//           ref={scope}
//            initial={{ opacity: 0, scale: 0.8 }}
//      className="max-w-3/4 h-3/4 overflow-hidden text-center relative">
//       <Image
//         src={screen}
//         alt="Car"
//         className="object-contain h-full"
//       />
//       <div className="absolute object-contain inset-0 flex aspect-video items-center justify-center">
//         <div className="bg-red-500 bg-opacity-50 w-full max-h-full h-full p-4 rounded-lg">
//           {/* essa div tem que ficar exatamenre em cima da imagem */}
//         </div>
//       </div>
//     </motion.div>
//   </div>
// </div>
//   )
//   }
