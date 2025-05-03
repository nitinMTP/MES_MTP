import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function MachineStatusInfo({ machine, priority, type }) {
  // Machine Status Logic

  const cardColors = {
    offline: "grey.500",
    idle: "error.main",
    automatic: "primary.main",
  };

  // const Status = useSelector((state) => state.machineData.machineStatus);
  // console.log(Status);

  const Status = useSelector((state) =>
    state.machineData.machineStatus[machine]
      ? state.machineData.machineStatus[machine]
      : { status: 0, timeStamp: null }
  );

  const status = Status.status;
  const timeStamp = Status.timeStamp;

  const [machineStatus, setMachineStatus] = useState("Offline");
  const [cardColor, setCardColor] = useState(cardColors.offline);
  const [duration, setDuration] = useState(timeLapsed(timeStamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(timeLapsed(timeStamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeStamp]);

  useEffect(() => {
    var statusString = "Offline";
    var color = cardColors.offline;
    switch (status) {
      case 0:
        statusString = "Offline";
        color = cardColors.offline;
        break;
      case 1:
        statusString = "Idle";
        color = cardColors.idle;
        break;
      case 2:
        statusString = "Automatic";
        color = cardColors.automatic;
        break;
      default:
        break;
    }
    setMachineStatus(statusString);
    setCardColor(color);
    // setDuration(timeLapsed(timeStamp));
  }, [status]);

  return (
    <Grid
      container
      sx={{ width: { xs: 500, md: 800 } }}
      display="flex"
      justifyContent="left"
      alignItems="center"
      spacing={0}
      padding={0}
      margin={0}
    >
      <Grid item xs={3}>
        <Typography variant="h4" align="left" paddingLeft={2} paddingRight={2}>
          {priority + ". " + machine}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        {type !== "special" && (
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
        )}
      </Grid>
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
