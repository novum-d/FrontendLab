import { Grid } from "@mui/material";

const PageName = ({ name }: { name: string }) => {
  return (
    <Grid item xs={8}>
      This is {name} page.
    </Grid>
  );
};

export default PageName;
