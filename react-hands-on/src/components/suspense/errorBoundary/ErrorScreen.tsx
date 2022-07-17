import { FallbackProps } from "react-error-boundary";
import styled from "./style.module.scss";

const ErrorScreen = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className={styled.error}>
      <h3>We are sorry... something went wrong</h3>
      <p>We cannot process your request at this moment.</p>
      <p>ERROR: {error.message}</p>
    </div>
  );
};

export const BreakThings = () => {
  throw new Error("We intentionally broke something");
};

export default ErrorScreen;
