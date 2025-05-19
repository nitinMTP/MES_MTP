import React from "react";
import MainCard from "../../components/MainCard";
import { CircularProgress, Grid, Typography } from "@mui/material";

export default function OEE({ loading }) {
  return (
    <MainCard
      sx={{
        padding: 2,
        // minHeight: 500,
        height: "100%",
      }}
      content={false}
    >
      <Grid
        container
        justifyContent="centre"
        alignItems="centre"
        rowSpacing={2}
      >
        {!loading ? (
          <>
            <Grid size={8}>
              <Typography variant="h5">OEE</Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="h5">OEE</Typography>
            </Grid>
            <Grid size={12}></Grid>
          </>
        ) : (
          <>
            <Grid size={12}></Grid>
            <Grid size={4}>
              <CircularProgress size={200} />
            </Grid>
            <Grid size={4}></Grid>
          </>
        )}
      </Grid>
    </MainCard>
  );
}
