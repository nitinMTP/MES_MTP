// material-ui
import { createTheme } from "@mui/material/styles";

// third-party
import { presetPalettes } from "@ant-design/colors";

// project import
import Theme from "./theme/Theme";

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const colors = presetPalettes;

  const greyPrimary = [
    "#ffffff",
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#d9d9d9",
    "#bfbfbf",
    "#8c8c8c",
    "#595959",
    "#262626",
    "#141414",
    "#000000",
  ];
  const greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"];
  const greyConstant = ["#fafafb", "#e6ebf1"];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant, mode];

  const paletteColor = Theme(colors);

  return createTheme({
    palette: {
      mode,
      common: {
        black: "#000",
        white: "#fff",
      },
      ...paletteColor,

      // text: {
      //   primary: paletteColor.grey[700],
      //   secondary: paletteColor.grey[500],
      //   disabled: paletteColor.grey[400],
      // },
      // action: {
      //   disabled: paletteColor.grey[300],
      // },
      // divider: paletteColor.grey[200],
      // background: {
      //   paper: paletteColor.grey[100],
      //   default: paletteColor.grey[100],
      // },
      background: {
        default:
          mode === "light" ? paletteColor.grey[200] : paletteColor.grey[900],
        paper:
          mode === "light" ? paletteColor.grey[100] : paletteColor.grey[800],
      },
    },
  });
};

export default Palette;
