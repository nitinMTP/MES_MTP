import { useDispatch, useSelector } from "react-redux";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { closeSnackBar } from "../store/reducers/siteConfig";

export default function SnackBar() {
  const dispatch = useDispatch();
  const { snackBarOpen, snackBarMessage, snackBarSeverity } = useSelector(
    (state) => state.siteConfig
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackBar());
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarSeverity}
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
