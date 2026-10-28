import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router";
import { useIsFetching } from "@tanstack/react-query";

export default function ProgressBar() {
  const navigation = useNavigation();
  const isFetching = useIsFetching() > 0;

  const loading = isFetching || navigation.state !== "idle";

  const [progress, setProgress] = useState(0);
  const wasLoading = useRef(false);

  useEffect(() => {
    if (loading) {
      wasLoading.current = true;

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;

          if (prev < 50) return prev + 10;
          if (prev < 75) return prev + 5;

          return prev + 2;
        });
      }, 300);

      return () => clearInterval(interval);
    }

    // loading just finished
    if (wasLoading.current) {
      wasLoading.current = false;

      setProgress(100);

      const timeout = setTimeout(() => {
        setProgress(0);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (progress === 0) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[9999] h-1 w-full">
      <div
        className="h-full bg-own transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}