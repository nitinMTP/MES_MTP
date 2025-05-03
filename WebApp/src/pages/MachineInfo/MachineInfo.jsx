import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Grid } from "@mui/material";
import { fetchUrl } from "../../config";
import moment from "moment";
import { machines } from "../Dashboard/Dashboard_Settings";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { setFromTo } from "../../store/reducers/machineInfo";
import DowntimeTable from "./DowntimeTable";
import StatusCard from "./StatusCard";

export default function MachineInfo() {
  const { accessLevel } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const params = useParams();
  console.log("Params : ", params);

  const machine = params.machine;
  // const machineBaseInfo =
  //   machines[machines.findIndex((e) => e.name === machine)];
  const machineBaseInfo = {};
  // const energyVariables = machineBaseInfo.energyVariables;
  const energyVariables = [];

  const [series, setSeries] = useState([]);
  // const [partsSeries, setPartsSeries] = useState([]);
  const [downtime, setDowntime] = useState([]);
  const [utilization, setUtilization] = useState([0, 0, 0]);
  const [parts, setParts] = useState(0);
  const [cycleTime, setCycleTime] = useState({});
  const [loading, setLoading] = useState(false);
  const [energyData, setEnergyData] = useState([]);
  const [totalEnergyData, setTotalEnergyData] = useState([]);
  const [range, setRange] = useState("shift");
  const [shift, setShift] = useState(3);
  const [date, setDate] = useState(null);
  const [customFromTo, setCustomFromTo] = useState([dayjs(), dayjs()]);
  const [customFrom, setCustomFrom] = useState(dayjs());
  const [customTo, setCustomTo] = useState(dayjs());
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    if (firstRender) {
      // fetchData(getFromTo(range, date, shift, customFrom, customTo));
      dispatch(setFromTo(getFromTo(range, date, shift, customFrom, customTo)));
    }
  }, [range, date, shift, customFrom, customTo, customFromTo]);

  const handleChangeRange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setRange(newAlignment);
    }
  };

  useEffect(() => {
    const dateAndShift = defaultDateShift();
    // console.log("Date and Shift : ", dateAndShift);
    setShift(dateAndShift.shift);
    setDate(dayjs(dateAndShift.date));
    // fetchData(getFromTo(range, date, shift, customFrom, customTo));
    setFirstRender(true);
    // console.log("First Render");
  }, []);

  return (
    <>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        sx={{ minHeight: "100%" }}
      >
        <Grid
          item
          size={2}
          sx={{ backgroundColor: "#333", height: "100%", borderRadius: 4 }}
        >
          <StatusCard />
        </Grid>
        <Grid size={10} paddingBottom={2}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            sx={{ height: "100%" }}
          >
            <Grid
              size={6}
              sx={{ backgroundColor: "#333", height: "50%", borderRadius: 4 }}
            >
              OEE
            </Grid>
            <Grid
              size={6}
              sx={{ backgroundColor: "#333", height: "50%", borderRadius: 4 }}
            >
              <DowntimeTable />
            </Grid>
            <Grid
              size={12}
              sx={{ backgroundColor: "#333", height: "50%", borderRadius: 4 }}
            >
              Additional Data
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

function defaultDateShift() {
  var date = moment();
  // var shift = 1;
  // var previousDate = moment().subtract(1, "day");
  var dateAndShift = { date: moment() };
  // console.log("Hour : ", date.hour());
  //Shift Range
  if (date.hour() >= 22) {
    dateAndShift.shift = 3;
  } else if (date.hour() >= 14) {
    dateAndShift.shift = 2;
  } else if (date.hour() >= 6) {
    dateAndShift.shift = 1;
  } else {
    dateAndShift.shift = 3;
    dateAndShift.date.subtract(1, "day");
  }
  return dateAndShift;
}

function getFromTo(range, date, shift, customFrom, customTo) {
  var Date = moment(date.toISOString());
  console.log("Date ISO String : ", Date.toString());
  Date.set("hour", 0);
  Date.set("minute", 0);
  Date.set("second", 0);
  Date.set("millisecond", 0);
  // console.log(date);

  var from = moment(Date);
  var to = moment(Date);
  var nowTime = moment();

  if (range === "shift") {
    switch (shift) {
      case 1:
        from.set("hour", 6);
        to.set("hour", 14);
        break;
      case 2:
        from.set("hour", 14);
        to.set("hour", 22);
        break;
      case 3:
        from.set("hour", 22);
        to.add(24, "hours");
        to.set("hour", 6);
        break;
    }
    const diffFrom = nowTime.diff(from);
    const diffTo = nowTime.diff(to);
    // console.log("Diff Time : ", diffFrom, diffTo);
    if (diffFrom > 0 && diffTo < 0) {
      return { from: from, to: nowTime };
    }
    return { from: from, to: to };
  } else if (range === "day") {
    from.set("hour", 6);
    to.add(24, "hours");
    to.set("hour", 6);
    const diffFrom = nowTime.diff(from);
    const diffTo = nowTime.diff(to);
    // console.log("Diff Time : ", diffFrom, diffTo);
    if (diffFrom > 0 && diffTo < 0) {
      return { from: from, to: nowTime };
    }
    return { from: from, to: to };
  } else if (range === "custom") {
    var CustomFrom = moment(customFrom.toISOString());
    CustomFrom.set("second", 0);
    CustomFrom.set("millisecond", 0);
    var CustomTo = moment(customTo.toISOString());
    CustomTo.set("second", 0);
    CustomTo.set("millisecond", 0);
    return { from: CustomFrom, to: CustomTo };
  }
}
