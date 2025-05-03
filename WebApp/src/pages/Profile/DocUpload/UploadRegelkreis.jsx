import React, { useRef, useState } from "react";
import MainCard from "../../../components/MainCard";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { fetchUrl } from "../../../config";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../../store/reducers/siteConfig";

export default function UploadRegelkreis() {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      // Create a temporary URL for the selected PDF file for preview
      if (file && file.type === "application/pdf") {
        const fileUrl = URL.createObjectURL(file);
        setPdfPreviewUrl(fileUrl);
      } else {
        setPdfPreviewUrl(null); // Reset if not a valid PDF
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const config = {};
    formData.append("pdf", file);
    formData.append("json", JSON.stringify(config));
    // We will fill this out later

    const options = {
      method: "POST",
      body: formData,
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8",
      //   },
    };
    fetch(fetchUrl + "/uploadReportFile", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log("File Upload Response : ", response);
        if (response.success) {
          dispatch(
            openSnackBar({
              message: "File Uploaded Successfully",
              severity: "success",
            })
          );
          setFile(null);
        } else {
          dispatch(
            openSnackBar({
              message: "File Uploaded Error",
              severity: "error",
            })
          );
        }
      });
  };

  const handleCancel = async () => {
    setFile(null);
  };

  const uploadInputRef = useRef(null);

  return (
    <>
      <MainCard>
        <form onSubmit={handleUpload}>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h5"
              >
                Upload Regelkreis File
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <input
                ref={uploadInputRef}
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                onClick={() =>
                  uploadInputRef.current && uploadInputRef.current.click()
                }
                variant="contained"
              >
                Select
              </Button>
            </Grid>
            <Grid item xs={12}>
              {file && (
                <section>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h5"
                  >
                    PDF Preview
                  </Typography>
                  {/* <ul>
                    <li>Name: {file.name}</li>
                    <li>Type: {file.type}</li>
                    <li>Size: {file.size} bytes</li>
                  </ul> */}
                  <div>
                    <iframe
                      src={pdfPreviewUrl}
                      title="PDF Preview"
                      width="100%"
                      height="600"
                    ></iframe>
                  </div>
                </section>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2}>
                {file && (
                  <Button onClick={() => {}} type="submit" variant="contained">
                    Upload File
                  </Button>
                )}
                {file && (
                  <Button
                    onClick={handleCancel}
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </MainCard>
    </>
  );
}
