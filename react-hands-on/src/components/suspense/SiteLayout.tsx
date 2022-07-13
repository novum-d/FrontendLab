import styled from "./App.module.scss";

type SiteLayoutProps = {
  children: JSX.Element;
  menu: JSX.Element;
};

const SiteLayout = ({ children, menu }: SiteLayoutProps) => {
  return (
    <div className={styled.siteContainer}>
      <div>{menu}</div> {/* <menu />でもok */}
      <div>{children}</div>
    </div>
  );
};

export default SiteLayout;
