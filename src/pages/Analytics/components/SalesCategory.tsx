import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { FiCircle } from "react-icons/fi";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const categoryData = [
    { name: "Electronics", value: 35, color: "#6366f1" },
    { name: "Clothing", value: 25, color: "#14b8a6" },
    { name: "Books", value: 20, color: "#f59e0b" },
    { name: "Home & Garden", value: 20, color: "#ef4444" },
];

const SalesCategory = () => {
    return (
        <Grid item xs={12} lg={4}>
            <Card sx={{ height: 400 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Sales by Category
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Product category breakdown
                    </Typography>

                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    <Box mt={2}>
                        {categoryData.map((item, index) => (
                            <Box
                                key={index}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                mb={1}
                            >
                                <Box display="flex" alignItems="center">
                                    <FiCircle size={12} color={item.color} />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        {item.name}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" fontWeight={600}>
                                    {item.value}%
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default SalesCategory;
