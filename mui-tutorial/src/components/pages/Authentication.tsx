import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import CommonButton from "../common/CommonButton/CommonButton";

const Authentication = () => {
  const location = useLocation();

  // const buttonStyles = {
  //   fontSize: 20,
  //   fontWeight: 700,
  //   backgroundColor: "red",
  //   "&:hover": {
  //     backgroundColor: "yellow",
  //   },
  // };
  return (
    <Grid item xs={8}>
      <>
        <div>This is {location.pathname} page.</div>
        <CommonButton variant="contained">Text</CommonButton>
        <CommonButton variant="outlined">Text</CommonButton>
      </>
    </Grid>
  );
};

export default Authentication;
