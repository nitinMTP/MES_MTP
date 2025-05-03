// material-ui
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";

// assets
import { SearchOutlined } from "@ant-design/icons";

export default function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: 224 } }}>
      <OutlinedInput
        size="small"
        id="header-search"
        startAdornment={
          <InputAdornment position="start" sx={{ mr: -0.5 }}>
            <SearchOutlined />
          </InputAdornment>
        }
        aria-describedby="header-search-text"
        inputProps={{
          "aria-label": "weight",
        }}
        placeholder="Search"
      />
    </FormControl>
  );
}
