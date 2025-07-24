import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const CommonLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default CommonLayout;
