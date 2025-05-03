import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function ConnectionErrorAlert() {
  const { alertBoxOpen, language } = useSelector((state) => state.siteConfig);

  function refresh() {
    window.location.reload();
  }

  return (
    <Dialog
      open={alertBoxOpen}
      //   onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {text.dialogTitle[language]}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text.dialogContent[language]}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={refresh} autoFocus>
          Refresh
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const text = {
  dialogTitle: { en: "Connection Broken", de: "Verbindung unterbrochen" },
  dialogContent: {
    en: " Seems like the connection to the server is broken. Please refresh the page.",
    de: "Es scheint, dass die Verbindung zum Server unterbrochen ist. Bitte aktualisieren Sie die Seite.",
  },
};
