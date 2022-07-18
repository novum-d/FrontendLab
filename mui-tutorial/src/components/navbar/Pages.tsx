import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";

const Authentication = () => {
  const location = useLocation();
  return <PageName name={location.pathname} />;
};

const Source = () => {
  const location = useLocation();
  return <PageName name={location.pathname} />;
};

const Storage = () => {
  const location = useLocation();
  return <PageName name={location.pathname} />;
};
const Functions = () => {
  const location = useLocation();
  return <PageName name={location.pathname} />;
};

const Hosting = () => {
  const location = useLocation();
  return <PageName name={location.pathname} />;
};

const MachineLearning = () => {
  const location = useLocation();
  return <PageName name={location.pathname} />;
};

const PageName = ({ name }: { name: string }) => {
  return (
    <Grid item xs={8}>
      This is {name} page.
    </Grid>
  );
};

export { Authentication, Source, Storage, Functions, Hosting, MachineLearning };
