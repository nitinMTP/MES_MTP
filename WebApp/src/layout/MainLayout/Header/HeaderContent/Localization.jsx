import { useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project import
import MainCard from "../../../../components/MainCard";
import Transitions from "../../../../components/@extended/Transitions";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../../store/reducers/siteConfig";
import { useCookies } from "react-cookie";

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

const actionSX = {
  mt: "6px",
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",

  transform: "none",
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Localization = () => {
  const [, setCookie] = useCookies([
    "email",
    "machineSort",
    "siteMode",
    "siteLanguage",
  ]);

  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const { mode } = useSelector((state) => state.siteConfig);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleChangeLanguage(lang) {
    dispatch(setLanguage({ language: lang }));
    setCookie("siteLanguage", lang, {
      sameSite: "Lax",
      expires: new Date(Date.now() + 2592000),
    });
  }

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 0.75,
        bgcolor: open
          ? mode === "light"
            ? "grey.200"
            : "grey.600"
          : "transparent",
        borderRadius: 1,
        "&:hover": { bgcolor: mode === "light" ? "grey.100" : "grey.500" },
      }}
    >
      <IconButton
        disableRipple
        // color="secondary"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <LanguageOutlinedIcon />
      </IconButton>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [matchesXs ? -5 : 0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: "100%",
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down("md")]: {
                  maxWidth: 285,
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      "& .MuiListItemButton-root": {
                        py: 0.5,
                        "& .MuiAvatar-root": avatarSX,
                        "& .MuiListItemSecondaryAction-root": {
                          ...actionSX,
                          position: "relative",
                        },
                      },
                    }}
                  >
                    <ListItemButton
                      title="de"
                      onClick={() => handleChangeLanguage("de")}
                    >
                      <ListItemText
                        primary={<Typography variant="h6">Deutsch</Typography>}
                      />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton
                      title="en"
                      onClick={() => handleChangeLanguage("en")}
                    >
                      <ListItemText
                        primary={<Typography variant="h6">English</Typography>}
                      />
                    </ListItemButton>
                    <Divider />
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Localization;
