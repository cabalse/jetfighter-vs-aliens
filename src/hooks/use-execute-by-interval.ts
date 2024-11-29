import { useEffect, useRef } from "react";

function useExecuteByInterval(interval: number, callback: () => void) {
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const tick = (currentTime: number) => {
      if (currentTime - lastTimeRef.current >= interval) {
        lastTimeRef.current = currentTime;
        callback();
      }
      requestAnimationFrame(tick);
    };

    const animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId); // Cleanup
  }, [interval, callback]);
}

export default useExecuteByInterval;
