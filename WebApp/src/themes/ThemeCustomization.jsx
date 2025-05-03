import PropTypes from "prop-types";
import { useMemo } from "react";

// material-ui
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// project import
import Palette from "./palette";
import Typography from "./typography";
import CustomShadows from "./shadows";
import componentsOverride from "./overrides";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }) {
  const mode = useSelector((state) => state.siteConfig.mode);

  const Theme = Palette(mode, "default");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = Typography(`'Public Sans', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(Theme), [Theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: Theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [Theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#b9c40c",
            },
            components: {
              Button: {
                colorPrimary: "#b9c40c",
                algorithm: true, // Enable algorithm
              },
              Input: {
                colorPrimary: "#eb2f96",
                algorithm: true, // Enable algorithm
              },
            },
            algorithm:
              mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <CssBaseline />
          {children}
        </ConfigProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};
