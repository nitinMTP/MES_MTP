import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  MenuItem,
  Button,
  Select,
  Box,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Autocomplete,
  Container,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/en-in";
moment.locale("en-in"); // Set to Indian English

const shifts = ["Morning", "Evening", "Night"];
const employees = ["EMP001", "EMP002", "EMP003"];
const productionOrders = ["PO1001", "PO1002"];
const machines = ["Machine A", "Machine B"];
const downtimeReasons = [
  "Maintenance",
  "Breakdown",
  "Tool Change",
  "Power Outage",
];

export default function ProductionReportCard() {
  const [formData, setFormData] = useState({
    date: null,
    shift: "",
    employeeId: "",
    productionOrder: "",
    machine: "",
  });

  const [downtimes, setDowntimes] = useState([
    { date: null, from: null, to: null, reason: "" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDowntimeChange = (index, field, value) => {
    const updated = [...downtimes];
    updated[index][field] = value;
    setDowntimes(updated);
  };

  const addDowntimeRow = () => {
    setDowntimes([
      ...downtimes,
      { date: null, from: null, to: null, reason: "" },
    ]);
  };

  const removeDowntimeRow = (index) => {
    setDowntimes(downtimes.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "date",
      "shift",
      "employeeId",
      "productionOrder",
      "machine",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    downtimes.forEach((dt, i) => {
      if (!dt.date || !dt.from || !dt.to || !dt.reason) {
        newErrors[`downtime-${i}`] = "Complete all downtime fields";
      }
    });

    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setError("Please fix the highlighted fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    const payload = {
      ...formData,
      downtimes: downtimes.map((dt) => ({
        date: dt.date ? moment(dt.date).format("YYYY-MM-DD") : "",
        from: dt.from ? moment(dt.from).format("HH:mm") : "",
        to: dt.to ? moment(dt.to).format("HH:mm") : "",
        reason: dt.reason,
      })),
    };

    try {
      const response = await fetch("http://localhost:8000/production-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Server error");

      setSuccess("Report submitted successfully!");
      setFormData({
        date: null,
        shift: "",
        employeeId: "",
        productionOrder: "",
        machine: "",
      });
      setDowntimes([{ date: null, from: null, to: null, reason: "" }]);
      setFieldErrors({});
    } catch (err) {
      setError("Submission failed: " + err.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale="en-in">
      <Card sx={{ width: "100%", height: "100%", margin: "auto" }}>
        <CardHeader title="Production Report Form" />
        <CardContent>
          <Grid container spacing={2}>
            {error && (
              <Grid size={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            {success && (
              <Grid size={12}>
                <Alert severity="success">{success}</Alert>
              </Grid>
            )}

            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                value={formData.date}
                onChange={(val) => {
                  handleChange("date", val);
                }}
                slotProps={{ textField: { fullWidth: true } }}
                format="DD/MM/YYYY"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Autocomplete
                fullWidth
                options={shifts}
                value={formData.shift}
                onChange={(event, newValue) => handleChange("shift", newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Shift"
                    error={!!fieldErrors.shift}
                    helperText={fieldErrors.shift}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Autocomplete
                fullWidth
                options={employees}
                value={formData.employeeId}
                onChange={(event, newValue) =>
                  handleChange("employeeId", newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Employee ID"
                    error={!!fieldErrors.employeeId}
                    helperText={fieldErrors.employeeId}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Autocomplete
                fullWidth
                options={productionOrders}
                value={formData.productionOrder}
                onChange={(event, newValue) =>
                  handleChange("productionOrder", newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Production Order"
                    error={!!fieldErrors.productionOrder}
                    helperText={fieldErrors.productionOrder}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Autocomplete
                fullWidth
                options={machines}
                value={formData.machine}
                onChange={(event, newValue) =>
                  handleChange("machine", newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Machine"
                    error={!!fieldErrors.machine}
                    helperText={fieldErrors.machine}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">Downtimes</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>From Time</TableCell>
                      <TableCell>To Time</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {downtimes.map((row, index) => (
                      <React.Fragment key={index}>
                        <TableRow>
                          <TableCell>
                            <DatePicker
                              value={row.date}
                              onChange={(val) =>
                                handleDowntimeChange(index, "date", val)
                              }
                              slotProps={{ textField: { fullWidth: true } }}
                              format="DD/MM/YYYY"
                            />
                          </TableCell>
                          <TableCell>
                            <TimePicker
                              value={row.from}
                              onChange={(val) =>
                                handleDowntimeChange(index, "from", val)
                              }
                              slotProps={{ textField: { fullWidth: true } }}
                              format="hh:mm A"
                            />
                          </TableCell>
                          <TableCell>
                            <TimePicker
                              value={row.to}
                              onChange={(val) =>
                                handleDowntimeChange(index, "to", val)
                              }
                              slotProps={{ textField: { fullWidth: true } }}
                              format="hh:mm A"
                            />
                          </TableCell>
                          <TableCell>
                            <FormControl fullWidth>
                              <Autocomplete
                                fullWidth
                                options={downtimeReasons}
                                value={row.reason}
                                onChange={(event, newValue) =>
                                  handleDowntimeChange(
                                    index,
                                    "reason",
                                    newValue
                                  )
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="Shift"
                                    error={!!fieldErrors.shift}
                                    helperText={fieldErrors.shift}
                                  />
                                )}
                              />
                            </FormControl>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() => removeDowntimeRow(index)}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        {fieldErrors[`downtime-${index}`] && (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <Typography variant="caption" color="error">
                                {fieldErrors[`downtime-${index}`]}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={addDowntimeRow}
                sx={{ mt: 2 }}
              >
                Add Downtime
              </Button>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  if (validateForm()) {
                    setShowDialog(true);
                  }
                  setShowDialog(true);
                }}
              >
                Submit Report
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        {/* Confirmation Dialog */}
        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Confirm Report Submission</DialogTitle>
          <DialogContent dividers>
            <Typography>
              <strong>Date:</strong>{" "}
              {formData.date ? moment(formData.date).format("DD-MM-YYYY") : "—"}
            </Typography>
            <Typography>
              <strong>Shift:</strong> {formData.shift}
            </Typography>
            <Typography>
              <strong>Employee ID:</strong> {formData.employeeId}
            </Typography>
            <Typography>
              <strong>Production Order:</strong> {formData.productionOrder}
            </Typography>
            <Typography>
              <strong>Machine:</strong> {formData.machine}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Downtimes
            </Typography>
            {downtimes.map((dt, idx) => (
              <Typography key={idx} sx={{ ml: 2 }}>
                • Date:{" "}
                <strong>
                  {dt.date ? moment(dt.date).format("DD-MM-YYYY") : "—"}
                </strong>
                , From:{" "}
                <strong>
                  {dt.from ? moment(dt.from).format("HH:mm") : "—"}
                </strong>
                , To:{" "}
                <strong>{dt.to ? moment(dt.to).format("HH:mm") : "—"}</strong>,
                Reason: <strong>{dt.reason}</strong>
              </Typography>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowDialog(false);
                handleSubmit();
              }}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <ProductionTracker />
    </LocalizationProvider>
  );
}

function ProductionTracker() {
  const [workOrderData, setWorkOrderData] = useState({
    workOrderNumber: "",
    machine: "",
    employee: "",
  });

  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [parts, setParts] = useState(0);
  const [rejections, setRejections] = useState(0);

  useEffect(() => {
    let timer;
    if (started && !stopped) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, stopped]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStart = () => {
    setStarted(true);
    setStartTime(new Date());
  };

  const handleStop = () => {
    setStopped(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Production Work Order
          </Typography>

          {!started && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Work Order Number"
                  name="workOrderNumber"
                  value={workOrderData.workOrderNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Machine"
                  name="machine"
                  value={workOrderData.machine}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Employee"
                  name="employee"
                  value={workOrderData.employee}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleStart}
                >
                  Start Production
                </Button>
              </Grid>
            </Grid>
          )}

          {started && !stopped && (
            <Box mt={3}>
              <Typography variant="h6">Production Running</Typography>
              <Typography>Elapsed Time: {formatTime(elapsedTime)}</Typography>
              <Typography>Parts Produced: {parts}</Typography>
              <Typography>Rejections: {rejections}</Typography>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => setParts((p) => p + 1)}
                  >
                    Add Part
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => setRejections((r) => r + 1)}
                  >
                    Add Rejection
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleStop}
                  >
                    Stop Production
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {stopped && (
            <Box mt={3}>
              <Typography variant="h6">Production Summary</Typography>
              <Typography>
                <strong>Work Order:</strong> {workOrderData.workOrderNumber}
              </Typography>
              <Typography>
                <strong>Machine:</strong> {workOrderData.machine}
              </Typography>
              <Typography>
                <strong>Employee:</strong> {workOrderData.employee}
              </Typography>
              <Typography>
                <strong>Total Time:</strong> {formatTime(elapsedTime)}
              </Typography>
              <Typography>
                <strong>Parts Produced:</strong> {parts}
              </Typography>
              <Typography>
                <strong>Rejections:</strong> {rejections}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
