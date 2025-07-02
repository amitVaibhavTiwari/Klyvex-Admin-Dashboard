import React, { useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    IconButton,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Stack,
    Avatar,
    Tooltip,
    Card,
    CardContent,
    Grid,
    InputAdornment,
    Badge,
    LinearProgress
} from '@mui/material';
import {
    FiFilter,
    FiDownload,
    FiEye,
    FiEdit,
    FiSearch,
    FiUsers,
    FiShoppingBag,
    FiDollarSign,
    FiTrendingUp,
    FiMoreVertical,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiStar,
    FiUserPlus
} from 'react-icons/fi';

// Enhanced mock customer data
const customers = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@gmail.com',
        phone: '+1 (555) 123-4567',
        tier: 'Premium',
        status: 'Active',
        joinDate: '2023-03-15',
        location: 'New York, NY',
        totalOrders: 24,
        totalSpent: 3299.99,
        avgOrderValue: 137.50,
        lastOrder: '2024-06-08',
        tags: ['VIP', 'Frequent Buyer']
    },
    {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@outlook.com',
        phone: '+1 (555) 234-5678',
        tier: 'Gold',
        status: 'Active',
        joinDate: '2023-07-22',
        location: 'Los Angeles, CA',
        totalOrders: 18,
        totalSpent: 2199.50,
        avgOrderValue: 122.19,
        lastOrder: '2024-06-07',
        tags: ['Loyal Customer']
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@yahoo.com',
        phone: '+1 (555) 345-6789',
        tier: 'Silver',
        status: 'Active',
        joinDate: '2024-01-10',
        location: 'Chicago, IL',
        totalOrders: 8,
        totalSpent: 899.99,
        avgOrderValue: 112.50,
        lastOrder: '2024-06-06',
        tags: ['New Customer']
    },
    {
        id: 4,
        name: 'David Thompson',
        email: 'david.thompson@gmail.com',
        phone: '+1 (555) 456-7890',
        tier: 'Premium',
        status: 'Active',
        joinDate: '2022-11-05',
        location: 'Miami, FL',
        totalOrders: 32,
        totalSpent: 4599.00,
        avgOrderValue: 143.72,
        lastOrder: '2024-06-05',
        tags: ['VIP', 'High Value']
    },
    {
        id: 5,
        name: 'Jessica Williams',
        email: 'jessica.williams@hotmail.com',
        phone: '+1 (555) 567-8901',
        tier: 'Gold',
        status: 'Inactive',
        joinDate: '2023-09-18',
        location: 'Seattle, WA',
        totalOrders: 12,
        totalSpent: 1299.99,
        avgOrderValue: 108.33,
        lastOrder: '2024-04-15',
        tags: ['At Risk']
    },
    {
        id: 6,
        name: 'Alex Kim',
        email: 'alex.kim@gmail.com',
        phone: '+1 (555) 678-9012',
        tier: 'Silver',
        status: 'Active',
        joinDate: '2024-02-28',
        location: 'Austin, TX',
        totalOrders: 6,
        totalSpent: 679.99,
        avgOrderValue: 113.33,
        lastOrder: '2024-06-04',
        tags: ['Growing']
    },
    {
        id: 7,
        name: 'Rachel Davis',
        email: 'rachel.davis@outlook.com',
        phone: '+1 (555) 789-0123',
        tier: 'Premium',
        status: 'Active',
        joinDate: '2022-08-12',
        location: 'Boston, MA',
        totalOrders: 28,
        totalSpent: 3899.99,
        avgOrderValue: 139.29,
        lastOrder: '2024-06-03',
        tags: ['VIP', 'Brand Advocate']
    },
    {
        id: 8,
        name: 'Ryan Martinez',
        email: 'ryan.martinez@gmail.com',
        phone: '+1 (555) 890-1234',
        tier: 'Bronze',
        status: 'Active',
        joinDate: '2024-05-20',
        location: 'Denver, CO',
        totalOrders: 3,
        totalSpent: 299.99,
        avgOrderValue: 100.00,
        lastOrder: '2024-06-02',
        tags: ['New Customer']
    }
];

const getTierColor = (tier) => {
    const colors = {
        Premium: 'warning',
        Gold: 'secondary',
        Silver: 'info',
        Bronze: 'default'
    };
    return colors[tier] || 'default';
};

const getStatusColor = (status) => {
    const colors = {
        Active: 'success',
        Inactive: 'error',
        Pending: 'warning'
    };
    return colors[status] || 'default';
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [tierFilter, setTierFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const stats = {
        totalCustomers: customers.length,
        activeCustomers: customers.filter(c => c.status === 'Active').length,
        totalRevenue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0),
        avgLifetimeValue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.length
    };

    return (
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 1
                    }}
                >
                    Customer Management
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        mb: 3
                    }}
                >
                    Manage your customer relationships and track their journey
                </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        height: '120px',
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4,
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease'
                        }
                    }}>
                        <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{
                                bgcolor: 'primary.main',
                                borderRadius: 2,
                                p: 1.5,
                                display: 'flex',
                                mr: 2,
                                color: 'white'
                            }}>
                                <FiUsers size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="text.primary">
                                    {stats.totalCustomers}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Customers
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        height: '120px',
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4,
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease'
                        }
                    }}>
                        <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{
                                bgcolor: 'success.main',
                                borderRadius: 2,
                                p: 1.5,
                                display: 'flex',
                                mr: 2,
                                color: 'white'
                            }}>
                                <FiTrendingUp size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="text.primary">
                                    {stats.activeCustomers}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Active Customers
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        height: '120px',
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4,
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease'
                        }
                    }}>
                        <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{
                                bgcolor: 'info.main',
                                borderRadius: 2,
                                p: 1.5,
                                display: 'flex',
                                mr: 2,
                                color: 'white'
                            }}>
                                <FiDollarSign size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="text.primary">
                                    {formatCurrency(stats.totalRevenue)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Revenue
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        height: '120px',
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4,
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease'
                        }
                    }}>
                        <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{
                                bgcolor: 'warning.main',
                                borderRadius: 2,
                                p: 1.5,
                                display: 'flex',
                                mr: 2,
                                color: 'white'
                            }}>
                                <FiShoppingBag size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="text.primary">
                                    {formatCurrency(stats.avgLifetimeValue)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Avg Lifetime Value
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Main Customers Panel */}
            <Paper sx={{
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden'
            }}>
                {/* Header */}
                <Box sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    p: 3
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                                Customer Directory
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {customers.length} customers registered
                            </Typography>
                        </Box>
                        <Badge badgeContent={stats.activeCustomers} color="success">
                            <Box sx={{
                                bgcolor: 'primary.dark',
                                borderRadius: 1,
                                p: 1
                            }}>
                                <FiUserPlus size={20} />
                            </Box>
                        </Badge>
                    </Box>

                    {/* Filters */}
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                    >
                        <TextField
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSearch color="inherit" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                minWidth: 350,
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    color: 'inherit',
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                    '&.Mui-focused fieldset': { borderColor: 'rgba(255,255,255,0.7)' }
                                },
                                '& .MuiOutlinedInput-input::placeholder': {
                                    color: 'rgba(255,255,255,0.7)',
                                    opacity: 1
                                }
                            }}
                        />

                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                value={tierFilter}
                                onChange={(e) => setTierFilter(e.target.value)}
                                displayEmpty
                                sx={{
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    color: 'inherit',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(255,255,255,0.3)'
                                    },
                                    '& .MuiSvgIcon-root': { color: 'inherit' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(255,255,255,0.5)'
                                    }
                                }}
                            >
                                <MenuItem value="all">All Tiers</MenuItem>
                                <MenuItem value="Premium">Premium</MenuItem>
                                <MenuItem value="Gold">Gold</MenuItem>
                                <MenuItem value="Silver">Silver</MenuItem>
                                <MenuItem value="Bronze">Bronze</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                displayEmpty
                                sx={{
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    color: 'inherit',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(255,255,255,0.3)'
                                    },
                                    '& .MuiSvgIcon-root': { color: 'inherit' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(255,255,255,0.5)'
                                    }
                                }}
                            >
                                <MenuItem value="all">All Status</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            variant="outlined"
                            startIcon={<FiFilter />}
                            sx={{
                                borderColor: 'rgba(255,255,255,0.5)',
                                color: 'inherit',
                                '&:hover': {
                                    borderColor: 'rgba(255,255,255,0.8)',
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            Filters
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<FiDownload />}
                            sx={{
                                bgcolor: 'common.white',
                                color: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'grey.100'
                                }
                            }}
                        >
                            Export
                        </Button>
                    </Stack>
                </Box>

                {/* Customers Table */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                bgcolor: 'grey.50',
                                '& .MuiTableCell-head': {
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    py: 2
                                }
                            }}>
                                <TableCell>Customer</TableCell>
                                <TableCell>Contact Info</TableCell>
                                <TableCell>Tier & Status</TableCell>
                                <TableCell>Order Stats</TableCell>
                                <TableCell align="right">Lifetime Value</TableCell>
                                <TableCell>Last Activity</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer, index) => (
                                <TableRow
                                    key={customer.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'action.hover'
                                        },
                                        '& .MuiTableCell-root': {
                                            py: 2
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ position: 'relative', mr: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        bgcolor: 'primary.main'
                                                    }}
                                                >
                                                    {customer.name.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                {customer.tier === 'Premium' && (
                                                    <Box sx={{
                                                        position: 'absolute',
                                                        bottom: -2,
                                                        right: -2,
                                                        bgcolor: 'warning.main',
                                                        borderRadius: '50%',
                                                        p: 0.25,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: 2,
                                                        borderColor: 'background.paper'
                                                    }}>
                                                        <FiStar size={12} />
                                                    </Box>
                                                )}
                                            </Box>
                                            <Box>
                                                <Typography variant="body1" fontWeight="600" sx={{ mb: 0.5 }}>
                                                    {customer.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                    {customer.tags.map((tag, idx) => (
                                                        <Chip
                                                            key={idx}
                                                            label={tag}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.7rem', height: 20 }}
                                                        />
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <FiMail size={14} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {customer.email}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <FiPhone size={14} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {customer.phone}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <FiMapPin size={14} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {customer.location}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Stack spacing={1}>
                                            <Chip
                                                label={customer.tier}
                                                color={getTierColor(customer.tier)}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Chip
                                                label={customer.status}
                                                color={getStatusColor(customer.status)}
                                                size="small"
                                                variant="filled"
                                            />
                                        </Stack>
                                    </TableCell>

                                    <TableCell>
                                        <Box>
                                            <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                                                {customer.totalOrders} orders
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                                Avg: {formatCurrency(customer.avgOrderValue)}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min((customer.totalOrders / 30) * 100, 100)}
                                                color="primary"
                                                sx={{ height: 4, borderRadius: 1 }}
                                            />
                                        </Box>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Typography variant="h6" fontWeight="600" sx={{ mb: 0.5 }}>
                                            {formatCurrency(customer.totalSpent)}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Since {formatDate(customer.joinDate)}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <FiCalendar size={14} />
                                            <Typography variant="body2" color="text.secondary">
                                                {formatDate(customer.lastOrder)}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Last order
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Stack direction="row" spacing={0.5} justifyContent="center">
                                            <Tooltip title="View Profile">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <FiEye size={16} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Send Email">
                                                <IconButton
                                                    size="small"
                                                    color="info"
                                                >
                                                    <FiMail size={16} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="More Actions">
                                                <IconButton
                                                    size="small"
                                                >
                                                    <FiMoreVertical size={16} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Footer */}
                <Box sx={{
                    p: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                    bgcolor: 'grey.50'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Showing 1-{customers.length} of {customers.length} customers
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Button
                                size="small"
                                variant="outlined"
                                disabled
                            >
                                Previous
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                            >
                                1
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                disabled
                            >
                                Next
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}