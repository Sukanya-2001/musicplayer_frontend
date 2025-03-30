import { useEffect, useState } from "react";

export const getRedirectUrl = (redirect?: string): string => {
  // Get the dashboard route or fallback to login
  const userDashboard = "/dashboard";

  if (redirect) {
    return redirect;
  }

  return userDashboard;
};

export const getWindowSize = () => {
  const width = window.innerWidth;
  if (width < 364) return "xxs";
  if (width < 565) return "xs";
  if (width < 600) return "sm";
  if (width < 728) return "smm";
  if (width < 1200) return "md";
  return "lg";
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
