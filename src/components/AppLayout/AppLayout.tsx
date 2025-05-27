import { useState, MouseEvent } from "react";
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    Collapse,
    Theme,
} from "@mui/material";
import {
    FiMenu,
    FiX,
    FiSettings,
    FiBell,
    FiUser,
    FiLogOut,
    FiChevronDown,
    FiChevronUp,
    FiSun,
} from "react-icons/fi";
import { useGlobalContext } from "../../lib/GlobalContext";
import { Outlet, useNavigate } from "react-router-dom";
import { RouteItem, routes } from "./Routes";

const drawerWidth = 260;
const collapsedWidth = 60;

interface AdminLayoutProps {
    children?: React.ReactNode;
    title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = "" }) => {
    const theme: Theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(!isMobile);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeRoute, setActiveRoute] = useState<string>("/");
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

    const { dispatch, theme: colorTheme } = useGlobalContext();
    const navigate = useNavigate()

    const handleDrawerToggle = () => setOpen(!open);
    const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);
    const handleThemeChange = () =>
        dispatch({
            type: "setTheme",
            payload: colorTheme === "dark" ? "light" : "dark",
        });

    const handleSubMenuClick = (index: number) => {
        if (!open) setOpen(true);
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    const handleRouteClick = (route: RouteItem, index: number) => {
        if (route.subRoutes) {
            handleSubMenuClick(index);
        } else {
            setActiveRoute(route.path || "/");
            navigate(route.path || "/")
            if (isMobile) setOpen(false);
        }
    };

    const isActiveRoute = (route: RouteItem) =>
        activeRoute === route.path ||
        route.subRoutes?.some((subRoute) => subRoute.path === activeRoute);

    const primaryColor = theme.palette.primary.main;
    const hoverBg = theme.palette.action.hover;
    const drawerBgActive = primaryColor;
    const drawerTextActive = theme.palette.primary.contrastText;
    const drawerInactiveText = theme.palette.text.primary;

    const drawer = (
        <Box
            sx={{
                width: open ? drawerWidth : collapsedWidth,
                transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                overflowX: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "space-between" : "center",
                    px: open ? 2 : 1,
                }}
            >
                {open && (
                    <Typography
                        variant="h3"
                        mt={1}
                        noWrap
                        component="div"
                        sx={{ color: theme.palette.text.primary, fontWeight: "900" }}
                    >
                        Klyvex
                    </Typography>
                )}
                <IconButton onClick={handleDrawerToggle} size="small">
                    {open ? <FiX size={20} /> : <FiMenu size={20} />}
                </IconButton>
            </Toolbar>
            <Divider />

            <Box sx={{ flex: 1, overflowY: "auto", px: open ? 2 : 1, py: 1 }}>
                <List>
                    {routes.map((route, index) => {
                        const active = isActiveRoute(route);
                        return (
                            <Box key={route.name}>
                                <ListItem disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton
                                        sx={{
                                            borderRadius: 2,
                                            minHeight: 48,
                                            justifyContent: open ? "initial" : "center",
                                            px: open ? 2 : 1.5,
                                            backgroundColor: active ? drawerBgActive : "transparent",
                                            color: active ? drawerTextActive : drawerInactiveText,
                                            "&:hover": {
                                                backgroundColor: active
                                                    ? theme.palette.primary.dark
                                                    : hoverBg,
                                            },
                                        }}
                                        onClick={() => handleRouteClick(route, index)}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 2 : "auto",
                                                justifyContent: "center",
                                                color: active ? drawerTextActive : drawerInactiveText,
                                            }}
                                        >
                                            <route.icon size={23} />
                                        </ListItemIcon>
                                        {open && (
                                            <>
                                                <ListItemText primary={route.name} />
                                                {route.subRoutes &&
                                                    (openSubMenu === index ? (
                                                        <FiChevronUp size={20} />
                                                    ) : (
                                                        <FiChevronDown size={20} />
                                                    ))}
                                            </>
                                        )}
                                    </ListItemButton>
                                </ListItem>

                                {route.subRoutes && open && (
                                    <Collapse
                                        in={openSubMenu === index}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            {route.subRoutes.map((subRoute) => (
                                                <ListItem
                                                    key={subRoute.path}

                                                    disablePadding
                                                    sx={{
                                                        borderLeft: `4px solid ${activeRoute === subRoute.path
                                                            ? drawerBgActive
                                                            : "transparent"
                                                            }`,
                                                        ml: 3.5,
                                                        mb: 0.25,
                                                    }}
                                                >
                                                    <ListItemButton

                                                        sx={{
                                                            borderRadius: 2,
                                                            py: 1,
                                                            backgroundColor: "transparent",
                                                            "&:hover": { backgroundColor: hoverBg },
                                                        }}
                                                        onClick={() => {
                                                            navigate(subRoute.path)
                                                            setActiveRoute(subRoute.path);
                                                            if (isMobile) setOpen(false);
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={subRoute.name}
                                                            sx={{
                                                                "& .MuiListItemText-primary": {
                                                                    fontSize: "0.875rem",
                                                                    fontWeight:
                                                                        activeRoute === subRoute.path ? 600 : 400,
                                                                },
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </Box>
                        );
                    })}
                </List>
            </Box>

            <Box sx={{ px: open ? 2 : 1, pb: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            borderRadius: 2,
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: open ? 2 : 1.5,
                            backgroundColor:
                                activeRoute === "/settings" ? drawerBgActive : "transparent",
                            color:
                                activeRoute === "/settings"
                                    ? drawerTextActive
                                    : drawerInactiveText,
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor:
                                    activeRoute === "/settings"
                                        ? theme.palette.primary.dark
                                        : hoverBg,
                            },
                        }}
                        onClick={() => {
                            setActiveRoute("/settings");
                            navigate("/settings")
                            if (isMobile) setOpen(false);
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 2 : "auto",
                                justifyContent: "center",
                                color:
                                    activeRoute === "/settings"
                                        ? drawerTextActive
                                        : drawerInactiveText,
                            }}
                        >
                            <FiSettings size={23} />
                        </ListItemIcon>
                        {open && <ListItemText primary="Settings" />}
                    </ListItemButton>
                </ListItem>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <AppBar
                position="fixed"
                sx={{
                    width: {
                        md: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
                    },
                    ml: { md: `${open ? drawerWidth : collapsedWidth}px` },
                    transition: theme.transitions.create(["width", "margin"]),
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: theme.shadows[1],
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <FiMenu size={20} />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, fontWeight: 600 }}
                    >
                        {title}
                    </Typography>
                    <IconButton
                        onClick={handleThemeChange}
                        color="inherit"
                        sx={{ mr: 1 }}
                    >
                        <FiSun size={20} />
                    </IconButton>
                    <IconButton color="inherit" sx={{ mr: 1 }}>
                        <Badge badgeContent={4} color="error">
                            <FiBell size={20} />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="profile-menu"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <FiUser size={16} />
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={handleProfileMenuClose}>
                            <ListItemIcon>
                                <FiUser size={16} />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>
                            <ListItemIcon>
                                <FiSettings size={16} />
                            </ListItemIcon>
                            Account Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleProfileMenuClose}>
                            <ListItemIcon>
                                <FiLogOut size={16} />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{
                    width: { md: open ? drawerWidth : collapsedWidth },
                    flexShrink: { md: 0 },
                }}
            >
                <Drawer
                    variant="temporary"
                    open={open && isMobile}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: open ? drawerWidth : collapsedWidth,
                            boxSizing: "border-box",
                            transition: theme.transitions.create("width"),
                            overflowX: "hidden",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    backgroundColor: theme.palette.background.default,
                    transition: theme.transitions.create("margin"),
                }}
            >
                <Toolbar />
                {children}
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
