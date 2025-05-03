import { useEffect, useState } from "react";
import MainCard from "../../../components/MainCard";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
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
import { useDispatch, useSelector } from "react-redux";

import { fetchUrl } from "../../../config";

import { openSnackBar } from "../../../store/reducers/siteConfig";

export default function Users() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [users, setUsers] = useState([
    {
      _id: 1,
      name: "xx",
      email: "xx@g.com",
      accessLevel: 4,
      isNew: true,
    },
  ]);

  function getUsers() {
    const options = {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch(fetchUrl + "/getUsers", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log("Fetch Response : ", response);
        if (response.success) {
          // console.log(response);
          setUsers(response.users);
          dispatch(
            openSnackBar({
              message: "All users recieved",
              severity: "success",
            })
          );
        } else {
          setUsers([
            {
              id: 1,
              name: "xx",
              surname: "xx",
              email: "xx@g.com",
              accessLevel: 4,
              isNew: true,
            },
          ]);
          dispatch(
            openSnackBar({
              message: "Error Getting Users",
              severity: "error",
            })
          );
        }
      })
      .catch((error) => {
        // console.log("Error Querying Users", error);
        dispatch(
          openSnackBar({
            message: "Unable to Query Users",
            severity: "error",
          })
        );
      });
  }

  function updateUser(updatedUser) {
    const options = {
      method: "POST",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch(fetchUrl + "/updateUser", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log("Fetch Response : ", response);
        if (response.success) {
          // console.log(response);
          // console.log("Success !!!!");
          dispatch(
            openSnackBar({
              message: "Updated User Details Successfully",
              severity: "success",
            })
          );
        } else {
          // console.log("Updating User Details Unsuccessful !!!");
          dispatch(
            openSnackBar({
              message: "Error Updating User Details",
              severity: "error",
            })
          );
        }
      })
      .catch((error) => {
        console.log("Error Updating Users", error);
        dispatch(
          openSnackBar({
            message: "Unable to Update Users",
            severity: "error",
          })
        );
      });
  }

  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    email: "",
    role: "",
    password: "",
    lastChanged: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchRows = async () => {
    const response = await fetch(fetchUrl + "/users");
    const data = await response.json();
    setRows(data);
    console.log(data);
  };

  const fetchRoles = async () => {
    const response = await fetch(fetchUrl + "/user-roles");
    const data = await response.json();
    console.log("Rows : ", data);

    setRoles(data);
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }

    if (changePassword) {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleNewUser = () => {
    setFormData({
      _id: null,
      name: "",
      email: "",
      role: "",
      password: "",
      lastChanged: user._id,
    });
    setErrors({
      name: "",
      email: "",
      password: "",
    });
    setOpen(true);
    setChangePassword(true);
  };

  const handleSave = async () => {
    var sendData = {};
    if (validateForm()) {
      if (formData._id) {
        sendData = await fetch(fetchUrl + `/users/${formData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, lastChanged: user._id }),
        });
      } else {
        sendData = await fetch(fetchUrl + "/users", {
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
            message: "User Data saved",
            severity: "success",
          })
        );
    } else {
      console.log("Invalid Form Data");
      console.log(errors);
      response.success &&
        dispatch(
          openSnackBar({
            message: "Error saving User Data",
            severity: "error",
          })
        );
    }

    // setFormData({ _id: null, name: "", email: "", role: "", password: "" });

    fetchRows();
  };

  const handleEdit = (row) => {
    console.log("Edit Row values :", row);
    setFormData({ ...row, role: row.role._id });
    setOpen(true);
    setChangePassword(false);
  };

  const handleDelete = (row) => {
    setFormData(row);
    setOpenDelete(true);
  };

  const handleDeleteUser = async (id) => {
    const sendData = await fetch(fetchUrl + `/users/${id}`, {
      method: "DELETE",
    });
    const response = await sendData.json();
    response.success &&
      dispatch(
        openSnackBar({
          message: "User Deleted",
          severity: "warning",
        })
      );
    fetchRows();
    setOpenDelete(false);
    setFormData({ _id: null, name: "", email: "", role: "", password: "" });
  };

  useEffect(() => {
    fetchRows();
    fetchRoles();
  }, []);

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2}>
        <Grid size={12} sx={{ mb: -2.25 }}>
          <Typography variant="h4">Users</Typography>
        </Grid>
        <Grid size={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewUser}
            style={{ marginBottom: "1rem" }}
          >
            Add New User
          </Button>
        </Grid>
        <Grid size={12}>
          <MainCard>
            <Grid container>
              <Grid size={12}>
                <Typography variant="h5" gutterBottom>
                  User Table
                </Typography>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Last Changed</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.role.name}</TableCell>
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
        <DialogTitle>{formData._id ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={!!errors.email}
            helperText={errors.email}
          />
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              label="Role"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              error={!!errors.role}
            >
              {roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.role}</FormHelperText>
            {/* {errors.role && <div style={{ color: "red" }}>{errors.role}</div>} */}
          </FormControl>
          {formData._id && (
            <FormControlLabel
              label="Change Password"
              control={
                <Checkbox
                  checked={changePassword}
                  onChange={(event) => {
                    setChangePassword(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
          )}

          <TextField
            disabled={!changePassword}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={!!errors.password}
            helperText={errors.password}
          />
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
