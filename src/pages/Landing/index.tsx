import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Avatar,
    Divider,
    Stack,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    FiPlus,
    FiPackage,
    FiHome,
    FiSettings,
    FiUsers,
    FiBarChart,
    FiShoppingCart,
    FiTruck,
    FiCreditCard,
    FiFileText,
    FiGithub,
    FiHelpCircle,
    FiExternalLink,
    FiStar,
    FiTrendingUp,
    FiZap,
} from "react-icons/fi";
import { useGlobalContext } from "../../lib/GlobalContext";

type QuickActionCard = {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    href?: string;
    onClick?: () => void;
};

type FooterLink = {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    external?: boolean;
};

const LandingPage: React.FC = ({ }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { user } = useGlobalContext();

    const quickActions: QuickActionCard[] = [
        {
            title: "Add Product",
            description: "Create new products and manage your inventory",
            icon: <FiPlus size={24} />,
            color: theme.palette.primary.main,
            href: "/products/add",
        },
        {
            title: "Manage Products",
            description: "View, edit and organize your product catalog",
            icon: <FiPackage size={24} />,
            color: theme.palette.success.main,
            href: "/products",
        },
        {
            title: "Add Warehouse",
            description: "Set up new warehouse locations and storage",
            icon: <FiHome size={24} />,
            color: theme.palette.warning.main,
            href: "/warehouses/add",
        },
        {
            title: "Manage Orders",
            description: "Process and track customer orders",
            icon: <FiShoppingCart size={24} />,
            color: theme.palette.info.main,
            href: "/orders",
        },
        {
            title: "Customer Management",
            description: "Handle customer accounts and relationships",
            icon: <FiUsers size={24} />,
            color: theme.palette.secondary.main,
            href: "/customers",
        },
        {
            title: "Shipping & Delivery",
            description: "Configure shipping options and track deliveries",
            icon: <FiTruck size={24} />,
            color: "#FF6B35",
            href: "/shipping",
        },
        {
            title: "Payment Settings",
            description: "Manage payment methods and transactions",
            icon: <FiCreditCard size={24} />,
            color: "#6C5CE7",
            href: "/payments",
        },
        {
            title: "Analytics",
            description: "View sales reports and business insights",
            icon: <FiBarChart size={24} />,
            color: "#00B894",
            href: "/analytics",
        },
        {
            title: "Storefront Settings",
            description: "Customize your online store appearance",
            icon: <FiSettings size={24} />,
            color: "#636E72",
            href: "/storefront",
        },
    ];

    const footerLinks: FooterLink[] = [
        {
            title: "Documentation",
            description: "Learn how to use all features",
            icon: <FiFileText size={20} />,
            href: "/docs",
            external: true,
        },
        {
            title: "GitHub Repository",
            description: "View source code and contribute",
            icon: <FiGithub size={20} />,
            href: "https://github.com/your-repo",
            external: true,
        },
        {
            title: "Report Issues",
            description: "Found a bug? Let us know",
            icon: <FiHelpCircle size={20} />,
            href: "/support",
            external: true,
        },
        {
            title: "API Reference",
            description: "Integrate with our API",
            icon: <FiZap size={20} />,
            href: "/api-docs",
            external: true,
        },
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box
                sx={{
                    background: theme.palette.primary.main,
                    color: "white",
                    py: { xs: 6, md: 8 },
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Typography
                            variant={isMobile ? "h4" : "h2"}
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                        >
                            Welcome back {user?.name}
                        </Typography>
                        <Typography
                            variant={isMobile ? "body1" : "h6"}
                            sx={{
                                opacity: 0.9,
                                maxWidth: 600,
                                mx: "auto",
                                lineHeight: 1.6,
                            }}
                        >
                            Manage your e-commerce business with ease. Everything you need is
                            just a click away.
                        </Typography>
                    </Box>

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <CardContent sx={{ textAlign: "center", color: "white" }}>
                                    <FiTrendingUp size={32} style={{ marginBottom: 8 }} />
                                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                                        $12.5K
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Revenue This Month
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <CardContent sx={{ textAlign: "center", color: "white" }}>
                                    <FiPackage size={32} style={{ marginBottom: 8 }} />
                                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                                        234
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Products Listed
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <CardContent sx={{ textAlign: "center", color: "white" }}>
                                    <FiShoppingCart size={32} style={{ marginBottom: 8 }} />
                                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                                        89
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Orders Today
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <CardContent sx={{ textAlign: "center", color: "white" }}>
                                    <FiStar size={32} style={{ marginBottom: 8 }} />
                                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                                        4.8
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Customer Rating
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        component="h2"
                        color="textPrimary"
                        gutterBottom
                        sx={{ fontWeight: 600, textAlign: "center" }}
                    >
                        Quick Actions
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ textAlign: "center", maxWidth: 600, mx: "auto" }}
                    >
                        Jump straight into the most common tasks and manage your business
                        efficiently
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {quickActions.map((action, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    height: "100%",
                                    transition: "all 0.3s ease-in-out",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: theme.shadows[8],
                                    },
                                }}
                            >
                                <CardActionArea sx={{ height: "100%", p: 0 }}>
                                    <CardContent
                                        sx={{
                                            p: 3,
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box
                                            sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                                        >
                                            <Avatar
                                                sx={{
                                                    backgroundColor: action.color,
                                                    color: "white",
                                                    mr: 2,
                                                    width: 48,
                                                    height: 48,
                                                }}
                                            >
                                                {action.icon}
                                            </Avatar>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        component="h3"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        {action.title}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ lineHeight: 1.5 }}
                                                >
                                                    {action.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Box
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    py: { xs: 4, md: 6 },
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            component="h2"
                            color="textPrimary"
                            gutterBottom
                            sx={{ fontWeight: 600, textAlign: "center" }}
                        >
                            Help & Resources
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ textAlign: "center", maxWidth: 600, mx: "auto" }}
                        >
                            Need help getting started? Check out our resources and community
                            support
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {footerLinks.map((link, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        transition: "all 0.2s ease-in-out",
                                        cursor: "pointer",
                                        border: `1px solid ${theme.palette.divider}`,
                                        "&:hover": {
                                            borderColor: theme.palette.primary.main,
                                            boxShadow: theme.shadows[4],
                                        },
                                    }}
                                >
                                    <CardActionArea sx={{ height: "100%" }}>
                                        <CardContent
                                            sx={{ p: 3, textAlign: "center", height: "100%" }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    mb: 2,
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: "white",
                                                        mr: link.external ? 1 : 0,
                                                    }}
                                                >
                                                    {link.icon}
                                                </Avatar>
                                                {link.external && (
                                                    <FiExternalLink
                                                        size={16}
                                                        style={{ marginLeft: 4, opacity: 0.7 }}
                                                    />
                                                )}
                                            </Box>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                gutterBottom
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {link.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {link.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 4 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant="body2" color="text.secondary">
                                Built with ❤️ by{" "}
                                <a target="_blank" href="https://amitvaibhavtiwari.dev">
                                    Amit Vaibhav Tiwari
                                </a>
                            </Typography>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
