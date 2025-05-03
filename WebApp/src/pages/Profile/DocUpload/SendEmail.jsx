import React from "react";
import MainCard from "../../../components/MainCard";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { openSnackBar } from "../../../store/reducers/siteConfig";
import { fetchUrl } from "../../../config";

export default function SendEmail() {
  const dispatch = useDispatch();
  const { name, surname } = useSelector((state) => state.user);

  return (
    <MainCard content={true}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography sx={{ display: "inline" }} component="span" variant="h5">
            Send Email
          </Typography>
        </Grid>
        <Formik
          initialValues={{
            subject: "Regelkreisbericht " + moment().format("YYYY-MM-DD"),
            content: `hier sind die Prioanlagen und der Regelkreis für Heute.`,
            sendRegelkreis: true,
            sendPrioMachines: true,
            name: name + " " + surname,
            inputCorrect: false,
          }}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            // console.log("Inside Submit");
            setSubmitting(true);
            try {
              //   console.log("Sending Email : ", values);
              const body = JSON.parse(JSON.stringify(values));
              body.content = values.content.replace(/(?:\r\n|\r|\n)/g, "<br>");
              const options = {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              };
              await fetch(fetchUrl + "/sendEmail", options)
                .then((response) => response.json())
                .then((response) => {
                  //   console.log("Send Email Response : ", response);
                  if (response.success) {
                    // console.log("Email Sent Successfully !");
                    dispatch(
                      openSnackBar({
                        message: "Email Sent Successfully",
                        severity: "success",
                      })
                    );
                  } else {
                    // console.log("Email Send Failed");
                    dispatch(
                      openSnackBar({
                        message: "Error Sending Email",
                        severity: "error",
                      })
                    );
                  }
                  values.inputCorrect = false;
                  setSubmitting(false);
                })
                .catch((error) => {
                  dispatch(
                    openSnackBar({
                      message: "Error Sending Email !",
                      severity: "error",
                    })
                  );
                });
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
              openSnackBar({
                message: "Email Send Error !",
                severity: "error",
              });
              values.inputCorrect = false;
              setSubmitting(false);
            }
          }}
          validate={(values) => {
            var errors = {};
            var errorFlag = false;

            if (values.subject.trim() === "") {
              errors.subject = "Cannot be empty";
              errorFlag = true;
            } else {
              errors.subject = null;
            }
            if (values.content === "") {
              errors.content = "Cannot be empty";
              errorFlag = true;
            } else {
              errors.content = null;
            }
            if (!values.inputCorrect) {
              errors.inputCorrect = "Please check all inputs!";
              errorFlag = true;
            } else {
              errors.inputCorrect = null;
            }
            // console.log("Error Flag : ", errorFlag);

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
            <Grid item xs={12}>
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-subject">
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="subtitile2"
                          color="text.secondary"
                        >
                          Subject
                        </Typography>
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.subject && errors.subject)}
                        id="-email-submit"
                        type={"text"}
                        value={values.subject}
                        name="subject"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Subject"
                      />
                      {errors.subject && (
                        <FormHelperText error>{errors.subject}</FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="-email-sendPrioMachines"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          checked={values.sendPrioMachines}
                          name="sendPrioMachines"
                        />
                      }
                      label="Send Prio Machines"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="-email-sendRegelkreis"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          checked={values.sendRegelkreis}
                          name="sendRegelkreis"
                        />
                      }
                      label="Send Regelkreis"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-content">
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="subtitile2"
                          color="text.secondary"
                        >
                          Content
                        </Typography>
                      </InputLabel>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitile2"
                        color="text.primary"
                      >
                        Hallo,
                      </Typography>
                      <TextField
                        fullWidth
                        error={Boolean(touched.content && errors.content)}
                        id="-email-content"
                        // label="Content"
                        name="content"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        multiline
                        rows={10}
                        value={values.content}
                      />
                      {errors.content && (
                        <FormHelperText error>{errors.content}</FormHelperText>
                      )}
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitile2"
                        color="text.primary"
                      >
                        mit Freundlichen Grüßen,
                      </Typography>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="subtitile2"
                        color="text.primary"
                      >
                        {name + " " + surname}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="-email-inputCorrect"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          checked={values.inputCorrect}
                          name="inputCorrect"
                        />
                      }
                      label="Are the given input correct?"
                    />
                    {errors.inputCorrect && (
                      <FormHelperText error>
                        {errors.inputCorrect}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        // disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                      >
                        Send Email
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          )}
        </Formik>
      </Grid>
    </MainCard>
  );
}
