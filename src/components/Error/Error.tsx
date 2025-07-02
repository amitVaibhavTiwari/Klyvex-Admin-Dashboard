import { useNavigate, useRouteError } from "react-router-dom";
import { PageChanger } from "../PageChanger/PageChanger";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosRefresh } from "react-icons/io";
import {
    Box,
    Button,
    Typography,
    useTheme,
    Stack
} from "@mui/material";

const Error = () => {
    const navigate = useNavigate();
    const err: any = useRouteError();
    const theme = useTheme();

    const is404 = err?.status === 404 || err?.status === "404";

    return (
        <PageChanger>
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.background.default,
                    px: 2,
                }}
            >
                <Stack
                    spacing={3}
                    alignItems="center"
                    maxWidth="600px"
                    width="100%"
                    textAlign="center"
                >
                    <Typography color="textPrimary" variant="h2" fontWeight={800}>
                        Uh Oh!
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                        {is404
                            ? "The page you are looking for is either missing or you assembled the link incorrectly."
                            : `Something went unexpectedly wrong. Refresh the page or try again later. If the problem continues, contact support.`}
                    </Typography>
                    {/* error image, will add later */}
                    {/* <Box
                        component="img"
                        src="/error.png"
                        alt="error-image"
                        sx={{
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    /> */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={is404 ? <FaArrowLeftLong /> : <IoIosRefresh />}
                        onClick={() => (is404 ? navigate("/") : location.reload())}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        {is404 ? "Go to Homepage" : "Refresh Page"}
                    </Button>
                </Stack>
            </Box>
        </PageChanger>
    );
};

export default Error;
