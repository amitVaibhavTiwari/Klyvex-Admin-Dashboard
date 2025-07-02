import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Avatar,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Tabs,
  Tab,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  FiUser, 
  FiLock, 
  FiBell, 
  FiMail, 
  FiShield, 
  FiSettings,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiCamera,
  FiSave,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiGlobe,
  FiSmartphone,
  FiCreditCard
} from 'react-icons/fi';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Corp',
    role: 'Administrator',
    bio: 'Full-stack developer with 5+ years of experience'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    orderUpdates: true,
    weeklyReports: true
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC-8',
    dateFormat: 'MM/DD/YYYY',
    theme: 'dark',
    currency: 'USD',
    itemsPerPage: 25
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordStrength: 85
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: string | number) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: boolean | number) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  return (
      <Box sx={{ 
        minHeight: '100vh', 
       backgroundColor:"background.default",
        p: 3 
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
              background: 'linear-gradient(45deg, #6366f1, #ec4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account settings and preferences
          </Typography>
        </Box>

        <Card sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
              <Tab icon={<FiUser />} label="Profile" />
              <Tab icon={<FiBell />} label="Notifications" />
              <Tab icon={<FiSettings />} label="Preferences" />
              <Tab icon={<FiShield />} label="Security" />
              <Tab icon={<FiCreditCard />} label="Billing" />
            </Tabs>
          </Box>

          {/* Profile Tab */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                      <Avatar
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          fontSize: '2rem',
                          background: 'linear-gradient(45deg, #6366f1, #ec4899)'
                        }}
                      >
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </Avatar>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          bgcolor: 'primary.main',
                          '&:hover': { bgcolor: 'primary.dark' }
                        }}
                        size="small"
                      >
                        <FiCamera />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {profileData.firstName} {profileData.lastName}
                    </Typography>
                    <Chip label={profileData.role} color="primary" size="small" />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          value={profileData.firstName}
                          onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          value={profileData.lastName}
                          onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Company"
                          value={profileData.company}
                          onChange={(e) => handleProfileChange('company', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Role"
                          value={profileData.role}
                          onChange={(e) => handleProfileChange('role', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Bio"
                          multiline
                          rows={3}
                          value={profileData.bio}
                          onChange={(e) => handleProfileChange('bio', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button variant="contained" startIcon={<FiSave />}>
                        Save Changes
                      </Button>
                      <Button variant="outlined" startIcon={<FiRefreshCw />}>
                        Reset
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Communication Preferences
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Email Notifications" 
                          secondary="Receive notifications via email"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.emailNotifications}
                            onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Push Notifications" 
                          secondary="Browser and mobile push notifications"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.pushNotifications}
                            onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="SMS Notifications" 
                          secondary="Text message notifications"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.smsNotifications}
                            onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Content Preferences
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Marketing Emails" 
                          secondary="Product updates and promotions"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.marketingEmails}
                            onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Security Alerts" 
                          secondary="Login attempts and security issues"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.securityAlerts}
                            onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Order Updates" 
                          secondary="Order status and shipping updates"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.orderUpdates}
                            onChange={(e) => handleNotificationChange('orderUpdates', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Weekly Reports" 
                          secondary="Analytics and performance reports"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.weeklyReports}
                            onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Preferences Tab */}
          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Localization
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Language</InputLabel>
                          <Select
                            value={preferences.language}
                            onChange={(e) => handlePreferenceChange('language', e.target.value)}
                          >
                            <MenuItem value="en">English</MenuItem>
                            <MenuItem value="es">Spanish</MenuItem>
                            <MenuItem value="fr">French</MenuItem>
                            <MenuItem value="de">German</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Timezone</InputLabel>
                          <Select
                            value={preferences.timezone}
                            onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                          >
                            <MenuItem value="UTC-8">Pacific Time (UTC-8)</MenuItem>
                            <MenuItem value="UTC-5">Eastern Time (UTC-5)</MenuItem>
                            <MenuItem value="UTC+0">Greenwich Mean Time (UTC+0)</MenuItem>
                            <MenuItem value="UTC+1">Central European Time (UTC+1)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Date Format</InputLabel>
                          <Select
                            value={preferences.dateFormat}
                            onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                          >
                            <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                            <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                            <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Display & Interface
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Theme</InputLabel>
                          <Select
                            value={preferences.theme}
                            onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                          >
                            <MenuItem value="light">Light</MenuItem>
                            <MenuItem value="dark">Dark</MenuItem>
                            <MenuItem value="auto">Auto</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Currency</InputLabel>
                          <Select
                            value={preferences.currency}
                            onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                          >
                            <MenuItem value="USD">USD ($)</MenuItem>
                            <MenuItem value="EUR">EUR (€)</MenuItem>
                            <MenuItem value="GBP">GBP (£)</MenuItem>
                            <MenuItem value="JPY">JPY (¥)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Items Per Page</InputLabel>
                          <Select
                            value={preferences.itemsPerPage}
                            onChange={(e) => handlePreferenceChange('itemsPerPage', e.target.value)}
                          >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel value={activeTab} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Authentication
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Password Strength
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={security.passwordStrength} 
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {security.passwordStrength}% Strong
                      </Typography>
                    </Box>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Two-Factor Authentication" 
                          secondary="Add extra security to your account"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={security.twoFactorEnabled}
                            onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Login Alerts" 
                          secondary="Get notified of new login attempts"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={security.loginAlerts}
                            onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                    <Box sx={{ mt: 2 }}>
                      <Button variant="outlined" startIcon={<FiLock />} fullWidth>
                        Change Password
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Session Management
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" gutterBottom>
                        Session Timeout (minutes)
                      </Typography>
                      <TextField
                        type="number"
                        value={security.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                        fullWidth
                        inputProps={{ min: 5, max: 120 }}
                      />
                    </Box>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Active sessions will automatically expire after the specified time of inactivity.
                    </Alert>
                    <Button variant="outlined" color="warning" fullWidth>
                      End All Other Sessions
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="error">
                      Danger Zone
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      These actions are irreversible. Please proceed with caution.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button variant="outlined" color="warning" startIcon={<FiDownload />}>
                        Export Data
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        startIcon={<FiTrash2 />}
                        onClick={() => setDeleteDialogOpen(true)}
                      >
                        Delete Account
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Billing Tab */}
          <TabPanel value={activeTab} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Current Plan
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Chip label="Pro Plan" color="primary" />
                      <Typography variant="h4" color="primary">
                        $29<Typography component="span" variant="body2" color="text.secondary">/month</Typography>
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Your subscription renews on July 15, 2025
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button variant="contained">Upgrade Plan</Button>
                      <Button variant="outlined">Cancel Subscription</Button>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ mt: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Payment Method
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <FiCreditCard size={24} />
                      <Box>
                        <Typography variant="body1">**** **** **** 4532</Typography>
                        <Typography variant="body2" color="text.secondary">Expires 12/26</Typography>
                      </Box>
                    </Box>
                    <Button variant="outlined" startIcon={<FiEdit3 />}>
                      Update Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Usage This Month
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        API Calls: 2,847 / 10,000
                      </Typography>
                      <LinearProgress variant="determinate" value={28.47} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Storage: 15.2 GB / 100 GB
                      </Typography>
                      <LinearProgress variant="determinate" value={15.2} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Users: 12 / 50
                      </Typography>
                      <LinearProgress variant="determinate" value={24} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Card>

        {/* Delete Account Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to delete your account? This action cannot be undone.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All your data, including orders, customers, and settings will be permanently removed.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" color="error">Delete Account</Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default SettingsPage;