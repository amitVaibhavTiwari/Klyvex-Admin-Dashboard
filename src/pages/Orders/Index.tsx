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
  LinearProgress,
  Fade,
  Divider
} from '@mui/material';
import {
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
  FiSearch,
  FiTrendingUp,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
  FiMoreVertical,
  FiClock,
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiRotateCcw,
  FiCalendar,
  FiCreditCard,
  FiMapPin,
  FiStar
} from 'react-icons/fi';

// Enhanced mock data
const orders = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@gmail.com',
      avatar: '/api/placeholder/40/40',
      tier: 'Premium'
    },
    date: '2024-06-08',
    status: 'delivered',
    total: 1299.99,
    items: 3,
    paymentMethod: 'Visa **** 4532',
    shippingAddress: 'New York, NY',
    progress: 100
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    customer: {
      name: 'Michael Chen',
      email: 'michael.chen@outlook.com',
      avatar: '/api/placeholder/40/40',
      tier: 'Gold'
    },
    date: '2024-06-08',
    status: 'processing',
    total: 899.50,
    items: 2,
    paymentMethod: 'PayPal',
    shippingAddress: 'Los Angeles, CA',
    progress: 45
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    customer: {
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@yahoo.com',
      avatar: '/api/placeholder/40/40',
      tier: 'Silver'
    },
    date: '2024-06-07',
    status: 'shipped',
    total: 459.99,
    items: 1,
    paymentMethod: 'Mastercard **** 8901',
    shippingAddress: 'Chicago, IL',
    progress: 75
  },
  {
    id: 4,
    orderNumber: 'ORD-2024-004',
    customer: {
      name: 'David Thompson',
      email: 'david.thompson@gmail.com',
      avatar: '/api/placeholder/40/40',
      tier: 'Premium'
    },
    date: '2024-06-07',
    status: 'pending',
    total: 2199.00,
    items: 5,
    paymentMethod: 'Apple Pay',
    shippingAddress: 'Miami, FL',
    progress: 15
  },
  {
    id: 5,
    orderNumber: 'ORD-2024-005',
    customer: {
      name: 'Jessica Williams',
      email: 'jessica.williams@hotmail.com',
      avatar: '/api/placeholder/40/40',
      tier: 'Gold'
    },
    date: '2024-06-06',
    status: 'cancelled',
    total: 679.99,
    items: 2,
    paymentMethod: 'Google Pay',
    shippingAddress: 'Seattle, WA',
    progress: 0
  },
  {
    id: 6,
    orderNumber: 'ORD-2024-006',
    customer: {
      name: 'Alex Kim',
      email: 'alex.kim@gmail.com',
      avatar: '/api/placeholder/40/40',
      tier: 'Silver'
    },
    date: '2024-06-06',
    status: 'delivered',
    total: 329.99,
    items: 1,
    paymentMethod: 'Visa **** 1234',
    shippingAddress: 'Austin, TX',
    progress: 100
  },
  {
    id: 7,
    orderNumber: 'ORD-2024-007',
    customer: {
      name: 'Rachel Davis',
      email: 'rachel.davis@outlook.com',
      avatar: '/api/placeholder/40/40',
      tier: 'Premium'
    },
    date: '2024-06-05',
    status: 'processing',
    total: 1599.99,
    items: 4,
    paymentMethod: 'Amex **** 9876',
    shippingAddress: 'Boston, MA',
    progress: 30
  }
];

const getStatusIcon = (status) => {
  const icons = {
    pending: <FiClock size={16} />,
    processing: <FiPackage size={16} />,
    shipped: <FiRotateCcw size={16} />,
    delivered: <FiCheckCircle size={16} />,
    cancelled: <FiXCircle size={16} />,
    refunded: <FiAlertCircle size={16} />
  };
  return icons[status];
};

const getStatusColor = (status) => {
  const colors = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'error',
    refunded: 'secondary'
  };
  return colors[status] || 'default';
};

const getTierIcon = (tier) => {
  if (tier === 'Premium') return <FiStar size={12} />;
  if (tier === 'Gold') return <FiStar size={12} />;
  return <FiStar size={12} />;
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

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const stats = {
    totalRevenue: 8464.46,
    totalOrders: 7,
    avgOrderValue: 1209.21,
    uniqueCustomers: 7
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
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
          Orders Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 3
          }}
        >
          Manage and track all your orders efficiently
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
                bgcolor: 'primary.main',
                borderRadius: 2,
                p: 1.5,
                display: 'flex',
                mr: 2,
                color: 'white'
              }}>
                <FiShoppingCart size={24} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  {stats.totalOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Orders
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
                  {formatCurrency(stats.avgOrderValue)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Order Value
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
                <FiUsers size={24} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  {stats.uniqueCustomers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Customers
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Orders Panel */}
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
                Recent Orders
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {orders.length} orders found
              </Typography>
            </Box>
            <Badge badgeContent={3} color="error">
              <Box sx={{
                bgcolor: 'primary.dark',
                borderRadius: 1,
                p: 1
              }}>
                <FiPackage size={20} />
              </Box>
            </Badge>
          </Box>

          {/* Filters */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
          >
            <TextField
              placeholder="Search orders, customers..."
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

            <FormControl sx={{ minWidth: 150 }}>
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
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="shipped">Shipped</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
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

        {/* Orders Table */}
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
                <TableCell>Order Details</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={order.id}
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
                    <Box>
                      <Typography variant="body1" fontWeight="600" sx={{ mb: 0.5 }}>
                        {order.orderNumber}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FiCalendar size={14} color="gray" />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(order.date)}
                        </Typography>
                        <Chip
                          label={`${order.items} items`}
                          size="small"
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ position: 'relative', mr: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'primary.main'
                          }}
                        >
                          {order.customer.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        {order.customer.tier === 'Premium' && (
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
                            {getTierIcon(order.customer.tier)}
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Typography variant="body1" fontWeight="600" sx={{ mb: 0.5 }}>
                          {order.customer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {order.customer.email}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <FiMapPin size={12} />
                          <Typography variant="caption" color="text.secondary">
                            {order.shippingAddress}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      color={getStatusColor(order.status)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Box sx={{ width: 100 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="caption" fontWeight="600">
                          {order.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={order.progress}
                        color={order.progress === 100 ? 'success' : 'primary'}
                        sx={{ height: 6, borderRadius: 1 }}
                      />
                    </Box>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 0.5 }}>
                      {formatCurrency(order.total)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.customer.tier} Customer
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FiCreditCard size={16} />
                      <Typography variant="body2" color="text.secondary">
                        {order.paymentMethod}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          color="primary"
                        >
                          <FiEye size={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Order">
                        <IconButton
                          size="small"
                          color="secondary"
                        >
                          <FiEdit size={16} />
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
              Showing 1-{orders.length} of {orders.length} orders
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