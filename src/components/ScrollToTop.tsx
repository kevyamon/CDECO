import { useEffect } from "react";
import { useInRouterContext, useLocation } from "react-router-dom";

const ScrollToTopInner = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ScrollToTop = () => {
  // Defensive: avoids a blank screen if Router context is temporarily unavailable
  const inRouter = useInRouterContext();
  if (!inRouter) return null;

  return <ScrollToTopInner />;
};

export default ScrollToTop;
