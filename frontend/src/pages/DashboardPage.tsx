import { Typography, Box } from "@mui/material";
import * as React from 'react';
import { useAuth } from "./Auth";

import SideMenu from "./SideMenu";

const DashboardPage: React.FC<{}> = (props) => {
  const { user } = useAuth();

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