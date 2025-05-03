// material-ui
import { Typography, Box, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  drawerFooterHeight,
  drawerWidth,
  miniDrawerFooterHeight,
  miniDrawerWidth,
} from "../../../../config";

import ContactSupportIcon from "@mui/icons-material/ContactSupport";

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const ContactCardStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  flexDirection: "column",
  width: open ? drawerWidth : miniDrawerWidth,
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: open ? "center" : "center",
  height: open ? drawerFooterHeight : miniDrawerFooterHeight,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.customShadows.z1,
  position: "sticky",
  zIndex: 1300,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const ContactCard = ({ open }) => {
  return (
    <ContactCardStyled open={open}>
      {open ? (
        <>
          <Typography variant="h5">Contact</Typography>
          <Box
            alignItems="center"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h6" color="secondary">
              Nitin Senthil Kumar
            </Typography>
            <Typography variant="h6" color="secondary">
              nitin@microtechpolymers.com
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <ContactSupportIcon />
        </>
      )}
    </ContactCardStyled>
  );
};

export default ContactCard;
