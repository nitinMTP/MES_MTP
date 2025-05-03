// ==============================|| OVERRIDES - SELECT ||============================== //

export default function Select(theme) {
  const disabledStyle = {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[200],
    },
  };

  return {
    MuiSelect: {
      defaultProps: {
        // disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 400,
        },
        contained: {
          ...disabledStyle,
        },
        outlined: {
          ...disabledStyle,
        },
      },
    },
  };
}
