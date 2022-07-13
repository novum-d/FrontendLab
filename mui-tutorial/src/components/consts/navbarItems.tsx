import PeopleIcon from "@mui/icons-material/People";
import Storage from "@mui/icons-material/Storage";
import Source from "@mui/icons-material/Source";
import Public from "@mui/icons-material/Public";
import Functions from "@mui/icons-material/Functions";
import School from "@mui/icons-material/School";

export const navbarItems = [
  {
    id: 0,
    icon: <PeopleIcon />,
    label: "Authentication",
    route: "authentication",
  },
  {
    id: 1,
    icon: <Source />,
    label: "Source",
    route: "source",
  },
  {
    id: 2,
    icon: <Storage />,
    label: "Storage",
    route: "storage",
  },
  {
    id: 3,
    icon: <Public />,
    label: "Hosting",
    route: "hosting",
  },
  {
    id: 4,
    icon: <Functions />,
    label: "Functions",
    route: "functions",
  },
  {
    id: 5,
    icon: <School />,
    label: "Machine Learning",
    route: "machine-learning",
  },
];
