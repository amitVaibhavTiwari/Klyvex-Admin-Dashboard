
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

function Landing() {
    return (
        <>

            {/* Hero Section */}
            <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h2" gutterBottom>
                    Welcome to Our Website
                </Typography>
                <Typography variant="h6" paragraph>
                    We build amazing web experiences using Material UI and React.
                </Typography>
                <Button variant="contained" size="large" color="primary">
                    Get Started
                </Button>
            </Container>

            {/* Footer */}
            <Box component="footer" sx={{ textAlign: 'center', py: 3, bgcolor: 'grey.200' }}>
                <Typography variant="body2">&copy; 2025 My Company</Typography>
            </Box>
        </>
    );
}

export default Landing;
