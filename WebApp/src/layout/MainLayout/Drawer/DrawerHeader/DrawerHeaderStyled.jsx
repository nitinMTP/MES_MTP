// material-ui
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",
  paddingLeft: theme.spacing(open ? 3 : 0),
  top: 0,
  backgroundColor: theme.palette.background.paper,
  position: "sticky",
  zIndex: 1500,
}));

export default DrawerHeaderStyled;
