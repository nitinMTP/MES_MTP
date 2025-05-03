import moment from "moment/moment";
import Chart from "react-apexcharts";
import MainCard from "../../components/MainCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function StatusGraph({
  series,
  loading,
  parts,
  cycleTime,
  type,
  range,
}) {
  const { from, to } = useSelector((state) => state.machineInfo);

  const { mode, language } = useSelector((state) => state.siteConfig);
  // const { language } = useSelector((state) => state.siteConfig);

  const options = {
    chart: {
      type: "rangeBar",
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "75%",
        rangeBarGroupRows: true,
        // rowHeight: "100%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        var a = moment(val[0]);
        var b = moment(val[1]);
        var diff = b.diff(a, "minutes");
        return diff + (diff > 1 ? " mins" : " min");
      },
    },
    colors: ["#B8C400", "#C40000", "#8C8C8C", "#FF4560", "#775DD0"],
    fill: {
      type: "solid",
    },
    labels: { show: true },
    xaxis: {
      show: false,
      type: "numeric",
      min: from,
      max: to,
      stepSize: range === "custom" ? 21600000 : 3600000,
      tickPlacement: "on",
      // tickPlacement: "on",
      // range: 25200000,
      labels: {
        show: true,
        datetimeUTC: true,
        tickAmount: 300000,
        // datetimeUTC: false,
        formatter:
          range === "custom"
            ? function (value, timestamp, opts) {
                const time = moment(value);
                var timeString;
                console.log("Hour : ", time.hour());
                if (time.hour() === 0) {
                  timeString = time.format("DD-MMMM");
                } else {
                  timeString = time.format("HH:mm");
                }
                return timeString;
              }
            : function (value, timestamp, opts) {
                const timeString = moment(value).format("HH:mm");
                return timeString;
              },
      },
    },
    yaxis: {
      show: false,
      opposite: false,
      labels: {
        show: true,
      },
    },
    tooltip: {
      custom: function (w) {
        // console.log(w);
        // const fromTime = moment(w.y1).format("HH:mm");
        // const toTime = moment(w.y2).format("HH:mm");
        // console.log("from and to : ", fromTime, toTime);
        const color = w.w.globals.colors[w.seriesIndex];
        const sameDate =
          moment(w.y1).format("DD-MM-YYYY") ===
          moment(w.y2).format("DD-MM-YYYY");
        const from = sameDate
          ? moment(w.y1).format("HH:mm")
          : moment(w.y1).format("HH:mm DD-MM-YYYY");
        const to = sameDate
          ? moment(w.y2).format("HH:mm")
          : moment(w.y2).format("HH:mm DD-MM-YYYY");
        return (
          '<div style="padding:10px;">' +
          '<div style="color:' +
          color +
          '">' +
          w.w.globals.seriesNames[w.seriesIndex] +
          "</div><div>" +
          from +
          " - " +
          to +
          "</div></div>"
        );
      },
    },
    legend: {
      position: "bottom",
    },
    theme: {
      mode: mode === "dark" ? "dark" : "light",
    },
  };

  return (
    <MainCard
      sx={{
        padding: 2,
        // maxHeight: 400,
        height: "100%",
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
        <Grid container spacing={2}>
          {!loading ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h5">{text.runstaus[language]}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Chart
                  options={options}
                  series={series}
                  type="rangeBar"
                  height={250}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems={"left"}
                  justifyContent={"left"}
                  spacing={2}
                >
                  <Grid item xs={6} lg={3}>
                    <Typography variant="h5" textAlign={"center"}>
                      {type === "carpet"
                        ? text.lengthProduced[language]
                        : text.prodCycle[language]}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <Typography variant="h5" textAlign={"center"}>
                      {parts + (type === "carpet" && " m")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <Typography variant="h5" textAlign={"center"}>
                      {type === "carpet"
                        ? text.avgSpeed[language]
                        : text.avgCycleTime[language]}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <Typography variant="h5" textAlign={"center"}>
                      {type === "carpet" &&
                        (cycleTime.avg
                          ? ((1 * 60) / cycleTime.avg).toFixed(2)
                          : "0") + " m/min"}
                      {type !== "carpet" &&
                        (cycleTime.avg ? cycleTime.avg.toFixed(2) : "0") + " s"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <Typography variant="h5" textAlign={"center"}>
                      {type === "carpet"
                        ? text.avgSpeed_withDowntime[language]
                        : text.avgCycleTime_withDowntime[language]}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <Typography variant="h5" textAlign={"center"}>
                      {type === "carpet" &&
                        (cycleTime.avg_t
                          ? ((1 * 60) / cycleTime.avg_t).toFixed(2)
                          : "0") + " m/min"}
                      {type !== "carpet" &&
                        (cycleTime.avg_t ? cycleTime.avg_t.toFixed(2) : "0") +
                          " s"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <Box
              sx={{ width: "100%", height: 350 }}
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
                    sx={{ height: "100%", marginTop: 10 }}
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
}

const text = {
  runstaus: { en: "Run Status", de: "Lauf Status" },
  active: { en: "Active", de: "Aktiv" },
  idle: { en: "Idle", de: "Leerlauf" },
  offline: { en: "Offline", de: "Offline" },
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

// const options = {
//   chart: {
//     height: 350,
//     type: "line",
//   },
//   stroke: {
//     width: [0, 4],
//   },
//   title: {
//     text: "Traffic Sources",
//   },
//   dataLabels: {
//     enabled: true,
//     // enabledOnSeries: [1],
//   },
//   labels: [
//     "01 Jan 2001",
//     "02 Jan 2001",
//     "03 Jan 2001",
//     "04 Jan 2001",
//     "05 Jan 2001",
//     "06 Jan 2001",
//     "07 Jan 2001",
//     "08 Jan 2001",
//     "09 Jan 2001",
//     "10 Jan 2001",
//     "11 Jan 2001",
//     "12 Jan 2001",
//   ],
//   xaxis: {
//     type: "datetime",
//   },
//   yaxis: [
//     {
//       title: {
//         text: "Website Blog",
//       },
//     },
//     {
//       opposite: true,
//       title: {
//         text: "Social Media",
//       },
//     },
//   ],
// };

// const varSeries = [
//   {
//     name: "Website Blog",
//     type: "column",
//     data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
//   },
//   {
//     name: "Social Media",
//     type: "line",
//     data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
//   },
// ];
