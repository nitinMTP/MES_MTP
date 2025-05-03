import PropTypes from "prop-types";
import { useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// assets
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../../../../../components/MainCard";
import Transitions from "../../../../../components/@extended/Transitions";
import { useNavigate } from "react-router";
import { logOut } from "../../../../../store/reducers/authentication";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";
import { useCookies } from "react-cookie";
import { openSnackBar } from "../../../../../store/reducers/siteConfig";

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
}

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.siteConfig.mode);
  const { loggedIn, accessLevel, user } = useSelector((state) => state.user);
  // console.log("User : ", user);

  const [cookies, setCookie, removeCookie] = useCookies(["_id"]);

  const theme = useTheme();

  const handleLogout = async () => {
    dispatch(logOut());
    setOpen(false);
    removeCookie("_id", { path: "/" });
    removeCookie("token", { path: "/" });

    dispatch(openSnackBar({ message: "User Logged Out !", severity: "info" }));
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    if (loggedIn) {
      setOpen((prevOpen) => !prevOpen);
    } else {
      navigate("/login");
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = "grey.500";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open
            ? mode === "light"
              ? "grey.200"
              : "grey.700"
            : "transparent",
          borderRadius: 2,
          "&:hover": { bgcolor: mode === "light" ? "grey.100" : "grey.700" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <AccountCircleIcon />
          <Typography variant="subtitle1">
            {loggedIn ? user.name : "Login"}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
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
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                  borderRadius: 5,
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard
                    elevation={0}
                    border={false}
                    content={false}
                    sx={{ borderRadius: 5 }}
                  >
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid size={{ sx: 11 }}>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            {/* <Avatar
                              alt="profile user"
                              src={avatar1}
                              sx={{ width: 32, height: 32 }}
                            /> */}
                            <AccountCircleIcon />

                            <Stack>
                              <Typography variant="h6">
                                {loggedIn ? user.name : "Error"}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {loggedIn ? user.email : "Error"}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 1 }}>
                          <IconButton
                            size="large"
                            color="secondary"
                            onClick={handleLogout}
                          >
                            <LogoutOutlinedIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        {accessLevel <= 2 && (
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                              variant="fullWidth"
                              value={value}
                              onChange={handleChange}
                              aria-label="profile tabs"
                            >
                              <Tab
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textTransform: "capitalize",
                                }}
                                icon={
                                  <PersonOutlineOutlinedIcon
                                    style={{
                                      marginBottom: 0,
                                      marginRight: "10px",
                                    }}
                                  />
                                }
                                label="Profile"
                                {...a11yProps(0)}
                              />

                              <Tab
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textTransform: "capitalize",
                                }}
                                icon={
                                  <SettingsOutlinedIcon
                                    style={{
                                      marginBottom: 0,
                                      marginRight: "10px",
                                    }}
                                  />
                                }
                                label="Setting"
                                {...a11yProps(1)}
                              />
                            </Tabs>
                          </Box>
                        )}
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab handleLogout={handleLogout} />
                        </TabPanel>
                        {accessLevel <= 2 && (
                          <TabPanel
                            value={value}
                            index={1}
                            dir={theme.direction}
                          >
                            <SettingTab />
                          </TabPanel>
                        )}
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
