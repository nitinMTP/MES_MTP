import { Stack } from "@mui/material";
import SimpleBar from "../../../../components/third-party/SimpleBar";
import NavCard from "./ContactCard";

import Navigation from "./Navigation/Navigation";

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = ({ open }) => (
  <>
    {/* <Stack sx={{}}> */}
    <SimpleBar
      sx={{
        "& .simplebar-content": {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Navigation open={open} />
    </SimpleBar>
    {/* </Stack> */}
  </>
);

export default DrawerContent;
