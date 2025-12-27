//Helper hooks for the device width measure
// we can also use 
/* const base = typeof window !== "undefined"
   ? window.innerWidth / 1920
   : 1;*/
import { useEffect, useState } from "react";

const DESIGN_WIDTH = 1920;

export default function useScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setScale(window.innerWidth / DESIGN_WIDTH);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
}

