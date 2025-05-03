import AuthWrapper from "./AuthWrapper";
import { Grid, Stack, Typography } from "@mui/material";
import AuthLogin from "./auth-forms/AuthLogin";

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Login</Typography>
            {/* <Typography
              component={Link}
              to="/register"
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography> */}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
