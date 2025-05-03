import Chart from "react-apexcharts";
import MainCard from "../../components/MainCard";
import { Box, Grid, Typography } from "@mui/material";

export default function PartsGraph({ series }) {
  return (
    <MainCard
      sx={{
        padding: 2,
        minHeight: 400,
        // height: "100%",
      }}
      content={false}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        height={"100%"}
      >
        <Grid container justifyContent="centre" alignItems="centre" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Parts Graph</Typography>
          </Grid>
          <Grid item xs={12}>
            <Chart
              options={options}
              series={series}
              type="scatter"
              height={400}
            />
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
}

const options = {
  chart: {
    height: 350,
    type: "scatter",
    zoom: {
      enabled: true,
      type: "xy",
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      datetimeUTC: false,
    },
    // labels: {
    //   formatter: function (val) {
    //     return parseFloat(val).toFixed(1);
    //   },
    // },
  },
  yaxis: {
    tickAmount: 1,
  },
};

// const series = [{ name: "Parts", data: [{ x: new Date().getTime(), y: 1 }] }];
