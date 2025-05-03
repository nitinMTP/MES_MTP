import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../../components/MainCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import AnimateButton from "../../components/@extended/AnimateButton";
import { openSnackBar } from "../../store/reducers/siteConfig";
import { fetchUrl } from "../../config";

export default function UserProfile() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [changeError, setChangeError] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { user } = useSelector((state) => state.user);

  const [userLevel, setUserLevel] = useState("User");

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2}>
        <Grid size={12} sx={{ mb: -2.25 }}>
          <Typography variant="h4">User Profile</Typography>
        </Grid>
        <Grid size={12}>
          <MainCard>
            <Grid container>
              <Grid size={4} alignItems="center" justifyContent="center">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <AccountCircleIcon style={{ fontSize: 150 }} />
                </Box>
              </Grid>
              <Grid size={8}>
                <List>
                  <ListItem>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitile2"
                        color="text.secondary"
                      >
                        Name
                      </Typography>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitle1"
                        color="text.primary"
                      >
                        {user.name}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitile2"
                        color="text.secondary"
                      >
                        Email
                      </Typography>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitle1"
                        color="text.primary"
                      >
                        {user.email}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitile2"
                        color="text.secondary"
                      >
                        Access Level
                      </Typography>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitle1"
                        color="text.primary"
                      >
                        {user.role ? user.role.name : "Null"}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </List>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid size={12} sx={{ mb: -2.25 }}>
          <Typography variant="h4">Change Password</Typography>
        </Grid>
        <Grid size={12}>
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              setStatus({ success: true });
              setSubmitting(true);
              try {
                console.log("Values To Change Password : ", values);
                const body = {
                  _id: user._id,
                  currentPassword: values.currentPassword,
                  newPassword: values.newPassword,
                };
                const options = {
                  method: "POST",
                  body: JSON.stringify(body),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                };
                await fetch(fetchUrl + "/changePassword", options)
                  .then((response) => response.json())
                  .then((response) => {
                    console.log("Fetch Response : ", response);
                    if (response.passwordChanged) {
                      console.log("Password Change successful");
                      setChangeError(false);
                      dispatch(
                        openSnackBar({
                          message: "Password Changed Successfully",
                          severity: "success",
                        })
                      );
                      navigate("/");
                    } else {
                      console.log("Password Change failed");
                      setChangeError(true);
                      dispatch(
                        openSnackBar({
                          message: "Please check your Current Password",
                          severity: "error",
                        })
                      );
                    }
                    setSubmitting(false);
                  })
                  .catch((error) => {
                    dispatch(
                      openSnackBar({
                        message: "Password Change Failed",
                        severity: "error",
                      })
                    );
                    console.log("Error Querying", error);
                    setStatus({ success: false });
                    setChangeError(true);
                  });
              } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                // setLoginError(true);
                openSnackBar({
                  message: "Password Change Unknown Error",
                  severity: "error",
                });
              }
            }}
            validate={(values) => {
              var errors = {};

              var errorFlag = false;

              if (values.currentPassword === "") {
                errors.currentPassword = "Required";
                errorFlag = true;
              } else {
                errors.currentPassword = null;
              }
              if (values.newPassword === "") {
                errors.newPassword = "New Password Required";
                errorFlag = true;
              } else if (values.newPassword.length < 6) {
                errors.newPassword =
                  "New Password must be atleast 6 characters";
                errorFlag = true;
              } else if (values.newPassword === values.currentPassword) {
                errors.newPassword = "New Password same as current";
                errorFlag = true;
              } else {
                errors.newPassword = null;
              }
              if (values.confirmPassword === "") {
                errors.confirmPassword = "Please confirm the New Password";
                errorFlag = true;
              } else if (values.confirmPassword !== values.newPassword) {
                errors.confirmPassword = "Passwords don't match";
                errorFlag = true;
              } else {
                errors.confirmPassword = null;
              }
              if (errorFlag) {
                return errors;
              } else {
                return null;
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <MainCard>
                  <Grid container spacing={4}>
                    <Grid size={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="subtitile2"
                            color="text.secondary"
                          >
                            Current Password
                          </Typography>
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(
                            touched.currentPassword && errors.currentPassword
                          )}
                          id="-password-login"
                          type={showPassword ? "text" : "password"}
                          value={values.currentPassword}
                          name="currentPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <EyeOutlined />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Enter password"
                        />
                        {touched.currentPassword && errors.currentPassword && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-password-login"
                          >
                            {errors.currentPassword}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid size={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="subtitile2"
                            color="text.secondary"
                          >
                            New Password
                          </Typography>
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(
                            touched.newPassword && errors.newPassword
                          )}
                          id="-password-login"
                          type={showPassword ? "text" : "password"}
                          value={values.newPassword}
                          name="newPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <EyeOutlined />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Enter password"
                        />
                        {touched.newPassword && errors.newPassword && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-password-login"
                          >
                            {errors.newPassword}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid size={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="subtitile2"
                            color="text.secondary"
                          >
                            New Password
                          </Typography>
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          id="-password-login"
                          type={showPassword ? "text" : "password"}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <EyeOutlined />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Enter password"
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-password-login"
                          >
                            {errors.confirmPassword}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    {errors.submit && (
                      <Grid size={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Grid>
                    )}
                    <Grid size={12}>
                      <AnimateButton>
                        <Button
                          // disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Change Password
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    {changeError && (
                      <Typography color={"error"}>
                        Failed to change password
                      </Typography>
                    )}
                  </Grid>
                </MainCard>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
}
