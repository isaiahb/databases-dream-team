import { Typography, Box, TextField, Button, MenuItem, IconButton } from "@mui/material";
import * as React from 'react';

import SideMenu from "./SideMenu";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Exercise, Goal } from "../interfaces";
import Api from "../Api";
import DeleteIcon from '@mui/icons-material/Delete';

function GoalsList() {
  const [goals, setGoals] = React.useState<Goal[]>([]);

  const fetchGoals = async () => {
    try {
      const goals = await Api.goals.getMyGoals();
      setGoals(goals);
    }
    catch (error) {

    }
  }

  React.useEffect(() => {
    (async () => {
      fetchGoals();
    })();
  }, [])

  return (
    <List sx={{ paddingTop: "30px", width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <AddGoalListItem refresh={fetchGoals} />
      {goals.map((goal, index) => {
        return (
          <Box key={index}>
            <Divider />
            <GoalListItem goal={goal} refresh={fetchGoals} />
          </Box>
        );
      })}
      <Divider />

    </List>
  );
}


const GoalListItem: React.FC<{ goal: Goal, refresh?: any }> = ({ goal, refresh }) => {

  async function deleteGoal() {
    try {
      await Api.goals.delete(goal._id);
      if (refresh) refresh();
    }
    catch(error) {
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
        primary={goal.exerciseName}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {goal.set.weight} lbs  :
              {goal.set.reps} reps
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

const AddGoalListItem: React.FC<{ refresh: any }> = ({ refresh }) => {
  const [exerciseName, setExerciseName] = React.useState("");
  const [weight, setWeight] = React.useState<number>(135);
  const [reps, setReps] = React.useState<number>(5);
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

  async function addGoal() {
    setLoading(true);
    if (!exerciseName) {
      setErrorMessage("must specify a exercise");
      setLoading(false);
      return;
    }

    if (!reps) {
      setErrorMessage("must specify reps");
      setLoading(false);
      return;
    }

    try {
      setExerciseName("");
      setWeight(135);
      setReps(5);
      setErrorMessage("");
      const goal = await Api.goals.create(exerciseName, reps, weight);
      console.log("created goal: ", goal);
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
  const onRepsChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setReps(Number(ev.target.value));

  return (
    <ListItem alignItems="flex-start">
      <Box display="flex" flexDirection="column">
        <ListItemText
          primary="Create a new Goal"
        />
        <Box display="flex" flexDirection="column">
          <TextField sx={{ display: "flex", flexDirection: "column" }} fullWidth={true} select margin="dense" size="small" value={exerciseName} onChange={onChanged} label="Exercise" style={{ paddingRight: "10px" }}>
            {exercises.map((exercise) => (
              <MenuItem key={exercise.exerciseName} value={exercise.exerciseName} >
                <Typography padding="5px">
                  {exercise.exerciseName}
                </Typography>
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box display="flex" flexDirection="row">
          <TextField type="number" margin="dense" size="small" value={weight} onChange={onWeightChanged} label="weight" style={{ paddingRight: "10px" }} />
          <TextField type="number" margin="dense" size="small" value={reps} onChange={onRepsChanged} label="reps" style={{ paddingRight: "10px" }} />
          <Button onClick={addGoal} variant="contained" size="small" disabled={loading}>{loading ? "loading" : "Add"}</Button>
        </Box>
        {errorMessage ? <Typography paddingBottom="10px" paddingTop="5px" color="red">{errorMessage}</Typography> : <Box />}
      </Box>
    </ListItem>
  );
}

const GoalsPage: React.FC<{}> = (props) => {
  return (
    <SideMenu>
      <Box>
        <Typography variant="h4">Goals</Typography>
      </Box>
      <Typography paragraph> View or create new goal </Typography>
      <GoalsList />
    </SideMenu>
  );
}

export default GoalsPage;