import { Typography, Box, TextField, Button, MenuItem, IconButton, BottomNavigation, BottomNavigationAction } from "@mui/material";
import * as React from 'react';

import SideMenu from "../SideMenu";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Exercise, OneRepMax, WorkoutPlan } from "../../interfaces";
import Api from "../../Api";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

function WorkoutPlansList() {
  const [workoutPlans, setWorkoutPlans] = React.useState<WorkoutPlan[]>([]);

  const fetchWorkoutPlans = async () => {
    try {
      const _workoutPlans = await Api.workout.getMyWorkoutPlans();
      setWorkoutPlans(_workoutPlans);
    }
    catch (error) {

    }
  }

  React.useEffect(() => {
    (async () => {
      fetchWorkoutPlans();
    })();
  }, [])

  if (!workoutPlans)
    return <Box />

  return (
    <List sx={{ paddingTop: "30px", width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      {workoutPlans.map((workoutPlan, index) => {
        return (
          <Box key={index}>
            <Divider />
            <WorkoutPlanListItem workoutPlan={workoutPlan} refresh={fetchWorkoutPlans} />
          </Box>
        );
      })}
      <Divider />

    </List>
  );
}

const WorkoutPlanListItem: React.FC<{ workoutPlan: WorkoutPlan, refresh?: any }> = ({ workoutPlan, refresh }) => {
  async function deleteGoal() {
    try {
      // await Api.workout.delete(workoutPlan?._id || "");
      if (refresh) refresh();
    }
    catch (error) {
      // TODO: handle failing to delete Goal.
    }
  }

  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={deleteGoal}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={workoutPlan.name}
        secondary={
          <React.Fragment>
           
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

const AddOneRepMaxListItem: React.FC<{ refresh: any }> = ({ refresh }) => {
  const [exerciseName, setExerciseName] = React.useState("");
  const [weight, setWeight] = React.useState<number>(135);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  const fetchExercises = async () => {
    try {
      const exercises = await Api.exercise.getAll();
      setExercises(exercises);
    }
    catch (error) {

    }
  }

  React.useEffect(() => {
    fetchExercises();
  }, []);

  const [loading, setLoading] = React.useState(false);

  async function recordOneRepMax() {
    setLoading(true);
    if (!exerciseName) {
      setErrorMessage("must specify a exercise");
      setLoading(false);
      return;
    }

    if (!weight) {
      setErrorMessage("must specify weight");
      setLoading(false);
      return;
    }

    try {
      setExerciseName("");
      setWeight(0);
      setErrorMessage("");
      const oneRepMax = await Api.oneRepMax.create(exerciseName, weight);
      console.log("Recorded a new one rep max: ", oneRepMax);
      if (refresh) refresh();
    }

    catch (error: any) {
      console.log(error?.response?.data ?? error);
      setErrorMessage(error?.response?.data ?? error);
    }
    setLoading(false);
  }

  const onChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setExerciseName(ev.target.value)
  const onWeightChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setWeight(Number(ev.target.value));

  return (
    <ListItem alignItems="flex-start">
      <Box display="flex" flexDirection="column">
        <ListItemText
          primary="Record a new one rep max"
        />

        <Box display="flex" flexDirection="row" justifyContent="center">
          <TextField sx={{ display: "flex", flexDirection: "column" }} fullWidth={true} select margin="dense" size="small" value={exerciseName} onChange={onChanged} label="Exercise" style={{ paddingRight: "10px" }}>
            {exercises.map((exercise) => (
              <MenuItem key={exercise.exerciseName} value={exercise.exerciseName} >
                <Typography paddingRight="10px" paddingLeft="10px">
                  {exercise.exerciseName}
                </Typography>
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth={true} type="number" margin="dense" size="small" value={weight} onChange={onWeightChanged} label="weight" style={{ paddingRight: "10px" }} />
        </Box>
        <Button onClick={recordOneRepMax} variant="contained" size="small" disabled={loading}>{loading ? "loading" : "Add"}</Button>

        {errorMessage ? <Typography paddingBottom="10px" paddingTop="5px" color="red">{errorMessage}</Typography> : <Box />}
      </Box>
    </ListItem>
  );
}