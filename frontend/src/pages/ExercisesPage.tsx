import { Typography, Box, TextField, Button } from "@mui/material";
import * as React from 'react';
import { useAuth } from "./Auth";

import PropTypes from 'prop-types';
import SideMenu from "./SideMenu";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Exercise } from "../interfaces";
import Api from "../Api";

function ExerciseList() {

  const defaultExercises: Exercise[] = [
    {exerciseName: "Squat", muscleGroup: "quads, glutes, hamstrings"},
    {exerciseName: "Deadlifts", muscleGroup: "quads, glutes, hamstrings, lower-back, upper-back"},
    {exerciseName: "Bench", muscleGroup: "Pectorials, Biceps, Triceps, Anterior-deltoids"},
  ];

  const [exercises, setExercises] = React.useState(defaultExercises);

  const fetchExercises = async () => {
    try {
      const exercises = await Api.exercise.getAll();
      console.log("all exercises for user: ", exercises);
      setExercises(exercises);
    }
    catch(error) {

    }
  }

  React.useEffect(()=>{
    // TODO: Fetch exercises
    (async ()=>{
      fetchExercises();
    })();
  }, [])
  
  return (
    <List sx={{ paddingTop: "30px", width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <AddExercisesListItem refresh={fetchExercises} />
      {exercises.map((exercise)=>{
        return (
          <Box>
              <Divider />
              <ExercisesListItem exercise={exercise} key={exercise.exerciseName} />

          </Box>
        );
      })}
      <Divider />
      
    </List>
  );
}


const ExercisesListItem: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={exercise.exerciseName}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {exercise.muscleGroup}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

const AddExercisesListItem: React.FC<{refresh: any}> = ({refresh}) => {
  const [exerciseName, setExerciseName] = React.useState("");
  const [muscleGroup, setMuscleGroup] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  async function addExercise() {
    setLoading(true);
    if (!exerciseName) {
      setErrorMessage("must specify an exercise name");
      setLoading(false);
      return;
    }

    if (!muscleGroup) {
      setErrorMessage("must specify a muscle group");
      setLoading(false);
      return;
    }

    try {
      setExerciseName("")
      setMuscleGroup("")
      setErrorMessage("")
      const exercise = await Api.exercise.create({exerciseName, muscleGroup});
      console.log("created exercise", exercise);
      if (refresh) refresh();
    }
    catch(error: any) {
      console.log(error?.response?.data ?? error);
      setErrorMessage(error?.response?.data ?? error);
    }
    setLoading(false);
  }

  const onChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setExerciseName(ev.target.value)
  const onChanged2 = (ev: React.ChangeEvent<HTMLInputElement>): void => setMuscleGroup(ev.target.value)

  return (
    <ListItem alignItems="flex-start">
      <Box display="flex" flexDirection="column">
        <ListItemText
          primary="Add new exercise"
        />
        <Box display="flex" flexDirection="row">
          <TextField value={exerciseName} onChange={onChanged} label="name" style={{ paddingRight: "10px" }} />
          <TextField value={muscleGroup} onChange={onChanged2} label="muscle groups" style={{ paddingRight: "10px" }} />
          <Button onClick={addExercise} variant="outlined" size="small" disabled={loading}>{loading ? "loading" : "Add"}</Button>
        </Box>
          {errorMessage ? <Typography  paddingBottom="10px" paddingTop="5px" color="red">{errorMessage}</Typography> : <Box />}
      </Box>
    </ListItem>
  );
}

const ExercisesPage: React.FC<{}> = (props) => {
  const { user } = useAuth();
  // const navigate = useNavigate();

  console.log("auth context user:", user);

  return (
    <SideMenu>
      <Box>
        <Typography variant="h4">Exercises</Typography>
      </Box>

      <Typography paragraph>
        View or add new exercises, search for exercise by name, or muscle group
      </Typography>
      <Box display="flex" flexDirection="row">
        <TextField label="search name" style={{ paddingRight: "10px" }} />
        <TextField label="search muscle group" style={{ paddingRight: "10px" }} />
        <Button variant="outlined" size="small">Search</Button>
      </Box>
      <ExerciseList />

    </SideMenu>
  );
}

export default ExercisesPage;