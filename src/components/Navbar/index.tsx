import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useGlobalContext } from '../../lib/GlobalContext';

export default function Navbar() {
  const { dispatch, theme: colorTheme } = useGlobalContext()

  const handleThemeChange = () => {
    if (colorTheme == "dark") {
      dispatch({
        type: "setTheme",
        payload: "light"
      })
    } else {
      dispatch({
        type: "setTheme",
        payload: "dark"
      })
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
      })} position="static">
        <Toolbar>
          <IconButton
            onClick={() => handleThemeChange()}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {colorTheme == "dark" ? "DARK" : "LIGHT"}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
