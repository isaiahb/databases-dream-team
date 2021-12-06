import { Typography, Box } from "@mui/material";
import * as React from 'react';
import { useAuth } from "./Auth";

import PropTypes from 'prop-types';
import SideMenu from "./SideMenu";
// import { useNavigate } from 'react-router-dom';


const DashboardPage: React.FC<{}> = (props) => {
  const { user } = useAuth();
  // const navigate = useNavigate();

  console.log("auth context user:", user);

  return (
    <SideMenu>
      <Box>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="h6">Welcome back {user?.fName} {user?.lName}</Typography>
      </Box>

      <Typography paragraph>
        Select an action to continue.
      </Typography>
    </SideMenu>
  );
}

export default DashboardPage;