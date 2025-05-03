import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Card,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { types } from "./Dashboard_Settings";

export default function MachineCard({ machineInfo, showType }) {
  const { machine, name, _id } = machineInfo;

  const location = machineInfo.location.name;

  const navigate = useNavigate();
  const { mode, language } = useSelector((state) => state.siteConfig);

  // const machineType = types.find((e) => e.type === type)[language];

  const cardColors = {
    offline: { light: "grey.500", dark: "grey.500" },
    idle: { light: "error.main", dark: "error.dark" },
    automatic: { light: "primary.main", dark: "primary.dark" },
  };

  const Status = useSelector((state) =>
    state.machineData.machineStatus[name]
      ? state.machineData.machineStatus[name]
      : { status: 0, timeStamp: null }
  );

  const status = Status.status;
  const timeStamp = Status.timeStamp;

  const [machineStatus, setMachineStatus] = useState("Offline");
  const [cardColor, setCardColor] = useState(cardColors.offline[mode]);
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
        color = cardColors.offline[mode];
        break;
      case 1:
        statusString = "Idle";
        color = cardColors.idle[mode];
        break;
      case 2:
        statusString = "Automatic";
        color = cardColors.automatic[mode];
        break;
      default:
        statusString = "Offline";
        color = cardColors.offline[mode];
        break;
    }
    setMachineStatus(statusString);
    setCardColor(color);
    // setDuration(timeLapsed(timeStamp));
  }, [status, mode]);

  const info = [
    { name: "Name", information: name },
    { name: "Status", information: "Active" },
    { name: "Work Order", information: "Pushbutton" },
    { name: "Req Qty", information: "450" },
    { name: "OK", information: "240" },
    { name: "NOK", information: "2" },
    { name: "Cycle Time", information: "20 s" },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: 3,
        borderColor: cardColor,
        "&:hover": {
          borderColor: cardColor,
          boxShadow: 3,
          cursor: "pointer",
        },
      }}
      onClick={() => {
        console.log("Clicked on machine card: " + name);
        navigate("/machine-info/" + _id, {
          state: { machine: name, location: location },
        });
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: cardColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="h4"
            color="text.primary"
            component="div"
            align="center"
          >
            {machine.toString()}
          </Typography>
        </Box>

        <TwoColumnVerticalList items={info} />
      </Stack>
    </Card>
  );
}

MachineCard.propTypes = {
  machine: PropTypes.string,
  status: PropTypes.string,
  statusTime: PropTypes.string,
};

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

const text = {};

// const TwoColumnVerticalList = ({ items }) => {
//   const half = Math.ceil(items.length / 2);
//   const firstColumn = items.slice(0, half);
//   const secondColumn = items.slice(half);

//   const renderList = (columnItems, offset = 0) => (
//     <List dense disablePadding>
//       {columnItems.map((item, index) => (
//         <ListItem
//           key={index + offset}
//           dense
//           disableGutters
//           sx={{ px: 1, py: 0.5, minHeight: "unset" }}
//         >
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems={"center"}
//             width="100%"
//           >
//             <Typography variant="body2" noWrap>
//               {item.primary}
//             </Typography>
//             <Typography variant="caption" color="text.secondary" noWrap>
//               {item.secondary}
//             </Typography>
//           </Box>
//         </ListItem>
//       ))}
//     </List>
//   );

//   return (
//     <Grid container spacing={2} sx={{ mt: 1 }}>
//       <Grid item xs={6} sx={{ pr: 1 }}>
//         {renderList(firstColumn)}
//       </Grid>
//       <Grid item xs={6} sx={{ pl: 1 }}>
//         {renderList(secondColumn, half)}
//       </Grid>
//     </Grid>
//   );
// };

const TwoColumnVerticalList = ({ items }) => {
  const renderList = (columnItems, offset = 0) => (
    <List dense disablePadding>
      {columnItems.map((item, index) => (
        <ListItem
          key={index + offset}
          dense
          disableGutters
          sx={{ px: 1, py: 0.5, minHeight: "unset" }}
        >
          <Grid
            container
            spacing={0}
            sx={{ width: "100%" }}
            alignItems="center"
            justifyContent="left"
          >
            <Grid size={6} justifyContent={"left"}>
              <Typography variant="body2" noWrap sx={{ flex: 1, pr: 1 }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid size={6} justifyContent={"right"}>
              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
                align="right"
                sx={{ flex: 1, pl: 1 }}
              >
                {item.information}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{ width: "100%" }}
        alignItems="top"
        justifyContent="righ"
      >
        <Grid size={12}>{renderList(items)}</Grid>
      </Grid>
    </>
  );
};
