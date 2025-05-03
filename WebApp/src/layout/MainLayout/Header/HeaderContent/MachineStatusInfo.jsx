import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function MachineStatusInfo({ machineId }) {
  // Machine Status Logic

  const cardColors = {
    offline: "grey.500",
    idle: "error.main",
    automatic: "primary.main",
  };

  // const Status = useSelector((state) => state.machineData.machineStatus);
  // console.log(Status);

  const [machine, setMachine] = useState({});

  const { machines } = useSelector((state) => state.machineData);

  console.log("Machine : ", machine);
  console.log("Macines : ", machines);

  useEffect(() => {
    setMachine(machines.find((machine) => machine._id === machineId));
  }, [machines]);

  return (
    <Grid
      container
      sx={{ width: "100%", height: "100%" }}
      display="flex"
      justifyContent="left"
      alignItems="end"
      spacing={0}
      padding={0}
      margin={0}
    >
      <Grid size={{ xs: 6 }}>
        <Typography variant="h4" align="left" paddingLeft={2} paddingRight={2}>
          {machine && machine.machine}
        </Typography>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography variant="h6" align="left" paddingLeft={2} paddingRight={2}>
          {machine && machine.name}
        </Typography>
      </Grid>
      {/* <Grid size={{ xs: 8 }}>
        <Box
          sx={{
            backgroundColor: cardColor,
            borderRadius: 1,
            paddingTop: 0,
            paddingBottom: 0,
            padding: 0.5,
            display: "flex",
            width: "100%",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="subtitle1"
            color="text.primary"
            component="div"
            align="center"
          >
            {duration + " " + machineStatus}
          </Typography>
        </Box>
      </Grid> */}
    </Grid>
  );
}

function timeLapsed(timeStamp) {
  const time = new Date(timeStamp);
  const timeNow = new Date();
  const diffSeconds = Math.floor((timeNow - time) / 1000);
  // console.log(diff / 1000);
  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(diffSeconds / 3600);
  const days = Math.floor(diffSeconds / (24 * 3600));
  if (minutes < 60) {
    return minutes.toString() + " m ";
  }
  if (hours < 24) {
    return hours.toString() + " hr ";
  }
  return days.toString() + " day " + (hours - days * 24).toString() + " hr ";
}
