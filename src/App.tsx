import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

const App = () => {
  const element = useRoutes(routes);
  return <div>{element}</div>;
};

export default App;
