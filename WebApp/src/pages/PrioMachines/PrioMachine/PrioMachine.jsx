import { Grid } from "@mui/material";
import { Fragment } from "react";
import StatusGraph from "./StatusGraph";
import UtilizationGraph from "./UtilizationGraph";

export default function PrioMachine({
  priority,
  machine,
  statusRange,
  loading,
}) {
  return (
    <Fragment key={machine}>
      <Grid container rowSpacing={1.5} columnSpacing={1} paddingTop={2}>
        <Grid item xs={12} sm={12} md={9}>
          <StatusGraph
            type={machine.name.type}
            priority={priority}
            machinename={machine.name.name}
            series={machine.status}
            parts={machine.parts}
            loading={loading}
            cycleTime={machine.cycleTime}
            from={statusRange[0]}
            to={statusRange[1]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <UtilizationGraph
            type={machine.name.type}
            series={machine.utilization}
            loading={loading}
            parts={machine.parts}
            cycleTime={machine.cycleTime}
            energyVariables={machine.energyVariables}
            totalEnergyData={machine.totalEnergyData}
            downtime={machine.downtime}
          />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={8}>
  <PartsGraph series={partsSeries} />
</Grid> */}
      </Grid>
    </Fragment>
  );
}
