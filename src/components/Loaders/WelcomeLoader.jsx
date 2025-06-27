import {
    Box,
    Card,
    CardMedia,
    Stack,
    Typography,
    LinearProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


export default function WelcomeLoader() {
    return (
        <Box
            sx={{
                backgroundColor: "#F1F1F2",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Card
                    sx={{
                        position: "relative",
                        width: 300,
                        height: 250,
                        boxShadow: "none",
                        backgroundColor: "transparent",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5
                    }}
                >
                    <CardMedia
                        sx={{
                            width: 100,
                            height: 75,
                            backgroundImage: 'url(/src/assets/images/transparent-call-application-icon.png)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Stack
                        sx={{
                            width: "70%",
                            opacity: "0.5"
                        }}
                    >
                        <LinearProgress color="inherit" />
                    </Stack>
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <LockOutlinedIcon sx={{ color: "#999999", fontSize: 14 }} />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: "#999999",
                                fontSize: 13,
                                maxWidth: "500px",
                                cursor: "default",
                                userSelect: "none",
                            }}
                        >
                            End-To-End Encrypted
                        </Typography>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}
