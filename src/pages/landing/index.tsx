
import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    IconButton,
    Badge,
    Divider,
    Button,
    Stack,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    FiTrendingUp,
    FiTrendingDown,
    FiShoppingCart,
    FiUsers,
    FiDollarSign,
    FiPackage,
    FiBell,
    FiMoreVertical,
    FiArrowUp,
    FiArrowDown,
    FiCircle,
    FiEye,
    FiEdit,
    FiTrash2,
    FiFilter,
    FiDownload,
    FiRefreshCw,
    FiStar,
    FiHeart,
    FiMessageCircle,
    FiShare2
} from 'react-icons/fi';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from 'recharts';

// Sample data
const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 198 },
    { name: 'Mar', sales: 5000, orders: 300 },
    { name: 'Apr', sales: 4500, orders: 270 },
    { name: 'May', sales: 6000, orders: 350 },
    { name: 'Jun', sales: 5500, orders: 320 },
    { name: 'Jul', sales: 7000, orders: 410 }
];

const categoryData = [
    { name: 'Electronics', value: 35, color: '#6366f1' },
    { name: 'Clothing', value: 25, color: '#14b8a6' },
    { name: 'Books', value: 20, color: '#f59e0b' },
    { name: 'Home & Garden', value: 20, color: '#ef4444' }
];

const recentOrders = [
    { id: '#12548', customer: 'John Doe', amount: 245.30, status: 'completed', avatar: 'JD', time: '2 min ago' },
    { id: '#12547', customer: 'Jane Smith', amount: 189.50, status: 'processing', avatar: 'JS', time: '5 min ago' },
    { id: '#12546', customer: 'Mike Johnson', amount: 99.99, status: 'shipped', avatar: 'MJ', time: '10 min ago' },
    { id: '#12545', customer: 'Sarah Wilson', amount: 320.75, status: 'pending', avatar: 'SW', time: '15 min ago' },
    { id: '#12544', customer: 'Tom Brown', amount: 156.20, status: 'completed', avatar: 'TB', time: '30 min ago' }
];

const topProducts = [
    { name: 'iPhone 15 Pro', sales: 1234, revenue: 1234000, trend: 12.5 },
    { name: 'MacBook Air M3', sales: 856, revenue: 856000, trend: 8.2 },
    { name: 'AirPods Pro', sales: 2145, revenue: 537250, trend: -2.1 },
    { name: 'iPad Air', sales: 645, revenue: 387000, trend: 15.8 }
];

const StatCard = ({ title, value, change, icon: Icon, color, subtitle }: any) => {
    const isPositive = change > 0;

    return (
        <Card
            sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                border: `1px solid ${color}20`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${color}20`,
                }
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                        <Typography color="text.secondary" gutterBottom variant="body2" fontWeight={500}>
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div" fontWeight={700} color={color}>
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Avatar
                        sx={{
                            bgcolor: color,
                            width: 56,
                            height: 56,
                            boxShadow: `0 8px 16px ${color}30`
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
                            color: isPositive ? '#22c55e' : '#ef4444',
                            fontWeight: 600
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

const OrderStatusChip = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return { bg: '#22c55e', text: '#ffffff' };
            case 'processing': return { bg: '#f59e0b', text: '#ffffff' };
            case 'shipped': return { bg: '#3b82f6', text: '#ffffff' };
            case 'pending': return { bg: '#6b7280', text: '#ffffff' };
            default: return { bg: '#6b7280', text: '#ffffff' };
        }
    };

    const colors = getStatusColor(status);

    return (
        <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
            sx={{
                bgcolor: colors.bg,
                color: colors.text,
                fontWeight: 600,
                textTransform: 'capitalize'
            }}
        />
    );
};

const Landing = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [timeRange, setTimeRange] = useState('7d');

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', py: 3 }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Box>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
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

                {/* Stats Cards */}
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

                {/* Charts Row */}
                <Grid container spacing={3} mb={4}>
                    {/* Sales Chart */}
                    <Grid item xs={12} lg={8}>
                        <Card sx={{ height: 400 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>
                                            Sales Analytics
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Revenue and orders over time
                                        </Typography>
                                    </Box>

                                    <Stack direction="row" spacing={1}>
                                        {['7d', '30d', '90d'].map((range) => (
                                            <Chip
                                                key={range}
                                                label={range}
                                                variant={timeRange === range ? 'filled' : 'outlined'}
                                                onClick={() => setTimeRange(range)}
                                                size="small"
                                                sx={{ cursor: 'pointer' }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>

                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={salesData}>
                                        <defs>
                                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" stroke="#64748b" />
                                        <YAxis stroke="#64748b" />
                                        <Tooltip
                                            contentStyle={{
                                                background: '#ffffff',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="sales"
                                            stroke="#6366f1"
                                            strokeWidth={3}
                                            fill="url(#salesGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Category Distribution */}
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
                                        <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
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
                </Grid>

                {/* Bottom Row */}
                <Grid container spacing={3}>
                    {/* Recent Orders */}
                    <Grid item xs={12} lg={8}>
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>
                                            Recent Orders
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Latest customer orders
                                        </Typography>
                                    </Box>

                                    <Stack direction="row" spacing={1}>
                                        <IconButton size="small">
                                            <FiFilter size={16} />
                                        </IconButton>
                                        <IconButton size="small">
                                            <FiMoreVertical size={16} />
                                        </IconButton>
                                    </Stack>
                                </Box>

                                <List>
                                    {recentOrders.map((order, index) => (
                                        <React.Fragment key={order.id}>
                                            <ListItem
                                                sx={{
                                                    px: 0,
                                                    '&:hover': { bgcolor: 'action.hover', borderRadius: 1 }
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: '#6366f1' }}>
                                                        {order.avatar}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                                            <Typography variant="body1" fontWeight={600}>
                                                                {order.customer}
                                                            </Typography>
                                                            <Typography variant="h6" fontWeight={700}>
                                                                ${order.amount}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {order.id}
                                                                </Typography>
                                                                <OrderStatusChip status={order.status} />
                                                            </Box>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {order.time}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                            {index < recentOrders.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>

                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Button variant="outlined" sx={{ borderRadius: 2 }}>
                                        View All Orders
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Top Products */}
                    <Grid item xs={12} lg={4}>
                        <Card sx={{ height: '100%' }}>
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
                                                            <Box display="flex" justifyContent="space-between" mb={0.5}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {product.sales} sales
                                                                </Typography>
                                                                <Box display="flex" alignItems="center">
                                                                    {product.trend > 0 ? (
                                                                        <FiTrendingUp size={14} color="#22c55e" />
                                                                    ) : (
                                                                        <FiTrendingDown size={14} color="#ef4444" />
                                                                    )}
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            ml: 0.5,
                                                                            color: product.trend > 0 ? '#22c55e' : '#ef4444',
                                                                            fontWeight: 600
                                                                        }}
                                                                    >
                                                                        {Math.abs(product.trend)}%
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={Math.min((product.sales / 2500) * 100, 100)}
                                                                sx={{
                                                                    height: 6,
                                                                    borderRadius: 3,
                                                                    backgroundColor: '#e2e8f0',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        borderRadius: 3,
                                                                        backgroundColor: '#6366f1'
                                                                    }
                                                                }}
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
                </Grid>
            </Container>
        </Box>
    );
};

export default Landing;
