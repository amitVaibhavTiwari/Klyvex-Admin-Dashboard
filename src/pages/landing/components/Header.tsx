import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import { FiDownload, FiRefreshCw } from "react-icons/fi";

const Header = () => {
    const theme = useTheme();
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
        >
            <Box>
                <Typography
                    sx={{ letterSpacing: ".5px" }}
                    color={theme.palette.text.primary}
                    variant="h1"
                    fontWeight={800}
                    gutterBottom
                >
                    Dashboard Overview
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome back! Here's what's happening with your store today.
                </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="outlined"
                    startIcon={<FiDownload size={16} />}
                    sx={{ borderRadius: 2 }}
                >
                    Export
                </Button>
                <Button
                    variant="contained"
                    startIcon={<FiRefreshCw size={16} />}
                    sx={{ borderRadius: 2 }}
                >
                    Refresh
                </Button>
            </Stack>
        </Box>
    );
};

export default Header;
