import { Box, IconButton, useMediaQuery } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../../../store/reducers/siteConfig";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Profile from "./Profile/Profile";
import { useCookies } from "react-cookie";
import MachineStatusInfo from "./MachineStatusInfo";
import { useParams } from "react-router";
import Notification from "./Notification";
import { AnimatePresence, motion } from "framer-motion";

export default function HeaderContent() {
  const params = useParams();
  const machineId = params.machineId;
  console.log("Machine : ", machineId);

  const dispatch = useDispatch();
  const siteConfig = useSelector((state) => state.siteConfig);
  const mode = siteConfig.mode;

  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [, setCookie] = useCookies(["_id", "machineSort", "siteMode"]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          ml: { xs: 0, md: 1 },
          display: "flex",
        }}
        justifyContent="left"
        alignItems="center"
      >
        {/* <Search /> */}
        {machineId && <MachineStatusInfo machineId={machineId} />}
      </Box>

      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />}
      {/* <Notification /> */}

      <IconButton
        sx={{ borderRadius: 5 }}
        onClick={() => {
          dispatch(setMode({ mode: mode === "light" ? "dark" : "light" }));
          setCookie("siteMode", mode === "light" ? "dark" : "light");
        }}
      >
        {mode === "light" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      <Profile />
    </>
  );
}
