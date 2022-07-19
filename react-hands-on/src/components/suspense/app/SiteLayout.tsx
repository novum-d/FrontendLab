import { ErrorBoundary } from "react-error-boundary";
import ErrorScreen from "../errorBoundary/ErrorScreen";
import styled from "./style.module.scss";

type SiteLayoutProps = {
  children: JSX.Element;
  menu: JSX.Element;
};

const SiteLayout = ({ children, menu }: SiteLayoutProps) => {
  return (
    <div className={styled.siteContainer}>
      <nav className={styled.menu}>{menu}</nav> {/* <menu />でもok */}
      <ErrorBoundary FallbackComponent={ErrorScreen}>
        <div className={styled.content}>{children}</div>
      </ErrorBoundary>
    </div>
  );
};

export default SiteLayout;
