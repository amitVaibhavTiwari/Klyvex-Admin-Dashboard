import { Box, Container, Grid } from "@mui/material";
import RecentOrders from "./components/RecentOrders";
import TopProducts from "./components/TopProducts";
import SalesChart from "./components/SalesChart";
import SalesCategory from "./components/SalesCategory";
import Stats from "./components/Stats";
import Header from "./components/Header";

const Landing = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                minHeight: "100vh",
                py: 3,
            }}
        >
            <Container maxWidth="xl">
                <Header />
                <Stats />

                {/* charts Row */}
                <Grid container spacing={3} mb={4}>
                    <SalesChart />
                    <SalesCategory />
                </Grid>

                {/* bottom Row */}
                <Grid container spacing={3}>
                    <RecentOrders />
                    <TopProducts />
                </Grid>
            </Container>
        </Box>
    );
};

export default Landing;
