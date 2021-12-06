import { Typography, Box, Container} from "@mui/material";
import * as React from 'react';
import { useAuth } from "./Auth";

function DashboardPage() {
  const { user } = useAuth();
  console.log("auth context user:", user);
  
  return (
    <Container>
      <Box>
        <Typography variant="h3">Dashboard</Typography>
        <Typography >Welcome back {user?.fName} {user?.lName}</Typography>
      </Box>
    </Container>
  )
}


export default DashboardPage;