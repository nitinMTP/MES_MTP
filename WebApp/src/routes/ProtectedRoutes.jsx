import { Container, Stack, Typography, Grid } from "@mui/material";

import MainCard from "../components/MainCard";

export default function ProtectedRoutes() {
  return (
    <Container maxWidth={false}>
      <Grid
        container
        rowSpacing={4.5}
        columnSpacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        minWidth={"calc(80vw)"}
        minHeight={"calc(100vh - 110px)"}
        // maxWidth={true}
      >
        <Grid size={6}>
          <MainCard
            sx={{
              padding: 2,
              // minHeight: 400,
              height: "100%",
            }}
            content={false}
            boxShadow
          >
            <Stack>
              <Typography variant="h5">Please login to continue</Typography>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </Container>
  );
}
