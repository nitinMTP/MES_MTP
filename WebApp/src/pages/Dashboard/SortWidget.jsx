import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";

import SortIcon from "@mui/icons-material/Sort";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setMachineSort } from "../../store/reducers/siteConfig";
import { setLocation } from "../../store/reducers/machineData";
import { useEffect, useState } from "react";
import { fetchUrl } from "../../config";

export default function SortWidget() {
  const dispatch = useDispatch();
  const { machineSort, language } = useSelector((state) => state.siteConfig);
  const { location } = useSelector((state) => state.machineData);

  const [locations, setLocations] = useState([]);

  const [, setCookie] = useCookies(["email", "machineSort"]);

  const getLocations = async () => {
    const response = await fetch(fetchUrl + "/locations");
    const data = await response.json();
    setLocations(data);
    console.log(data);
  };

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormControl fullWidth>
        <Select
          labelId="sort-select-label"
          id="select-autowidth"
          value={machineSort}
          onChange={(event) => {
            dispatch(setMachineSort({ machineSort: event.target.value }));
            dispatch(setLocation({ location: event.target.value }));
            setCookie("machineSort", event.target.value, {
              sameSite: "Lax",
            });
          }}
          fullWidth
          //   label="Filter"
          size="small"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SortIcon />
            </InputAdornment>
          }
        >
          <MenuItem key={1} value={"none"}>
            {text.none[language]}
          </MenuItem>
          {locations.map((location) => (
            <MenuItem key={location._id} value={location._id}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

const text = {
  none: { en: "None", de: "Keine Sortierung" },
  room: { en: "Room", de: "Raum" },
  type: { en: "Machine Type", de: "Anlage Typ" },
};
