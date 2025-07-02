import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
} from "@mui/material";
import {
    FiShoppingCart,
    FiUsers,
    FiDollarSign,
    FiPackage,
    FiArrowUp,
    FiArrowDown,
} from "react-icons/fi";

const Stats = () => {
    return (
        <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                    title="Total Revenue"
                    value="$54,239"
                    change={12.5}
                    icon={FiDollarSign}
                    color="#6366f1"
                    subtitle="Last 30 days"
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                    title="Total Orders"
                    value="1,426"
                    change={8.2}
                    icon={FiShoppingCart}
                    color="#14b8a6"
                    subtitle="Last 30 days"
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                    title="Total Customers"
                    value="9,721"
                    change={-2.1}
                    icon={FiUsers}
                    color="#f59e0b"
                    subtitle="Active users"
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                    title="Products"
                    value="856"
                    change={15.8}
                    icon={FiPackage}
                    color="#ef4444"
                    subtitle="In inventory"
                />
            </Grid>
        </Grid>
    );
};

export default Stats;

const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    color,
    subtitle,
}: any) => {
    const isPositive = change > 0;

    return (
        <Card
            sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                border: `1px solid ${color}20`,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 24px ${color}20`,
                },
            }}
        >
            <CardContent>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    <Box>
                        <Typography
                            color="text.secondary"
                            gutterBottom
                            variant="body2"
                            fontWeight={500}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="h4"
                            component="div"
                            fontWeight={700}
                            color={color}
                        >
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Avatar
                        sx={{
                            bgcolor: color,
                            width: 56,
                            height: 56,
                            boxShadow: `0 8px 16px ${color}30`,
                        }}
                    >
                        <Icon size={28} />
                    </Avatar>
                </Box>

                <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                    {isPositive ? (
                        <FiArrowUp size={16} color="#22c55e" />
                    ) : (
                        <FiArrowDown size={16} color="#ef4444" />
                    )}
                    <Typography
                        variant="body2"
                        sx={{
                            ml: 0.5,
                            color: isPositive ? "#22c55e" : "#ef4444",
                            fontWeight: 600,
                        }}
                    >
                        {Math.abs(change)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        vs last month
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
