// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: "/",
  fontFamily: `'Public Sans', sans-serif`,
  i18n: "en",
  miniDrawer: true,
  container: true,
  // mode: "dark",
  // presetColor: "default",
  // themeDirection: "ltr",
};

export default config;
export const drawerWidth = 260;
export const miniDrawerWidth = 60;
export const drawerFooterHeight = 100;
export const miniDrawerFooterHeight = 80;

// Set Server IP Address
const machineIp = window.location.hostname;

export const fetchUrl = "http://" + machineIp + ":8000";
export const wsUrl = "ws://" + machineIp + ":8000";
