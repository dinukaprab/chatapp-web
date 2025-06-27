import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

const SnackbarContext = createContext();
const slideTransition = (props) => <Slide {...props} direction="left" />;

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "info",
    });

    const showSnackbar = useCallback((message, severity = "info") => {
        setSnack({ open: true, message, severity });
    }, []);

    const handleClose = () => {
        setSnack((prev) => ({ ...prev, open: false }));
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={snack.open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                TransitionComponent={slideTransition}
            >
                <Alert
                    onClose={handleClose}
                    severity={snack.severity}
                    variant="filled"
                    sx={(theme) => {
                        const color = theme.palette[snack.severity].main;
                        return {
                            width: "100%",
                            backgroundColor: color + "22",
                            border: `1px solid ${color}`,
                            color: color,
                            fontWeight: 500,
                            backdropFilter: "blur(4px)",
                            "& .MuiAlert-icon": {
                                color: color,
                            },
                        };
                    }}
                >
                    {snack.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
