import moment from "moment/moment";
import Chart from "react-apexcharts";
import MainCard from "../../../components/MainCard";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MachineStatusInfo from "./MachineStatusInfo";

export default function StatusGraph({
  type,
  priority,
  series,
  loading,
  from,
  to,
  machinename,
}) {
  // const { from, to } = useSelector((state) => state.machineInfo);

  const { mode } = useSelector((state) => state.siteConfig);
  // const { language } = useSelector((state) => state.siteConfig);

  const options = {
    chart: {
      type: "rangeBar",
      background: "transparent",
      toolbar: { show: false },
      zoom: {
        enabled: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
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
      show: true,
      type: "numeric",
      min: from,
      max: to,
      // tickAmount: 24,
      stepSize: 3600000,
      tickPlacement: "on",
      // range: 25200000,

      labels: {
        show: true,
        datetimeUTC: true,
        tickAmount: 300000,
        formatter: function (value, timestamp, opts) {
          // console.log("opts ", opts);
          // console.log("timestamp :", timestamp);
          // const minute = moment(value).minutes();
          // console.log("Minute : ", minute);

          // return moment(roundTo5Minutes(value)).format("HH:mm");
          return moment(value).format("HH:mm");
        },
        // format: "HH:mm dd-MM",
        // datetimeFormatter: {
        //   year: "yyyy",
        //   month: "MMM 'yy",
        //   day: "dd MMM",
        //   hour: "HH:mm",
        // },
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
      custom: (w) => {
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
      show: false,
      position: "bottom",
    },
    theme: {
      mode: mode === "dark" ? "dark" : "light",
    },
  };

  return (
    <MainCard
      sx={{
        paddingTop: 1.5,
        paddingBottom: 1.5,
        // maxHeight: 400,
        height: "100%",
        width: "100%",
      }}
      content={false}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
        // height={400 - 4}
      >
        <Grid container>
          {!loading ? (
            <Grid item xs={12}>
              <Stack spacing={0}>
                <MachineStatusInfo
                  machine={machinename}
                  priority={priority}
                  type={type}
                />
                {type !== "special" && (
                  <Chart
                    options={options}
                    series={series}
                    type="rangeBar"
                    height={150}
                  />
                )}
              </Stack>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{ width: "100%", height: 150 }}
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
                      <CircularProgress size={120} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
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
