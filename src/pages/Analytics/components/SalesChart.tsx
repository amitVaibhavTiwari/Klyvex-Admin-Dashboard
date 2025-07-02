import { useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    useTheme,
} from "@mui/material";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const salesData = [
    { name: "Jan", sales: 4000, orders: 240 },
    { name: "Feb", sales: 3000, orders: 198 },
    { name: "Mar", sales: 5000, orders: 300 },
    { name: "Apr", sales: 4500, orders: 270 },
    { name: "May", sales: 6000, orders: 350 },
    { name: "Jun", sales: 5500, orders: 320 },
    { name: "Jul", sales: 7000, orders: 410 },
];
const SalesChart = () => {
    const theme = useTheme();
    const [timeRange, setTimeRange] = useState("7d");
    return (
        <Grid item xs={12} lg={8}>
            <Card sx={{ height: 400 }}>
                <CardContent>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                Sales Analytics
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Revenue and orders over time
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1}>
                            {["7d", "30d", "90d"].map((range) => (
                                <Chip
                                    key={range}
                                    label={range}
                                    variant={timeRange === range ? "filled" : "outlined"}
                                    onClick={() => setTimeRange(range)}
                                    size="small"
                                    sx={{ cursor: "pointer" }}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={salesData}>
                            <defs>
                                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={theme.palette.primary.dark}
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={theme.palette.primary.dark}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke={theme.palette.grey[600]} />
                            <YAxis stroke={theme.palette.grey[600]} />
                            <Tooltip
                                contentStyle={{
                                    background: "#ffffff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke={theme.palette.primary.main}
                                strokeWidth={3}
                                fill="url(#salesGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default SalesChart;
