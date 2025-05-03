import {
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import MainCard from "../../components/MainCard";
import { useSelector } from "react-redux";

function TableHeader() {
  const { language } = useSelector((state) => state.siteConfig);
  return (
    <TableHead>
      <TableRow>
        <TableCell>{text.from[language]}</TableCell>
        <TableCell>{text.to[language]}</TableCell>
        <TableCell></TableCell>
        <TableCell>Reason</TableCell>
      </TableRow>
    </TableHead>
  );
}

function Row({ data }) {
  const fromTime = moment(data.from);
  const toTime = moment(data.to);
  const duration = Math.floor(
    moment.duration(toTime.diff(fromTime)).asMinutes()
  );
  return (
    <TableRow>
      <TableCell>{fromTime.format("HH:mm")}</TableCell>
      <TableCell>{toTime.format("HH:mm")}</TableCell>
      <TableCell>{duration + " min"}</TableCell>
      <TableCell>{duration + " min"}</TableCell>
    </TableRow>
  );
}

export default function DowntimeTable({ downtime, loading }) {
  const { language } = useSelector((state) => state.siteConfig);

  return (
    <MainCard
      sx={{
        padding: 2,
        // minHeight: 500,
        height: "100%",
      }}
      content={false}
    >
      <Grid
        container
        justifyContent="centre"
        alignItems="centre"
        rowSpacing={2}
      >
        {!loading ? (
          <>
            <Grid size={12}>
              <Typography variant="h5">{text.downtime[language]}</Typography>
            </Grid>
            <Grid size={12}>
              <TableContainer
                sx={{
                  width: "100%",
                  overflowX: "auto",
                  position: "relative",
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: 350,
                  "& td, & th": { whiteSpace: "nowrap" },
                }}
              >
                <Table
                  size="small"
                  stickyHeader
                  aria-labelledby="tableTitle"
                  // sx={{
                  //   "& .MuiTableCell-root:first-of-type": {
                  //     pl: 2,
                  //   },
                  //   "& .MuiTableCell-root:last-of-type": {
                  //     pr: 3,
                  //   },
                  // }}
                >
                  <TableHeader />
                  <TableBody>
                    {downtime &&
                      downtime.map((e) => <Row data={e} key={e.from} />)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </>
        ) : (
          <>
            <Grid size={12}></Grid>
            <Grid size={4}>
              <CircularProgress size={200} />
            </Grid>
            <Grid size={4}></Grid>
          </>
        )}
      </Grid>
    </MainCard>
  );
}

const text = {
  downtime: { en: "Downtime", de: "Stillstand" },
  from: { en: "From", de: "Von" },
  to: { en: "To", de: "Bis" },
};
