import RestaurantScreen from './components/restaurantScreen';
import {createTheme} from '@mui/material/styles';
import {green} from '@mui/material/colors';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function App() {
    const theme = createTheme({
        palette: {
            primary: green,
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">Yumrank</Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <RestaurantScreen />
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
