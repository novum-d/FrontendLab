import { useLocation } from "react-router-dom";
import PageName from "../PageName";

const MachineLearning = () => {
  const location = useLocation();
  return <PageName name={location.pathname} />;
};

export default MachineLearning;
