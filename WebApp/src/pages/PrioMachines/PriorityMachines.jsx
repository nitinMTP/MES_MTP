import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  styled,
  lighten,
  darken,
} from "@mui/material";
import { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { machines } from "../Dashboard/Dashboard_Settings";
import { fetchUrl } from "../../config";
import moment from "moment";
import PrioMachine from "./PrioMachine/PrioMachine";
import { useDispatch, useSelector } from "react-redux";
import { openSnackBar } from "../../store/reducers/siteConfig";

export default function PriorityMachines() {
  const dispatch = useDispatch();

  const [editMachines, setEditMachines] = useState(false);
  const [prioMachines, setPrioMachines] = useState([]);
  const [lastChanged, setLastChanged] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [prioData, setPrioData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusRange, setStatusRange] = useState([0, 0]);

  const { loggedIn, accessLevel } = useSelector((state) => state.user);

  function fetchPrioMachines() {
    const body = {};

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    fetch(fetchUrl + "/getPrioMachines", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log("Fetch Get Prio Machines Response : ", response);
        if (response.success) {
          console.log(response);
          setPrioMachines(response.prioMachines);
          setLastChanged(
            moment(response.lastChanged).format("DD.MM.YYYY HH:mm:ss")
          );
        } else {
          // console.log(response);
          setPrioMachines([]);
          setLastChanged("");
        }
        // console.log("Series : ", response.status);
      })
      .catch((_error) => {
        // console.log("Error Querying", error);
        setPrioMachines([]);
      });
  }

  function SetNewPrioMachines() {
    const body = {
      prioMachines: prioMachines,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    fetch(fetchUrl + "/setPrioMachines", options)
      .then((response) => response.json())
      .then((response) => {
        console.log("Fetch Set Prio Machine Response : ", response);
        if (response.success) {
          // console.log(response);
          dispatch(
            openSnackBar({
              message: "Prio Machines changed Successfully",
              severity: "success",
            })
          );
        } else {
          // console.log(response);
          dispatch(
            openSnackBar({
              message: "Prio Machines cannot be changed",
              severity: "error",
            })
          );
        }
        // console.log("Series : ", response.status);
      })
      .catch((_error) => {
        // console.log("Error Querying", error);
      });
  }

  function fetchPrioMachinesData() {
    setLoading(true);
    // console.log("Fetching Prio Machine Data");
    // console.log("Machines : ", prioMachines);

    const to = moment();
    const from = moment().subtract(1, "day");

    // Range for the Status Graph
    const fromMs = from.startOf("hour").valueOf();
    var toMs = moment();
    toMs = (
      toMs.minute() || toMs.second() || toMs.millisecond()
        ? toMs.add(1, "hour").startOf("hour")
        : toMs.startOf("hour")
    ).valueOf();

    console.log(
      "From and To : ",
      moment(fromMs).toISOString(),
      moment(toMs).toISOString()
    );

    // console.log("From and To ms: ", fromMs, toMs);

    setStatusRange([fromMs, toMs]);

    const body = {
      prioMachines: prioMachines,
      from: fromMs,
      to: to,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    fetch(fetchUrl + "/getPrioMachinesData", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log("Fetch get Prio Machine Data Response : ", response);
        if (response.success) {
          // console.log(response);
          // setPrioMachines(response.prioMachines);
          setPrioData(response.prioMachinesData);
        } else {
          // console.log(response);
          setPrioData([]);
          // setPrioMachines([]);
        }
        // console.log("Series : ", response.status);
        setLoading(false);
      })
      .catch((_error) => {
        // console.log("Error Querying", error);
        // setPrioMachines([]);
        setPrioData([]);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchPrioMachines();
    fetchPrioMachinesData();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      fetchPrioMachines();
      fetchPrioMachinesData();
    }, 300000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Grid container>
            <Grid item xs={3}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4" sx={{ paddingRight: 2 }}>
                  Priority Machines last 24 Hrs
                </Typography>

                {!editMachines ? (
                  <Tooltip title="Edit" placement="right">
                    <IconButton
                      disabled={!(loggedIn && accessLevel <= 3)}
                      onClick={() => {
                        fetchPrioMachines();
                        setEditMachines(true);
                      }}
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title="Cancel" placement="right">
                      <IconButton
                        onClick={() => {
                          setEditMachines(false);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Done" placement="right">
                      <IconButton
                        onClick={() => {
                          setEditMachines(false);
                          SetNewPrioMachines();
                          setTimeout(() => {
                            // console.log("Timeout");
                            fetchPrioMachines();
                            fetchPrioMachinesData();
                          }, 5000);
                        }}
                      >
                        <DoneIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            </Grid>
            {editMachines && (
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  groupBy={(option) => option.room}
                  renderGroup={(params) => (
                    <li key={params.key}>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  )}
                  value={prioMachines}
                  onChange={(event, newValue) => {
                    setPrioMachines(newValue);
                    // console.log("Prio Machines : ", prioMachines);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="tags-outlined"
                  // options={machines.map((e) => {
                  //   return e.name;
                  // })}
                  options={machines}
                  getOptionLabel={(option) => option.name}
                  //   defaultValue={[top100Films[13]]}
                  isOptionEqualToValue={(option, value) => {
                    return option.name === value.name;
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Machines"
                      placeholder="Priority"
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6" sx={{ paddingRight: 2, paddingTop: 1 }}>
                {"Last Changed " + lastChanged}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <>
            {prioData.map((machine, i) => {
              return (
                <PrioMachine
                  key={i}
                  priority={i + 1}
                  machine={machine}
                  statusRange={statusRange}
                  loading={loading}
                />
              );
            })}
          </>
        </Grid>
      </Grid>
    </>
  );
}

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});
