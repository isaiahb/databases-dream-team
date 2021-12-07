import { Typography, Box, IconButton } from "@mui/material";
import * as React from 'react';
import { useAuth } from "./Auth";

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const SideMenu: React.FC<{children: React.ReactNode}> = (props: {children: React.ReactNode}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loggedOutPages = [
    {
      name: "Login",
      route: "login",
      icon: <LoginIcon />,
    },
    {
      name: "Signup",
      route: "signup",
      icon: <PersonAddIcon />,
    },
  ];

  const loggedInPages = [
    {
      name: "Dashboard",
      route: "dashboard",
      icon: <HomeIcon />,
    },
    {
      name: "Exercises",
      route: "exercises",
      icon: <FitnessCenterIcon />,
    },
    {
      name: "One Rep Max",
      route: "one-rep-max",
      icon: <LooksOneIcon />,
    },
    {
      name: "Goals",
      route: "goals",
      icon: <ShowChartIcon />,
    },
    {
      name: "Workout Plans",
      route: "workout-plans",
      icon: <MenuBookIcon />,
    },
    {
      name: "Track Workout",
      route: "track-workout",
      icon: <EditIcon />,
    },
    {
      name: "Edit profile",
      route: "edit-profile",
      icon: <ManageAccountsIcon />,
    },
    {
      name: "Sign out",
      route: "signout",
      icon: <ExitToAppIcon />,
    },
  ];

  const pages = user ? loggedInPages : loggedOutPages;
  function gotoPage(page: any) {
    navigate("/"+page.route);
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem button key={page.name} onClick={()=> gotoPage(page)}>
            <ListItemIcon>
              {page.icon}
            </ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap paddingLeft="10px" component="div">
            WE Lift
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box> 
      {/* End of drawer */}

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

export default SideMenu;