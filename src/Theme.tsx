// import { ThemeOptions, createTheme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#9B8AB4",
        },
        secondary: {
            main: "#45B0D2",
        },
        error: {
            main: "#BD4F4F",
        },
        warning: {
            main: "#FFD3B9",
        },
        background: {
            default: "#F2ECF8",
            paper: "#F2ECF8",
        },
    },
    spacing: 8,
    components: {
        MuiAppBar: {
            defaultProps: {
                sx: {
                    backgroundColor: "#1F232F",
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                sx: {
                    m: 1,
                },
            },
        },

        MuiCard: {
            defaultProps: {
                sx: {
                    backgroundColor: "#FFFFFF",
                    color: "#1F232F",
                    m: 2,
                    px: 2,
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                sx: {
                    mx: "auto",
                    p: 2,
                    component: "main",
                    justifyContent: "center",
                    alignItems: "center",
                    // display: "flex",
                },
                maxWidth: "md",
            },
        },
        MuiMenuItem: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiTypography: {
            defaultProps: {
                sx: {
                    color: "#1F232F",
                    px: 1,
                    m: 1,
                },
            },
        },
    },
});
