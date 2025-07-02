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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    FiFilter,
    FiDownload,
    FiEye,
    FiEdit,
    FiSearch,
    FiUsers,
    FiUserPlus,
    FiShield,
    FiSettings,
    FiMoreVertical,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiClock,
    FiTrash2,
    FiLock,
    FiUnlock,
    FiKey
} from 'react-icons/fi';

// TypeScript interfaces
interface Permission {
    id: string;
    name: string;
    description: string;
}

interface PermissionGroup {
    id: string;
    name: string;
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    permissions: Permission[];
}

interface StaffMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    role: string;
    permissionGroup: PermissionGroup;
    status: 'Active' | 'Inactive' | 'Pending';
    joinDate: string;
    lastLogin: string;
    location: string;
    department: string;
}

interface InviteFormData {
    name: string;
    email: string;
    permissionGroupId: string;
}

// Mock permission groups data
const permissionGroups: PermissionGroup[] = [
    {
        id: 'admin',
        name: 'Administrator',
        color: 'error',
        permissions: [
            { id: 'all', name: 'Full Access', description: 'Complete system access' }
        ]
    },
    {
        id: 'manager',
        name: 'Manager',
        color: 'warning',
        permissions: [
            { id: 'orders', name: 'Order Management', description: 'View and manage orders' },
            { id: 'customers', name: 'Customer Management', description: 'View and manage customers' },
            { id: 'reports', name: 'Reports', description: 'Access to reports and analytics' },
            { id: 'staff_view', name: 'Staff View', description: 'View staff members' }
        ]
    },
    {
        id: 'sales',
        name: 'Sales Team',
        color: 'success',
        permissions: [
            { id: 'orders_view', name: 'View Orders', description: 'View order information' },
            { id: 'customers_manage', name: 'Customer Support', description: 'Manage customer inquiries' },
            { id: 'products_view', name: 'View Products', description: 'View product catalog' }
        ]
    },
    {
        id: 'support',
        name: 'Support Team',
        color: 'info',
        permissions: [
            { id: 'customers_support', name: 'Customer Support', description: 'Handle customer support' },
            { id: 'orders_view', name: 'View Orders', description: 'View order status' },
            { id: 'refunds', name: 'Process Refunds', description: 'Handle refund requests' }
        ]
    },
    {
        id: 'viewer',
        name: 'Viewer',
        color: 'secondary',
        permissions: [
            { id: 'dashboard_view', name: 'Dashboard View', description: 'View dashboard only' },
            { id: 'reports_view', name: 'View Reports', description: 'View basic reports' }
        ]
    }
];

// Mock staff members data
const staffMembers: StaffMember[] = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@company.com',
        phone: '+1 (555) 123-4567',
        role: 'System Administrator',
        permissionGroup: permissionGroups[0],
        status: 'Active',
        joinDate: '2022-01-15',
        lastLogin: '2024-06-08',
        location: 'New York, NY',
        department: 'IT'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+1 (555) 234-5678',
        role: 'Operations Manager',
        permissionGroup: permissionGroups[1],
        status: 'Active',
        joinDate: '2022-03-22',
        lastLogin: '2024-06-08',
        location: 'Los Angeles, CA',
        department: 'Operations'
    },
    {
        id: 3,
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        phone: '+1 (555) 345-6789',
        role: 'Sales Representative',
        permissionGroup: permissionGroups[2],
        status: 'Active',
        joinDate: '2023-05-10',
        lastLogin: '2024-06-07',
        location: 'Chicago, IL',
        department: 'Sales'
    },
    {
        id: 4,
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@company.com',
        phone: '+1 (555) 456-7890',
        role: 'Customer Support Lead',
        permissionGroup: permissionGroups[3],
        status: 'Active',
        joinDate: '2023-02-18',
        lastLogin: '2024-06-07',
        location: 'Miami, FL',
        department: 'Support'
    },
    {
        id: 5,
        name: 'David Wilson',
        email: 'david.wilson@company.com',
        phone: '+1 (555) 567-8901',
        role: 'Sales Manager',
        permissionGroup: permissionGroups[1],
        status: 'Inactive',
        joinDate: '2022-08-30',
        lastLogin: '2024-05-20',
        location: 'Seattle, WA',
        department: 'Sales'
    },
    {
        id: 6,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        phone: '+1 (555) 678-9012',
        role: 'Data Analyst',
        permissionGroup: permissionGroups[4],
        status: 'Active',
        joinDate: '2023-11-05',
        lastLogin: '2024-06-06',
        location: 'Austin, TX',
        department: 'Analytics'
    },
    {
        id: 7,
        name: 'Robert Taylor',
        email: 'robert.taylor@company.com',
        phone: '+1 (555) 789-0123',
        role: 'Support Specialist',
        permissionGroup: permissionGroups[3],
        status: 'Pending',
        joinDate: '2024-06-01',
        lastLogin: 'Never',
        location: 'Boston, MA',
        department: 'Support'
    }
];

const getStatusColor = (status: string): 'success' | 'error' | 'warning' => {
    const colors = {
        Active: 'success',
        Inactive: 'error',
        Pending: 'warning'
    };
    return colors[status as keyof typeof colors] || 'success';
};

const formatDate = (dateString: string): string => {
    if (dateString === 'Never') return dateString;
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const getLastLoginStatus = (lastLogin: string): { text: string; color: string } => {
    if (lastLogin === 'Never') return { text: 'Never', color: 'text.secondary' };

    const loginDate = new Date(lastLogin);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 0) return { text: 'Today', color: 'success.main' };
    if (diffDays === 1) return { text: 'Yesterday', color: 'warning.main' };
    if (diffDays <= 7) return { text: `${diffDays} days ago`, color: 'warning.main' };
    return { text: `${diffDays} days ago`, color: 'error.main' };
};

export default function StaffPage(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
    const [inviteForm, setInviteForm] = useState<InviteFormData>({
        name: '',
        email: '',
        permissionGroupId: ''
    });

    const stats = {
        totalStaff: staffMembers.length,
        activeStaff: staffMembers.filter(s => s.status === 'Active').length,
        pendingInvites: staffMembers.filter(s => s.status === 'Pending').length,
        departments: new Set(staffMembers.map(s => s.department)).size
    };

    const handleInviteSubmit = (): void => {
        console.log('Sending invite:', inviteForm);
        // Here you would typically send the invite via API
        alert(`Invite sent to ${inviteForm.email} with ${permissionGroups.find(g => g.id === inviteForm.permissionGroupId)?.name} permissions!`);
        setInviteModalOpen(false);
        setInviteForm({ name: '', email: '', permissionGroupId: '' });
    };

    const handleInviteFormChange = (field: keyof InviteFormData, value: string): void => {
        setInviteForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
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
                            Staff Management
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary'
                            }}
                        >
                            Manage team members, roles, and permissions
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<FiUserPlus />}
                        onClick={() => setInviteModalOpen(true)}
                        size="large"
                        sx={{
                            bgcolor: 'primary.main',
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        Invite Staff
                    </Button>
                </Box>
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
                                    {stats.totalStaff}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Total Staff
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
                                <FiShield size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="text.primary">
                                    {stats.activeStaff}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Active Members
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
                                <FiClock size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="text.primary">
                                    {stats.pendingInvites}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Pending Invites
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
                                <FiSettings size={24} />
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="text.primary">
                                    {stats.departments}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Departments
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Main Staff Panel */}
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
                                Team Directory
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                {staffMembers.length} team members
                            </Typography>
                        </Box>
                        <Badge badgeContent={stats.pendingInvites} color="warning">
                            <Box sx={{
                                bgcolor: 'primary.dark',
                                borderRadius: 1,
                                p: 1
                            }}>
                                <FiKey size={20} />
                            </Box>
                        </Badge>
                    </Box>

                    {/* Filters */}
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                    >
                        <TextField
                            placeholder="Search staff members..."
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
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
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
                                <MenuItem value="all">All Roles</MenuItem>
                                {permissionGroups.map(group => (
                                    <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                                ))}
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
                                <MenuItem value="Pending">Pending</MenuItem>
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

                {/* Staff Table */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                bgcolor: 'background.default',
                                '& .MuiTableCell-head': {
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    py: 2
                                }
                            }}>
                                <TableCell>Staff Member</TableCell>
                                <TableCell>Contact & Location</TableCell>
                                <TableCell>Role & Permissions</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Last Login</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {staffMembers.map((staff) => {
                                const lastLoginStatus = getLastLoginStatus(staff.lastLogin);
                                return (
                                    <TableRow
                                        key={staff.id}
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
                                                <Avatar
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        bgcolor: 'primary.main',
                                                        mr: 2
                                                    }}
                                                >
                                                    {staff.name.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body1" fontWeight="600" sx={{ mb: 0.5 }}>
                                                        {staff.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {staff.role}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        <TableCell>
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                    <FiMail size={14} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {staff.email}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                    <FiPhone size={14} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {staff.phone}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <FiMapPin size={14} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {staff.location}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        <TableCell>
                                            <Box>
                                                <Chip
                                                    label={staff.permissionGroup.name}
                                                    color={staff.permissionGroup.color}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ mb: 1 }}
                                                />
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                    {staff.permissionGroup.permissions.length} permissions
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell>
                                            <Chip
                                                label={staff.status}
                                                color={getStatusColor(staff.status)}
                                                size="small"
                                                variant="filled"
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {staff.department}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Since {formatDate(staff.joinDate)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <FiClock size={14} />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: lastLoginStatus.color }}
                                                >
                                                    {lastLoginStatus.text}
                                                </Typography>
                                            </Box>
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
                                                <Tooltip title="Edit Permissions">
                                                    <IconButton
                                                        size="small"
                                                        color="warning"
                                                    >
                                                        <FiKey size={16} />
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
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Footer */}
                <Box sx={{
                    p: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.default'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Showing 1-{staffMembers.length} of {staffMembers.length} staff members
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

            {/* Invite Staff Modal */}
            <Dialog
                open={inviteModalOpen}
                onClose={() => setInviteModalOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FiUserPlus size={20} />
                        Invite New Staff Member
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            autoFocus
                            margin="normal"
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            value={inviteForm.name}
                            onChange={(e) => handleInviteFormChange('name', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={inviteForm.email}
                            onChange={(e) => handleInviteFormChange('email', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Permission Group</InputLabel>
                            <Select
                                value={inviteForm.permissionGroupId}
                                label="Permission Group"
                                onChange={(e) => handleInviteFormChange('permissionGroupId', e.target.value)}
                            >
                                {permissionGroups.map((group) => (
                                    <MenuItem key={group.id} value={group.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Chip
                                                label={group.name}
                                                color={group.color}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                ({group.permissions.length} permissions)
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {inviteForm.permissionGroupId && (
                            <Box sx={{
                                bgcolor: 'background.default',
                                p: 2,
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'grey.200'
                            }}>
                                <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
                                    Permissions included:
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {permissionGroups
                                        .find(g => g.id === inviteForm.permissionGroupId)
                                        ?.permissions.map((permission) => (
                                            <Box key={permission.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <FiShield size={14} />
                                                <Typography variant="body2">
                                                    <strong>{permission.name}</strong> - {permission.description}
                                                </Typography>
                                            </Box>
                                        ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 1 }}>
                    <Button
                        onClick={() => setInviteModalOpen(false)}
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleInviteSubmit}
                        variant="contained"
                        disabled={!inviteForm.name || !inviteForm.email || !inviteForm.permissionGroupId}
                        startIcon={<FiMail />}
                    >
                        Send Invite
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}