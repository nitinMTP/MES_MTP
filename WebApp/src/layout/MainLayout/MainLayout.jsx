import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header/Header";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../../store/reducers/menu";
import MainDrawer from "./Drawer/Drawer";
import Navigation from "./Drawer/DrawerContent/Navigation/Navigation";
import SimpleBarScroll from "../../components/third-party/SimpleBar";
import { drawerWidth } from "../../config";

export default function MainLayout() {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const [width, setWidth] = useState("calc(100vw - 700px)");
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    // setOpen(!matchDownLG);
    // dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!matchDownLG) {
      // console.log("Full Screen ");
      drawerOpen
        ? setWidth("calc(100vw - 260px)")
        : setWidth("calc(100vw - 60px)");
    } else {
      // console.log("Small Screen ");
      setWidth("calc(100vw - 10px)");
    }
  }, [matchDownLG, drawerOpen]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  const ref = useRef();
  // const { width, height } = useContainerDimensions(componentRef);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor: "background.default",
        overscrollBehavior: "none",
      }}
    >
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <div ref={ref}>
        <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
      </div>

      <Box
        component="main"
        sx={{
          // width: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          // p: { xs: 2, sm: 3 },
          // flexDirection: "row",
          backgroundColor: "background.default",
          borderRadius: 2,
          overscrollBehavior: "none",
        }}
        minHeight={"calc(100vh - 0px)"}
        minWidth={width}
      >
        <Toolbar
          sx={{ overflow: "none", backgroundColor: "background.default" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            paddingTop: 10,
            backgroundColor: "background.default",
            borderTopLeftRadius: matchDownLG ? 0 : 25,
          }}
          minHeight={"calc(100vh - 64px)"}
          minWidth={width}
        >
          <Outlet />
        </Box>

        {!matchDownLG && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,

              backgroundColor: "background.paper",
              position: "fixed",
              top: 60,
              padding: 0,
            }}
            minHeight={"20px"}
            minWidth={20}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: 20,
                backgroundColor: "background.default",
                borderTopLeftRadius: matchDownLG ? 0 : 25,
                position: "fixed",
                top: 60,
                opacity: 1,
              }}
              minHeight={20}
            ></Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
