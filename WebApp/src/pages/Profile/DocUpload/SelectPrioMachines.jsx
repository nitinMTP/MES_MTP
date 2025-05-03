import React, { useEffect, useState } from "react";
import MainCard from "../../../components/MainCard";
import {
  Autocomplete,
  Grid,
  styled,
  TextField,
  Typography,
  darken,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { machines } from "../../Dashboard/Dashboard_Settings";
import { fetchUrl } from "../../../config";
import moment from "moment";
import { openSnackBar } from "../../../store/reducers/siteConfig";
import { useDispatch } from "react-redux";

export default function SelectPrioMachines() {
  const dispatch = useDispatch();

  const [editMachines, setEditMachines] = useState(false);
  const [prioTemp, setPrioTemp] = useState([]);
  const [prioMachines, setPrioMachines] = useState([]);
  const [lastChanged, setLastChanged] = useState("");
  const [inputValue, setInputValue] = useState("");

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
          setPrioMachines(JSON.parse(JSON.stringify(response.prioMachines)));
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
        // console.log("Fetch Set Prio Machine Response : ", response);
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

  useEffect(() => {
    fetchPrioMachines();
  }, []);

  return (
    <MainCard>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={10}>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="h5"
            >
              Priority Machines
            </Typography>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="h6"
            >
              Last Changed {lastChanged}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disabled={!editMachines}
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
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="tags-outlined"
            options={machines}
            getOptionLabel={(option) => option.name}
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
        <Grid item xs={12} md={6}>
          <Stack direction={"row"} spacing={2}>
            {!editMachines ? (
              <Button
                onClick={() => {
                  // fetchPrioMachines();
                  setEditMachines(true);
                  setPrioTemp(prioMachines);
                }}
                variant="contained"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setEditMachines(false);
                    setPrioMachines(prioTemp);
                  }}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    setEditMachines(false);
                    SetNewPrioMachines();
                    setTimeout(() => {
                      // console.log("Timeout");
                      fetchPrioMachines();
                      fetchPrioMachinesData();
                    }, 1000);
                  }}
                  variant="contained"
                >
                  Save
                </Button>
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
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
