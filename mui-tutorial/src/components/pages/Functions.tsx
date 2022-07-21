import { useLocation } from "react-router-dom";
import PageName from "../PageName";

const Functions = () => {
  const location = useLocation();
  return <PageName name={location.pathname} />;
};

export default Functions;
