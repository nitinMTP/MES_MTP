import { Fragment, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import MachineCard from "./MachineCard";
import { useDispatch, useSelector } from "react-redux";
// import { rooms, types } from "./Dashboard_Settings";
import SortWidget from "./SortWidget";
import { setLocation, setMachines } from "../../store/reducers/machineData";
import { fetchUrl } from "../../config";

export default function Dashboard() {
  const { machines, location } = useSelector((state) => state.machineData);

  const dispatch = useDispatch();

  const getMachines = async () => {
    const response = await fetch(fetchUrl + "/machines");
    const data = await response.json();

    dispatch(setMachines({ machines: data }));
    console.log("Machines :", data);
  };

  const getLocations = async () => {
    const response = await fetch(fetchUrl + "/locations");
    const data = await response.json();

    dispatch(setLocation({ location: data }));
    console.log("Locations :", data);
  };

  useEffect(() => {
    getMachines();
    getLocations();
  }, []);

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {/* <Grid size={{ xs: 12, sx: { mb: -1 } }}>
          <Grid container>
            <Grid size={{ xs: 8, md: 10 }}></Grid>
            <Grid size={{ xs: 4, md: 2 }}>
              <SortWidget />
            </Grid>
          </Grid>
        </Grid> */}

        {location.map((loc) => {
          return (
            <Fragment key={loc._id}>
              <Grid size={{ xs: 12 }} sx={{ mb: -1 }}>
                <Typography variant="h5">{loc.name}</Typography>
              </Grid>
              {machines
                .filter((machine) => machine.location._id === loc._id)
                .map((e) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={e.name}>
                    <MachineCard machineInfo={e} />
                  </Grid>
                ))}
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
}

const text = {
  room: {
    en: "Room",
    de: "Raum",
  },
};
