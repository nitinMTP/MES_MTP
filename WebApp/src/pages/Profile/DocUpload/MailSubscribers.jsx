import React, { useEffect, useRef, useState } from "react";
import MainCard from "../../../components/MainCard";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchUrl } from "../../../config";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../../store/reducers/siteConfig";
import { FixedSizeList } from "react-window";

export default function MailSubscribers() {
  const dispatch = useDispatch();

  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [enableEdit, setEnableEdit] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    getEmailList();
  }, []);

  function getEmailList() {
    // console.log("Getting Emails List");
    const options = {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch(fetchUrl + "/getEmailList", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log("Fetch Response : ", response);
        if (response.success) {
          // console.log(response);
          setEmails(response.emailList);
        } else {
          // console.log(response);
          setEmails([]);
        }
      });
  }

  function sendEmailList(emailList) {
    // console.log("Sending Email List to Server");

    const body = { emailList: emailList };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch(fetchUrl + "/setEmailList", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log("Setting Email List Response : ", response);
        if (response.success) {
          // console.log(response);
          dispatch(
            openSnackBar({
              message: "Email List updated",
              severity: "success",
            })
          );
        } else {
          // console.log(response);
          dispatch(
            openSnackBar({
              message: "Email List cannot be changed",
              severity: "error",
            })
          );
        }
        // console.log("Series : ", response.status);
      })
      .catch((_error) => {
        // console.log("Error Querying", error);
      });
  }

  const handleAddEmail = () => {
    if (validateEmail(newEmail.trim())) {
      setEmails([...emails, newEmail.trim()]);
      setNewEmail("");
      setErrors((prevErrors) => ({ ...prevErrors, newEmail: "" }));
      setEnableEdit(true);
      sendEmailList([...emails, newEmail.trim()]);
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newEmail: "Invalid email address",
      }));
    }
  };

  const handleEmailChange = (index, email) => {
    const updatedEmails = [...emails];

    if (validateEmail(email.trim())) {
      updatedEmails[index] = email;
      setEmails(updatedEmails);
      setErrors((prevErrors) => ({ ...prevErrors, [index]: "" }));
      sendEmailList(updatedEmails);
      return true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [index]: "Invalid email address",
      }));
      return false;
    }
  };

  const handleDeleteEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
    sendEmailList(updatedEmails);
    const updatedErrors = { ...errors };
    delete updatedErrors[index];
    setErrors(updatedErrors);
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [email]);

  return (
    <MainCard content={true}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography sx={{ display: "inline" }} component="span" variant="h5">
            Email Subscribers
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List
            sx={{
              width: "100%",
              // maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: "45vh",
              "& ul": { padding: 0 },
            }}
          >
            {emails.map((email, index) => (
              <>
                <Subscribers
                  enableEdit={enableEdit}
                  email={email}
                  key={index}
                  index={index}
                  handleDeleteEmail={handleDeleteEmail}
                  handleEmailChange={handleEmailChange}
                  error={errors[index]}
                />
                <ListItem ref={scrollRef}></ListItem>
              </>
            ))}
          </List>
        </Grid>

        <Grid item xs={10}>
          <TextField
            error={errors.newEmail ? true : false}
            fullWidth
            id="new-email-input"
            label="New Email"
            variant="outlined"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              if (e.target.value === "") {
                setEnableEdit(true);
              } else {
                setEnableEdit(false);
              }
            }}
            helperText={errors.newEmail}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handleAddEmail}
            startIcon={<PersonAddIcon />}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}

function Subscribers({
  enableEdit,
  email,
  key,
  index,
  handleDeleteEmail,
  handleEmailChange,
  error,
}) {
  const [edit, setEdit] = useState(false);
  const [subscriber, setSubscriber] = useState(email);

  useEffect(() => {
    console.log("Inside Enable Edit");

    if (!enableEdit) {
      setSubscriber(email);
    }
  }, [enableEdit, email]);

  useEffect(() => {
    setSubscriber(email);
  }, [email]);

  return (
    <ListItem>
      <Grid container spacing={4} paddingRight={2}>
        <Grid item xs={8} key={key}>
          <TextField
            error={error ? true : false}
            disabled={!edit}
            fullWidth
            id="email-input"
            label="Email"
            helperText={error}
            variant="outlined"
            value={subscriber}
            onChange={(event) => setSubscriber(event.target.value)}
          />
        </Grid>
        {edit && (
          <Grid item xs={2}>
            <Button
              disabled={!enableEdit}
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                handleEmailChange(index, subscriber)
                  ? setEdit(false)
                  : setEdit(true);
              }}
            >
              Save
            </Button>
          </Grid>
        )}
        {!edit && (
          <Grid item xs={2}>
            <Button
              disabled={!enableEdit}
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          </Grid>
        )}
        <Grid item xs={2}>
          <Button
            disabled={!enableEdit}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => {
              handleDeleteEmail(index);
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}
