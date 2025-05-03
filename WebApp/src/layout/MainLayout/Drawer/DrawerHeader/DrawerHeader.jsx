import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Stack, Chip } from "@mui/material";

// project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import LogoSection from "../../../../components/Logo/LogoSection";

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  return (
    // only available in paid version
    <DrawerHeaderStyled open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <LogoSection open={open} />
        {/* <Chip
          label={process.env.REACT_APP_VERSION}
          size="small"
          sx={{
            height: 16,
            "& .MuiChip-label": { fontSize: "0.625rem", py: 0.25 },
          }}
          component="a"
          href="https://www.microtechpolymers.com/"
          target="_blank"
          clickable
        /> */}
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
