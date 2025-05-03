import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import UploadRegelkreis from "./UploadRegelkreis";
import MainCard from "../../../components/MainCard";
import MailSubscribers from "./MailSubscribers";
import SelectPrioMachines from "./SelectPrioMachines";
import SendEmail from "./SendEmail";

export default function SiteSettings() {
  return (
    <>
      <Grid container rowSpacing={2.75} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Upload Documents</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Stack spacing={2}>
            <UploadRegelkreis />
            <SelectPrioMachines />
            <MailSubscribers />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Stack spacing={2}>
            <SendEmail />
          </Stack>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={6}>
          <UpdatePrioMachines />
        </Grid> */}
      </Grid>
    </>
  );
}
