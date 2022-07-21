import React from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { BreakThings } from "../errorBoundary/ErrorScreen";
import SiteLayout from "./SiteLayout";
import styled from "./style.module.scss";

const Main = () => {
  return (
    <SiteLayout menu={Menu()}>
      <>
        <Callout className={styled.callout}>Callout</Callout>
        <h1 className={styled.title}>Contents</h1>
        <p>This is the main part of the example layout</p>
      </>
    </SiteLayout>
  );
};

const Menu = () => {
  return (
    <ErrorBoundary>
      <ul>
        <a href="#">
          <li>Home</li>
        </a>
        <a href="#">
          <li>About</li>
        </a>
        <a href="#">
          <li>Info</li>
        </a>
        <a href="#">
          <li>Contact</li>
        </a>
      </ul>
    </ErrorBoundary>
  );
};

const Callout = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => {
  return (
    <ErrorBoundary>
      <div className={className}>{children}</div>;
    </ErrorBoundary>
  );
};

export default Main;
