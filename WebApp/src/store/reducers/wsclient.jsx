// types
import { createSlice } from "@reduxjs/toolkit";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { wsUrl } from "../../config";

const client = new W3CWebSocket(wsUrl);

const wsClientSlice = createSlice({
  name: "wsclient",
  initialState: {
    client: client,
  },
  reducers: {},
});

export default wsClientSlice.reducer;
