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

  downtime = [
    {
      from: "2023-10-01T12:00:00Z",
      to: "2023-10-01T12:30:00Z",
      reason: "Reason 1",
    },
    {
      from: "2023-10-01T13:00:00Z",
      to: "2023-10-01T13:30:00Z",
      reason: "Reason 2",
    },
    {
      from: "2023-10-01T14:00:00Z",
      to: "2023-10-01T14:30:00Z",
      reason: "Reason 3",
    },
    {
      from: "2023-10-01T15:00:00Z",
      to: "2023-10-01T15:30:00Z",
      reason: "Reason 4",
    },
    {
      from: "2023-10-01T16:00:00Z",
      to: "2023-10-01T16:30:00Z",
      reason: "Reason 5",
    },
    {
      from: "2023-10-01T17:00:00Z",
      to: "2023-10-01T17:30:00Z",
      reason: "Reason 6",
    },
    {
      from: "2023-10-01T18:00:00Z",
      to: "2023-10-01T18:30:00Z",
      reason: "Reason 7",
    },
    {
      from: "2023-10-01T19:00:00Z",
      to: "2023-10-01T19:30:00Z",
      reason: "Reason 8",
    },
    {
      from: "2023-10-01T20:00:00Z",
      to: "2023-10-01T20:30:00Z",
      reason: "Reason 9",
    },
    {
      from: "2023-10-01T21:00:00Z",
      to: "2023-10-01T21:30:00Z",
      reason: "Reason 10",
    },
  ];

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
