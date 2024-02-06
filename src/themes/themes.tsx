import ArrowDownIcon from "@/components/MuiIcons/ArrowDownIcon";
import { createTheme } from "@mui/material/styles";

const MIN_WIDTH = 20; //rem

export const theme = createTheme({
  breakpoints: {
    unit: "rem",
  },
  palette: {
    primary: {
      main: "#01b6f3",
      light: "#01b6f3",
      dark: "#01b6f3",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffa904",
      light: "#ffa904",
      dark: "#ffa904",
      contrastText: "#ffffff",
    },
    error: {
      main: "#db1401",
      light: "#db1401",
      dark: "#db1401",
      contrastText: "#ffffff",
    },
    grey: {
      900: "#333333",
      800: "#474747",
      700: "#5b5b5b",
      600: "#707070",
      500: "#848484",
      400: "#999999",
      300: "#adadad",
      200: "#c1c1c1",
      100: "#d6d6d6",
    },
    action: {
      hover: "rgba(255, 185, 101, 0.7)",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightBold: 900,
    fontWeightMedium: 800,
    fontWeightRegular: 600,
  },
  shadows: [
    "none",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
    "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
  ],
  spacing: [0, 8, 16, 32, 64, 128],
  shape: {
    borderRadius: 15,
  },
  transitions: {
    duration: {
      shortest: 50,
      shorter: 75,
      short: 150,
      // most basic recommended timing
      standard: 200,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          border: "none",
          width: `min(${MIN_WIDTH}rem, 100%)`,
          transition: "0.15s all ease-in-out",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: 15,
          transition: "0.15s all ease-in-out",
        },
        notchedOutline: {
          boxShadow: "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",

          border: "0.1rem solid rgba(51, 51, 51, 0.05)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "1.5rem",
          fontSize: "medium",
          borderRadius: "3rem",
          transform: "scale(0.95)",
          padding: "0.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          transition: "0.15s all ease-in-out",
          fontWeight: "800",
          textTransform: "none",

          "&:hover": {
            transform: "scale(1)",
          },
        },
        outlined: {
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem",

          "&:hover": {},
        },
        text: {
          background: "transparent",
          color: "black",
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem",

          "&:hover": {
            background: "transparent",
            border: "none",
            color: "black",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          background: "#ffffff",
          borderRadius: 15,
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        disableClearable: false,
        disabled: false,
        popupIcon: <ArrowDownIcon />,
      },
      styleOverrides: {
        root: {
          width: `min(${MIN_WIDTH}rem, 100%)`,
          border: "none",
          borderRadius: 15,
          borderBottom: "0.1rem solid rgba(51, 51, 51, 0.1)",
          boxShadow: "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",

          fieldSet: {
            border: "none",
            padding: "1rem 1rem 1rem 1rem",
            boxShadow: "none",
          },
        },
      },
    },

    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowDownIcon,
      },

      styleOverrides: {
        root: {
          width: `min(${MIN_WIDTH}rem, 100%)`,
          border: "0.1rem solid rgba(51, 51, 51, 0.1)",
          boxShadow: "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
          fieldSet: {
            border: "none",
            padding: "1rem 1rem 1rem 1rem",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "none",
          width: `min(${MIN_WIDTH}rem, 100%)`,
          transition: "0.15s all ease-in-out",
        },
      },
    },

    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          border: "none",
          width: `min(${MIN_WIDTH}rem, 100%)`,
          transition: "0.15s all ease-in-out",

          input: {
            padding: "1rem 1rem 1rem 1rem",
            boxShadow: "0px 0px 7px 0px rgba(51, 51, 51, 0.1)",
          },

          "&:hover": {
            border: "none",
          },

          "&:hover::before": {
            background: "none",
            border: "none",
          },
          "&:hover::after": {
            background: "none",
            border: "none",
          },
          "&:after": {
            border: "none",
          },

          "&:before": {
            border: "none",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          width: `min(${MIN_WIDTH}rem, 100%)`,
          border: "none",

          transition: "0.15s all ease-in-out",
          input: {
            border: "none",
            borderRadius: "0",
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        container: {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(8px)",
          maxWidth: "100vw",
        },
        root: {
          maxWidth: "100vw",
          flexWrap: "wrap",
        },

        paper: {
          margin: "0rem",
          padding: "0.25rem",
          maxHeight: "calc(100vh - 8rem)",
          minWidth: "min(50rem, calc(100vw - 0.25rem))",
          maxWidth: "100vw",
          overflow: "visible",
          "@media (max-width: 1120px)": {
            marginTop: "0rem",
            marginBottom: "4rem",
            width: "calc(100vw - 0.25rem)",
          },
          "@media (min-width: 1121px)": {
            marginBottom: "0rem",
            marginTop: "4rem",
            width: "min(50rem, calc(100vw - 0.25rem))",
          },
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          width: "min(50rem, calc(100% - 0.75rem))",
          maxWidth: "min(50rem, calc(100% - 0.75rem))",
          "@media (max-width: 1120px)": {
            padding: "0.25rem",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "large",
        },
      },
    },
  },
});
