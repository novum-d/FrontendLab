import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Grid container>
      <Navbar />
      <Outlet />
    </Grid>
  );
};

export default App;
