// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import wsclient from "./wsclient";
import machineData from "./machineData";
import systemData from "./systemData";
import siteConfig from "./siteConfig";
import user from "./authentication";
import machineInfo from "./machineInfo";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  siteConfig,
  wsclient,
  machineData,
  machineInfo,
  systemData,
  user,
});

export default reducers;
