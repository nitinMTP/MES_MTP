import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { fetchUrl } from "../../../config";
import { logIn } from "../../../store/reducers/authentication";
import { openSnackBar } from "../../../store/reducers/siteConfig";
import { jwtDecode } from "jwt-decode";

export default function AuthLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [cookies, setCookie] = useCookies(["_id"]);
  const { language } = useSelector((state) => state.siteConfig);

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setStatus({ success: true });
          setSubmitting(true);
          try {
            // console.log("Values Login : ", values);
            const body = {
              email: values.email.toLowerCase(),
              password: values.password,
            };
            const options = {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            };
            await fetch(fetchUrl + "/login", options)
              .then((response) => response.json())
              .then((response) => {
                console.log("Fetch Response : ", response);
                const { loginSuccess, user, token } = response;
                if (loginSuccess) {
                  console.log("Token : ", token);
                  const decoded = jwtDecode(token);
                  console.log("Decoded Token : ", decoded);
                  dispatch(
                    logIn({
                      logOnce: true,
                      loggedIn: loginSuccess,
                      user: user,
                      token: token,
                      tokenDecoded: decoded,
                    })
                  );
                  setStatus({ success: true });
                  setLoginError(false);
                  dispatch(
                    openSnackBar({
                      message: "Login Successful",
                      severity: "success",
                    })
                  );
                  var expiryDate = new Date(moment().add(1, "day"));

                  if (stayLoggedIn) {
                    // console.log("Creating Cookie of the user : ", email);
                    setCookie("_id", user._id, {
                      expires: expiryDate,
                      sameSite: "Lax",
                    });
                    setCookie("token", token, {
                      expires: expiryDate,
                      sameSite: "Lax",
                    });
                  } else {
                    // Clear Cookies after closing session
                    setCookie("_id", user._id, {
                      sameSite: "Lax",
                      expires: 0,
                    });
                    setCookie("token", token, {
                      expires: 0,
                      sameSite: "Lax",
                    });
                  }

                  navigate("/");
                } else {
                  setStatus({ success: false });
                  setLoginError(true);
                  dispatch(
                    openSnackBar({
                      message: "Invalid Credentials",
                      severity: "error",
                    })
                  );
                }

                setSubmitting(false);
              })
              .catch((error) => {
                console.log("Error Querying", error);
                setStatus({ success: false });
                setLoginError(true);
                dispatch(
                  openSnackBar({
                    message: "Login Unsuccessful",
                    severity: "error",
                  })
                );
              });
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            setLoginError(true);
            dispatch(
              openSnackBar({ message: "Login Error", severity: "error" })
            );
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
            <Grid container spacing={3}>
              <Grid size={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">
                    <Typography variant="h6">Email Address</Typography>
                  </InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid size={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">
                    <Typography variant="h6">
                      {text.password[language]}
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
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
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid size={12} sx={{ mt: -1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stayLoggedIn}
                        onChange={(event) =>
                          setStayLoggedIn(event.target.checked)
                        }
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6">
                        {text.signedIn[language]}
                      </Typography>
                    }
                  />
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
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
            <Grid size={12}>
              {loginError && (
                <Typography color={"error"}>Login Error</Typography>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

const text = {
  signedIn: { en: "Stay signed in?", de: "Eingeloggt bleiben?" },
  password: { en: "Password", de: "Passwort" },
};
