import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// project import
import config from "../../config";
import { activeItem } from "../../store/reducers/menu";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to, open }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      {open ? (
        <img
          src={"/mtp-dark-logo.webp"}
          alt="MTP Logo"
          // width="100"
          height={50}
        />
      ) : (
        <img
          src={"/mtp-favicon.png"}
          alt="MTP Icon"
          // width="100"
          height={20}
        />
      )}
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
