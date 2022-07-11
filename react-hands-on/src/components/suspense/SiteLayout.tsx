type SiteLayoutProps = {
  children: JSX.Element;
  menu: JSX.Element;
};

const SiteLayout = ({ children, menu }: SiteLayoutProps) => {
  return (
    <div className="site-container">
      <div>{menu}</div> {/* <menu />でもok */}
      <div>{children}</div>
    </div>
  );
};

export default SiteLayout;
