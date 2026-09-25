import { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Router from "./routes/router";

function App() {
  console.log("Router value:", Router);
  console.log("Router is array:", Array.isArray(Router));

  const routing = useRoutes(Router);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      document.title = "HappyPay · Admin Portal";
    } else {
      document.title = "HappyPay · Retailer Portal";
    }
  }, [location.pathname]);

  return routing;
}

export default App;