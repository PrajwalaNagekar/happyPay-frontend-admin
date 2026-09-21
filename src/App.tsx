import { useRoutes } from "react-router-dom";
import Router from "./routes/router";

function App() {
  console.log("Router value:", Router);
  console.log("Router is array:", Array.isArray(Router));

  const routing = useRoutes(Router);

  return routing;
}

export default App;