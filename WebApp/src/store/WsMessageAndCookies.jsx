import { useDispatch, useSelector } from "react-redux";
import { newMachineStatus, setMachines } from "./reducers/machineData";

import { useCookies } from "react-cookie";
import { fetchUrl } from "../config";
import { logIn } from "./reducers/authentication";
import {
  openAlertBox,
  setLanguage,
  setMachineSort,
  setMode,
} from "./reducers/siteConfig";
import { newSystemStatus } from "./reducers/systemData";
import { useEffect } from "react";

export default function WsMessageAndCookies({ children }) {
  const dispatch = useDispatch();

  const [cookies] = useCookies([
    "token",
    "_id",
    "machineSort",
    "siteMode",
    "siteLanguage",
  ]);

  const client = useSelector((state) => state.wsclient.client);

  dispatch(
    setMachineSort({
      machineSort: cookies.machineSort ? cookies.machineSort : "none",
    })
  );

  dispatch(setMode({ mode: cookies.siteMode ? cookies.siteMode : "dark" }));

  dispatch(
    setLanguage({
      language: cookies.siteLanguage ? cookies.siteLanguage : "en",
    })
  );

  client.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const type = data.type;
    const message = data.message;
    switch (type) {
      case "MachineStatus":
        dispatch(newMachineStatus(message));
        break;
      case "SystemStatus":
        dispatch(newSystemStatus(message));
      default:
        break;
    }
  };

  client.onclose = (event) => {
    // console.log("Close Event : ", event);
    dispatch(openAlertBox());
  };

  client.onerror = (event) => {
    console.log("Error : ", event);
    dispatch(openAlertBox());
  };

  const getMachines = async () => {
    const response = await fetch(fetchUrl + "/machines");
    const data = await response.json();

    dispatch(setMachines({ machines: data }));
    console.log("Machines :", data);
  };

  useEffect(() => {
    // Persist Login
    if (cookies.token) {
      const body = {
        _id: cookies._id,
        token: cookies.token,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      fetch(fetchUrl + "/getUser", options)
        .then((response) => response.json())
        .then((response) => {
          const { userFound, user, token } = response;
          console.log("User : ", userFound);

          if (userFound) {
            dispatch(
              logIn({
                firstLogIn: true,
                loggedIn: userFound,
                user: user,
                accessLevel: 1,
                token: token,
                // tokenDecoded: tokenDecoded,
              })
            );
            getMachines();
          } else {
            dispatch(
              logIn({
                firstLogIn: true,
                loggedIn: false,
                user: {},
                accessLevel: null,
                token: null,
                tokenDecoded: null,
              })
            );
          }
        })
        .catch((error) => {
          console.log("Error Persist Login", error);
        });
    }
  }, []);
  return <>{children}</>;
}
