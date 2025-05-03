import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUrl } from "../../config";
import MainCard from "../../components/MainCard";

export default function Report() {
  const { language } = useSelector((state) => state.siteConfig);

  const [prioMachines, setPrioMachines] = useState([]);

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
          // console.log(response);
          setPrioMachines(response.prioMachines);
        } else {
          // console.log(response);
          setPrioMachines([]);
        }
        // console.log("Series : ", response.status);
      })
      .catch((_error) => {
        // console.log("Error Querying", error);
        setPrioMachines([]);
      });
  }

  useEffect(() => {
    fetchPrioMachines();
  }, []);

  return (
    <Grid container rowSpacing={2.75} columnSpacing={2.75}>
      <Grid item sm={12} md={6} width={"100%"}>
        <script setup>import imgUrl from './assets/Prio-Anlagen.png'</script>
        <img
          alt="regelkreis-report"
          src={fetchUrl + "/getReportDoc"}
          width={"75%"}
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <MainCard>
          <Grid
            container
            rowSpacing={2.75}
            columnSpacing={2.75}
            justifyContent="center"
            alignItems="center"
            padding={3}
          >
            <Grid item xs={12}>
              <Typography align="center" variant="h1">
                Prio Anlagen
              </Typography>
            </Grid>
          </Grid>
          <List sx={{ width: "100%" }}>
            {prioMachines.map((machine, i) => (
              <>
                <Divider component="li" />
                <ListItem sx={{ padding: 8 }}>
                  <ListItemText id={i}>
                    <Typography variant="h1">{i + 1 + ". "}</Typography>
                  </ListItemText>
                  <ListItemText id={i}>
                    <Typography variant="h1">{machine.name}</Typography>
                  </ListItemText>
                </ListItem>
              </>
            ))}
          </List>
        </MainCard>
      </Grid>
    </Grid>
  );
}
