import { Container, Grid } from "@mui/material";

import AuthBackground from "../../assets/images/auth/AuthBackground";
import AuthCard from "./AuthCard";

export default function AuthWrapper({ children }) {
  return (
    <Container sx={{ minHeight: "100vh", minWidth: "100vw" }} maxWidth={false}>
      <AuthBackground />

      <Grid container direction="column" justifyContent="flex-end" sx={{}}>
        <Grid size={{ xs: 12 }}>
          <img
            src={"/mtp-dark-logo.webp"}
            alt="MTP Logo"
            // width="100"
            height={50}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: "calc(100vh - 134px)",
                md: "calc(100vh - 112px)",
              },
            }}
          >
            <Grid>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} sx={{ m: 3, mt: 1 }}>
          {/* <AuthFooter /> */}
        </Grid>
      </Grid>
    </Container>
  );
}
