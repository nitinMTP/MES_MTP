import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { DatePicker, Select } from "antd";

import moment from "moment";

import { useSelector } from "react-redux";
import dayjs from "dayjs";

import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export default function MachineFilterWidget({
  shift,
  setShift,
  date,
  setDate,
  range,
  handleChangeRange,
  customFromTo,
  setCustomFromTo,
  customFrom,
  setCustomFrom,
  customTo,
  setCustomTo,
}) {
  // const handleChange = (event) => {
  //   setShift(event.target.value);
  // };

  const handleChange = (value) => {
    setShift(value);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDateTime(date);
    console.log("Moment Time : ", moment(date));
  };

  const { language } = useSelector((state) => state.siteConfig);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={2} md={2} lg={6}>
        <Typography variant="h5">{text.title[language]}</Typography>
      </Grid>
      <Grid item xs={4} md={4} lg={2}>
        <ToggleButtonGroup
          color="primary"
          value={range}
          exclusive
          onChange={handleChangeRange}
          aria-label="Platform"
          size="small"
        >
          <ToggleButton value="shift">{text.shift[language]}</ToggleButton>
          <ToggleButton value="day">{text.day[language]}</ToggleButton>
          <ToggleButton value="custom">Custom</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {range === "shift" && (
        <>
          <Grid item xs={3} md={2} lg={2}>
            {/* <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale={"de"}
            >
              <DatePicker
                sx={{ backgroundColor: "background.default" }}
                disableFuture
                displayWeekNumber
                disableHighlightToday={false}
                // label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider> */}
            <DatePicker
              onChange={(date, dateString) => {
                console.log(date, dateString);
                setDate(date);
                // console.log("Moment Time : ", moment(date));
              }}
              picker="day"
              value={date}
              format={"DD-MM-YYYY"}
              // maxDate={dayjs()}
              size={"large"}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3} md={4} lg={2}>
            {/* <Box sx={{ minWidth: 120 }}>
              <FormControl
                fullWidth
                sx={{ backgroundColor: "background.default" }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={shift}
                  // label="Shift"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>{text.earlyShift[language]}</MenuItem>
                  <MenuItem value={2}>{text.lateShift[language]}</MenuItem>
                  <MenuItem value={3}>{text.nightShift[language]}</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
            <Select
              value={shift}
              onChange={handleChange}
              options={[
                { value: 1, label: text.earlyShift[language] },
                { value: 2, label: text.lateShift[language] },
                { value: 3, label: text.nightShift[language] },
              ]}
              size="large"
              style={{ width: "100%" }}
            />
          </Grid>
        </>
      )}
      {range === "day" && (
        <>
          <Grid item xs={6} md={6} lg={4}>
            {/* <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale={"de"}
            >
              <DatePicker
                sx={{ backgroundColor: "background.default" }}
                disableFuture
                disableHighlightToday={false}
                displayWeekNumber
                maxDate={moment()}
                // label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider> */}
            <DatePicker
              onChange={(date, dateString) => {
                console.log(date, dateString);
                setDate(date);
                // console.log("Moment Time : ", moment(date));
              }}
              picker="day"
              value={date}
              format={"DD-MM-YYYY"}
              size={"large"}
              style={{ width: "100%" }}
            />
          </Grid>
        </>
      )}
      {range === "custom" && (
        <>
          {/* <Grid item xs={3} md={3} lg={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="From"
                value={customFrom}
                maxDateTime={moment()}
                onAccept={(newValue) => setCustomFrom(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3} md={3} lg={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="To"
                minDateTime={customFrom}
                maxDateTime={moment()}
                value={customTo}
                onAccept={(newValue) => setCustomTo(newValue)}
                // onChange={(newValue) => setCustomTo(newValue)}
              />
            </LocalizationProvider>
          </Grid> */}
          <Grid item xs={6} md={6} lg={4}>
            <DatePicker.RangePicker
              showTime={{ format: "HH:mm" }}
              format="DD-MM-YYYY HH:mm"
              onChange={(date, dateString) => {
                console.log(date, dateString);
                setCustomFromTo(date);
                setCustomFrom(date[0]);
                setCustomTo(date[1]);
                // console.log("Moment Time : ", moment(date[1]));
              }}
              value={customFromTo}
              size={"large"}
              style={{ width: "100%" }}
              // onOk={onOk}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

const text = {
  title: { en: "Machine Data", de: "Anlage-Daten" },
  shift: { en: "Shift", de: "Shicht" },
  day: { en: "Day", de: "Tag" },
  earlyShift: { en: "Early Shift", de: "Frühshicht" },
  lateShift: { en: "Late Shift", de: "Spächtshicht" },
  nightShift: { en: "Night Shift", de: "Nachtshicht" },
};
