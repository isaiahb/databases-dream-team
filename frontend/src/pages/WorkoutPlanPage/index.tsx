import { Typography, Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import * as React from 'react';

import SideMenu from "../SideMenu";
import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import NewWorkoutPlan from "./NewWorkoutPlan";

const WorkoutPlanPage: React.FC<{}> = (props) => {
  const [value, setValue] = React.useState(0);

  return (
    <SideMenu>
      <Box>
        <Typography variant="h4">Workout Plans</Typography>
      </Box>
      <Typography paragraph> View existing workout plans, View your created workout plans, or create your own workout plan </Typography>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{bgcolor: "#ADD8E6" }}
      >
        <BottomNavigationAction label="Workout Plans" icon={<FormatListNumberedIcon />} />
        <BottomNavigationAction label="Create Workout Plan" icon={<AddIcon />} />
      </BottomNavigation>
      
      {value === 0 ? <Box /> : <NewWorkoutPlan/>}
    </SideMenu>
  );
}

export default WorkoutPlanPage;