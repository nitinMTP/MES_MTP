import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MainCard from "../../../components/MainCard";
import { fetchUrl } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { openSnackBar } from "../../../store/reducers/siteConfig";

export default function ManageMachines() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    _id: null,
    machine: "",
    name: "",
    location: "",
    lastEdited: "",
  });
  const [errors, setErrors] = useState({
    machine: "",
    name: "",
    location: "",
  });
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchRows = async () => {
    const response = await fetch(fetchUrl + "/machines");
    const data = await response.json();
    setRows(data);
    console.log("Machines : ", data);
  };

  const fetchLocations = async () => {
    const response = await fetch(fetchUrl + "/locations");
    const data = await response.json();
    console.log("Rows : ", data);

    setLocations(data);
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.machine.trim()) {
      newErrors.machine = "Machine Code is required";
      isValid = false;
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNewMachine = () => {
    setFormData({
      _id: null,
      machine: "",
      name: "",
      location: "",
      lastChanged: user._id,
    });
    setErrors({
      machine: "",
      name: "",
      location: "",
    });
    setOpen(true);
  };

  const handleSave = async () => {
    var sendData = {};
    if (validateForm()) {
      if (formData._id) {
        sendData = await fetch(fetchUrl + `/machines/${formData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, lastChanged: user._id }),
        });
      } else {
        sendData = await fetch(fetchUrl + "/machines", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify(formData),
        });
      }
      setOpen(false);
      const response = await sendData.json();
      console.log("resposne  = ", response);

      response.success &&
        dispatch(
          openSnackBar({
            message: "Machine Data saved",
            severity: "success",
          })
        );
    } else {
      console.log("Invalid Form Data");
      console.log(errors);
      response.success &&
        dispatch(
          openSnackBar({
            message: "Error saving Machine Data",
            severity: "error",
          })
        );
    }
    fetchRows();
  };

  const handleEdit = (row) => {
    console.log("Edit Row values :", row);
    setFormData({ ...row, location: row.location._id });
    setOpen(true);
    setChangePassword(false);
  };

  const handleDelete = (row) => {
    setFormData(row);
    setOpenDelete(true);
  };

  const handleDeleteUser = async (id) => {
    const sendData = await fetch(fetchUrl + `/machines/${id}`, {
      method: "DELETE",
    });
    const response = await sendData.json();
    response.success &&
      dispatch(
        openSnackBar({
          message: "Machine Deleted",
          severity: "warning",
        })
      );
    fetchRows();
    setOpenDelete(false);
    setFormData({
      _id: null,
      machine: "",
      name: "",
      location: "",
      lastChanged: "",
    });
  };

  useEffect(() => {
    fetchRows();
    fetchLocations();
  }, []);

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2}>
        <Grid size={12} sx={{ mb: -2.25 }}>
          <Typography variant="h4">Manage Machines</Typography>
        </Grid>
        <Grid size={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewMachine}
            style={{ marginBottom: "1rem" }}
          >
            Add New Machine
          </Button>
        </Grid>
        <Grid size={12}>
          <MainCard>
            <Grid container>
              <Grid size={12}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Machine</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Last Changed</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell>{row.machine}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.location.name}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleEdit(row)}
                              style={{ marginRight: "0.5rem" }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDelete(row)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                          <TableCell>
                            {row.lastChanged && row.lastChanged.name}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      {/* Dialog for Editing or Adding Row */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {formData._id ? "Edit Machine" : "Add New Machine"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Machine"
            fullWidth
            value={formData.machine}
            onChange={(e) =>
              setFormData({ ...formData, machine: e.target.value })
            }
            error={!!errors.machine}
            helperText={errors.machine}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <FormControl fullWidth margin="normal" error={!!errors.location}>
            <InputLabel id="role-label">Location</InputLabel>
            <Select
              labelId="role-label"
              id="lcoation"
              name="Location"
              value={formData.location}
              label="Location"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              error={!!errors.location}
            >
              {locations.map((location) => (
                <MenuItem key={location._id} value={location._id}>
                  {location.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.location}</FormHelperText>
            {/* {errors.role && <div style={{ color: "red" }}>{errors.role}</div>} */}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleSave()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for Deleting Row */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>Do you want to delete {formData.name}?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} autoFocus>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteUser(formData._id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
