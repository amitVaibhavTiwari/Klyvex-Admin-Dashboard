import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
} from "@mui/material";
import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const topProducts = [
    { name: "iPhone 15 Pro", sales: 1234, revenue: 1234000, trend: 12.5 },
    { name: "MacBook Air M3", sales: 856, revenue: 856000, trend: 8.2 },
    { name: "AirPods Pro", sales: 2145, revenue: 537250, trend: -2.1 },
    { name: "iPad Air", sales: 645, revenue: 387000, trend: 15.8 },
];

const TopProducts = () => {
    return (
        <Grid item xs={12} lg={4}>
            <Card sx={{ height: "100%" }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Top Products
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Best performing products
                    </Typography>

                    <List>
                        {topProducts.map((product, index) => (
                            <React.Fragment key={product.name}>
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box mt={1}>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    mb={0.5}
                                                >
                                                    <Typography variant="body2" color="text.secondary">
                                                        {product.sales} sales
                                                    </Typography>
                                                    <Box display="flex" alignItems="center">
                                                        {product.trend > 0 ? (
                                                            <FiTrendingUp size={14} color="success.main" />
                                                        ) : (
                                                            <FiTrendingDown size={14} color="warning.dark" />
                                                        )}
                                                        <Typography
                                                            variant="body2"
                                                            sx={(theme) => ({
                                                                ml: 0.5,
                                                                color:
                                                                    product.trend > 0
                                                                        ? theme.palette.success.main
                                                                        : theme.palette.error.main,
                                                                fontWeight: 600,
                                                            })}
                                                        >
                                                            {Math.abs(product.trend)}%
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={Math.min((product.sales / 2500) * 100, 100)}
                                                    sx={(theme) => ({
                                                        height: 6,
                                                        borderRadius: 3,
                                                        backgroundColor: "#e2e8f0",
                                                        "& .MuiLinearProgress-bar": {
                                                            borderRadius: 3,
                                                            backgroundColor: theme.palette.primary.main,
                                                        },
                                                    })}
                                                />
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {index < topProducts.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="outlined" sx={{ borderRadius: 2 }}>
                            View All Products
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TopProducts;
