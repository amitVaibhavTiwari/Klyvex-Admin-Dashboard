import React from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Divider,
    Button,
    Stack,
} from "@mui/material";
import { FiMoreVertical, FiFilter } from "react-icons/fi";

const recentOrders = [
    {
        id: "#12548",
        customer: "John Doe",
        amount: 245.3,
        status: "completed",
        avatar: "JD",
        time: "2 min ago",
    },
    {
        id: "#12547",
        customer: "Jane Smith",
        amount: 189.5,
        status: "processing",
        avatar: "JS",
        time: "5 min ago",
    },
    {
        id: "#12546",
        customer: "Mike Johnson",
        amount: 99.99,
        status: "shipped",
        avatar: "MJ",
        time: "10 min ago",
    },
    {
        id: "#12545",
        customer: "Sarah Wilson",
        amount: 320.75,
        status: "pending",
        avatar: "SW",
        time: "15 min ago",
    },
    {
        id: "#12544",
        customer: "Tom Brown",
        amount: 156.2,
        status: "completed",
        avatar: "TB",
        time: "30 min ago",
    },
];

const RecentOrders = () => {
    return (
        <Grid item xs={12} lg={8}>
            <Card>
                <CardContent>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                    >
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
                                        "&:hover": { bgcolor: "action.hover", borderRadius: 1 },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={(theme) => ({
                                                backgroundColor: theme.palette.primary.main,
                                            })}
                                        >
                                            {order.avatar}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Typography variant="body1" fontWeight={600}>
                                                    {order.customer}
                                                </Typography>
                                                <Typography variant="h6" fontWeight={700}>
                                                    ${order.amount}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                mt={0.5}
                                            >
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
    );
};

export default RecentOrders;

const OrderStatusChip = ({ status }: any) => {
    const getStatusColor = (status: any) => {
        switch (status) {
            case "completed":
                return { bg: "#22c55e", text: "#ffffff" };
            case "processing":
                return { bg: "#f59e0b", text: "#ffffff" };
            case "shipped":
                return { bg: "#3b82f6", text: "#ffffff" };
            case "pending":
                return { bg: "#6b7280", text: "#ffffff" };
            default:
                return { bg: "#6b7280", text: "#ffffff" };
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
                textTransform: "capitalize",
            }}
        />
    );
};
