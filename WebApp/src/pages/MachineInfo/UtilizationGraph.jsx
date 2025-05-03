import MainCard from "../../components/MainCard";
import Chart from "react-apexcharts";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function UtilizationGraph({
  type,
  series,
  loading,
  parts,
  cycleTime,
}) {
  const { mode, language } = useSelector((state) => state.siteConfig);
  console.log("Series : ", series);
  const options = {
    chart: {
      // height: 200,
      width: 380,
      type: "donut",
      background: "transparent",
    },
    labels: ["Active", "Idle", "Offline"],
    colors: ["#B8C400", "#C40000", "#8C8C8C"],
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      color: "#000",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontFamily: "Rubik",
              color: "#dfsda",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return Math.floor(val) + " min";
              },
            },
            total: {
              show: true,
              label: "Utilization",
              color: mode === "light" ? "#000" : "#fff",
              formatter: function (w) {
                // console.log("w.globals : ", w.globals);
                return Math.floor(w.globals.seriesPercent[0]) + " %";
              },
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return Math.floor(val) + " m";
        },
        title: {
          formatter: function (seriesName) {
            return seriesName;
          },
        },
      },
    },
    legend: {
      show: false,
    },
    theme: {
      mode: mode,
      palette: "palette1",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: "dark",
        shadeIntensity: 0.65,
      },
    },
  };

  return (
    <>
      <MainCard
        content={false}
        sx={{
          padding: 2,
          height: "100%",
          // maxHeight: 600,
        }}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="flex-start"
          justifyContent="flex-start"
          height={"100%"}
        >
          <Grid container alignItems="center" justifyContent="center">
            {!loading ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="h5">Utilization</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack>
                    {!loading ? (
                      <Chart options={options} series={series} type="donut" />
                    ) : (
                      <CircularProgress size={200} />
                    )}
                    {/* <Grid
                      container
                      alignItems={"left"}
                      justifyContent={"left"}
                      spacing={2}
                    >
                      <Grid item xs={6}>
                        <Typography variant="h5" textAlign={"center"}>
                          {type === "carpet"
                            ? text.lengthProduced[language]
                            : text.prodCycle[language]}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h5" textAlign={"center"}>
                          {parts + (type === "carpet" && " m")}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h5" textAlign={"center"}>
                          {type === "carpet"
                            ? text.avgSpeed[language]
                            : text.avgCycleTime[language]}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h5" textAlign={"center"}>
                          {type === "carpet" &&
                            (cycleTime.avg
                              ? ((1 * 60) / cycleTime.avg).toFixed(2)
                              : "0") + " m/min"}
                          {type !== "carpet" &&
                            (cycleTime.avg ? cycleTime.avg.toFixed(2) : "0") +
                              " s"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h5" textAlign={"center"}>
                          {type === "carpet"
                            ? text.avgSpeed_withDowntime[language]
                            : text.avgCycleTime_withDowntime[language]}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h5" textAlign={"center"}>
                          {type === "carpet" &&
                            (cycleTime.avg_t
                              ? ((1 * 60) / cycleTime.avg_t).toFixed(2)
                              : "0") + " m/min"}
                          {type !== "carpet" &&
                            (cycleTime.avg_t
                              ? cycleTime.avg_t.toFixed(2)
                              : "0") + " s"}
                        </Typography>
                      </Grid>
                    </Grid> */}
                  </Stack>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <CircularProgress size={200} />
                </Grid>
                <Grid item xs={4}></Grid>
              </>
            )}
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}

const text = {
  lengthProduced: { en: "Length Produced", de: "Länge herstellt" },
  prodCycle: { en: "Production Cycles", de: "Produktionszyklus" },
  avgSpeed: { en: "Avg Speed", de: "Durschnitt Geschwindigkeit" },
  avgCycleTime: { en: "Avg Cycle Time", de: "Durschnitt Taktzeit" },
  avgSpeed_withDowntime: {
    en: "Avg Speed (with Downtime)",
    de: "Durschnitt Geschwindigkeit (mit Leerlauf)",
  },
  avgCycleTime_withDowntime: {
    en: "Avg Cycle Time (with Downtime)",
    de: "Durschnitt Taktzeit (mit Leerlauf)",
  },
};
