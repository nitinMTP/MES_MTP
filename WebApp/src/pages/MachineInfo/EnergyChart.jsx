import Chart from "react-apexcharts";
import MainCard from "../../components/MainCard";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

function EnergyDataRow({ variable, value }) {
  return (
    <>
      <Grid item xs={6}>
        <Typography variant="h5" textAlign={"center"}>
          {variable}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" textAlign={"center"}>
          {Math.round(value) + " kWh"}
        </Typography>
      </Grid>
    </>
  );
}

export default function EnergyChart({ series, loading, totalEnergyData }) {
  const { mode, language } = useSelector((state) => state.siteConfig);

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 450,
      background: "transparent",
      zoom: {
        autoScaleYaxis: true,
      },
    },
    stroke: {
      curve: "straight",
    },
    annotations: {
      yaxis: [
        // {
        //   y: 30,
        //   borderColor: "#999",
        //   label: {
        //     show: true,
        //     text: "Energy",
        //     style: {
        //       color: "#fff",
        //       background: "#00E396",
        //     },
        //   },
        // },
      ],
      xaxis: [
        // {
        //   borderColor: "#999",
        //   yAxisIndex: 0,
        //   label: {
        //     show: true,
        //     text: "Rally",
        //     style: {
        //       color: "#fff",
        //       background: "#775DD0",
        //     },
        //   },
        // },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      // min: new Date("01 Mar 2012").getTime(),
      //   tickAmount: 8,
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      opposite: false,
      tickAmount: 5,
      decimalsInFloat: 1,
      labels: {
        show: true,
      },
      title: {
        text: "",
        rotate: -90,
        style: {
          color: undefined,
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          cssClass: "apexcharts-yaxis-title",
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm:ss",
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return value + " kWh";
        },
      },
    },
    fill: {
      type: "gradient",
      // gradient: {
      //   shadeIntensity: 1,
      //   opacityFrom: 0.7,
      //   opacityTo: 0.9,
      //   stops: [0, 100],
      // },
    },
    theme: {
      mode: mode === "dark" ? "dark" : "light",
    },
  };

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
        // height={400 - 4}
      >
        <Grid container justifyContent="centre" alignItems="centre" spacing={2}>
          {!loading ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h5">
                  {text.energyData[language]}
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Chart
                  options={options}
                  series={series}
                  type="area"
                  height={350}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid
                  container
                  alignItems={"left"}
                  justifyContent={"left"}
                  spacing={2}
                >
                  {totalEnergyData.map((e) => {
                    // console.log("Energy Data : ", energyData);

                    return (
                      <EnergyDataRow
                        key={e.variable}
                        variable={e.variable}
                        value={e.value}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </>
          ) : (
            <Box
              sx={{ width: "100%", height: 400 }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid
                container
                sx={{ height: "100%" }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item xs={4} sx={{ height: "100%" }}>
                  <Box
                    sx={{ height: "100%", marginTop: 15 }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <CircularProgress size={200} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Box>
    </MainCard>
  );
  //   return <div>EnergyChart</div>;
}

const text = {
  energyData: { en: "Energy Data", de: "Energiedaten" },
};
