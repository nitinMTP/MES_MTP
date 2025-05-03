import PropTypes from "prop-types";
import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// project import
import { activeItem } from "../../../../../store/reducers/menu";
import { useCookies } from "react-cookie";
import { logOut } from "../../../../../store/reducers/authentication";
import { openSnackBar } from "../../../../../store/reducers/siteConfig";

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level, mode, type, command }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { drawerOpen, openItem } = useSelector((state) => state.menu);

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => {
      return <Link ref={ref} {...props} to={item.url} target={itemTarget} />;
    }),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(activeItem({ openItem: [id] }));
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon style={{ fontSize: drawerOpen ? "1rem" : "1.25rem" }} />
  ) : (
    false
  );

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;
  // active menu item on page load
  useEffect(() => {
    if (type === "item") {
      if (pathname.includes(item.url)) {
        dispatch(activeItem({ openItem: [item.id] }));
      }
    }

    // eslint-disable-next-line
  }, [pathname]);

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";

  const [cookies, setCookie, removeCookie] = useCookies(["_id"]);

  const handleLogout = async () => {
    dispatch(logOut());
    removeCookie("_id", { path: "/" });
    removeCookie("token", { path: "/" });

    dispatch(openSnackBar({ message: "User Logged Out !", severity: "info" }));
  };

  function handleClick() {
    if (type === "item") {
      itemHandler(item.id);
    }
    if (type === "button") {
      if (command === "logout") {
        handleLogout();
      }
    }
  }

  return (
    <Box sx={{ ...(drawerOpen && { pl: 1, pr: 1 }) }}>
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        onClick={() => handleClick()}
        selected={isSelected}
        sx={{
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          borderRadius: 5,
          ...(drawerOpen && {
            "&:hover": {
              bgcolor: mode === "light" ? "primary.lighter" : "primary.dark",
            },
            "&.Mui-selected": {
              bgcolor: mode === "light" ? "primary.lighter" : "primary.darker",
              borderRight: `2px solid ${theme.palette.primary.main}`,
              color: iconSelectedColor,
              "&:hover": {
                color: iconSelectedColor,
                bgcolor: mode === "light" ? "primary.lighter" : "primary.dark",
              },
            },
          }),
          ...(!drawerOpen && {
            "&:hover": {
              bgcolor: "transparent",
            },
            "&.Mui-selected": {
              "&:hover": {
                bgcolor: "transparent",
              },
              bgcolor: "transparent",
            },
          }),
        }}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: isSelected
                ? mode === "light"
                  ? iconSelectedColor
                  : "text.primary.light"
                : textColor,
              ...(!drawerOpen && {
                borderRadius: 4,
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  bgcolor:
                    mode === "light" ? "secondary.lighter" : "secondary.dark",
                },
              }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor:
                    mode === "light" ? "primary.lighter" : "primary.darker",
                  "&:hover": {
                    bgcolor:
                      mode === "light" ? "primary.lighter" : "primary.dark",
                  },
                }),
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography
                variant="h6"
                sx={{
                  color: isSelected
                    ? mode === "light"
                      ? "text.primary.light"
                      : textColor
                    : textColor,
                }}
              >
                {item.title}
              </Typography>
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
          <Chip
            // color={item.chip.color}
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
    </Box>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
