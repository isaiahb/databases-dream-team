import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography} from '@mui/material';
// import Logo from "../../assets/nav-logo.png";

const appbarStyle = {

  background: '#FFFFFF',
};

function Nav() {
  return (
    <AppBar position="sticky" style={appbarStyle} elevation={1}>
      <Toolbar>
        <Link to="/">
          <Typography variant="h4">WE Lift</Typography>
          {/* <Box component="img" sx={{ height: 50 }} alt="WE Lift" src={Logo} /> */}
        </Link>
        <Box flexGrow={1} />
        
      </Toolbar>
    </AppBar>
  );
}

export default Nav;