import { Typography, Box, TextField, Button, MenuItem, Card, CardContent, CardActions } from "@mui/material";
import { Exercise, Lift, WorkoutPlan, WorkoutSet } from "../../interfaces";
import Api from "../../Api";
import * as React from 'react';

const NewWorkoutPlan: React.FC<{ workoutPlan?: WorkoutPlan }> = ({ workoutPlan }) => {

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(workoutPlan?.name || "");
  const [workoutSets, setWorkoutSets] = React.useState<WorkoutSet[]>(workoutPlan?.sets || []);
  const [lifts, setLifts] = React.useState<Lift[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  async function createWorkoutPlan() {
    setLoading(true);
    if (!name) {
      setErrorMessage("must specify a *name* for the workout plan");
      setLoading(false);
      return;
    }

    if (!workoutSets || workoutSets.length <= 0) {
      setErrorMessage("must add exercises");
      setLoading(false);
      return;
    }

    try {
      // If the workout plan doesn't already exist, create one.
      if (!workoutPlan) {
        setErrorMessage("");
        const _workoutPlan = await Api.workout.createPlan(name, workoutSets );
        setName("");
        setWorkoutSets([]);
        console.log("created a new workout plan: ", _workoutPlan);
      }

      // If the workout plan already exists then we are editing it.
      // TODO: edit existing workout plan
      else {
        // const _workoutPlan = await Api.workout.edit({ name, sets: workoutSets });
        setErrorMessage("");
        console.log("edited a workout plan: ", workoutPlan);
      }

    }

    catch (error: any) {
      console.log(error?.response?.data ?? error);
      setErrorMessage(error?.response?.data ?? error);
    }
    setLoading(false);
  }

  const onChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setName(ev.target.value)

  const [selectedExercise, setSelectedExercise] = React.useState<string>("");
  const [selectedExerciseError, setSelectedExerciseError] = React.useState<string>("");

  function addNewLift() {
    if (!selectedExercise) {
      setSelectedExerciseError("must select an exercise");
      return;
    }

    setLifts([...lifts, { index: lifts.length, exerciseName: selectedExercise, sets: [{ reps: 0, weight: 0, index: 0 }] }])
    setSelectedExerciseError("");
  }

  function addNewSet(lift: Lift) {
    lift.sets.push({ reps: 0, weight: 0, index: lift.sets.length });
    lifts[lift.index] = lift;
    setLifts([...lifts]);

    updateSets();
  }

  function onSetUpdated(lift: Lift, set: WorkoutSet) {
    lift.sets[set.index ?? 0] = set;
    lifts[lift.index] = lift;
    setLifts([...lifts]);

    updateSets();
  }

  function updateSets() {
    const _sets: WorkoutSet[] = [];
    for (const lift of lifts) {
      for (const _set of lift.sets) {
        _sets.push(_set)
      }
    }
    setWorkoutSets(_sets);
  }

  return (
    <Box>

      <Box padding="10px" width="100%">
        <Button fullWidth={true} size="medium" variant="contained" onClick={createWorkoutPlan} disabled={loading}> {loading ? "Loading" : "Create Workout"}</Button>
      </Box>

      {/* Add new lift componet */}
      <Box padding="10px">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Pick A Workout Plan Name
            </Typography>

            <TextField sx={{ display: "flex", flexDirection: "column" }} fullWidth={true} margin="dense" size="small" value={name} onChange={onChanged} label="Name" style={{ paddingRight: "10px" }}>
            </TextField>

            {errorMessage ? <Typography paddingBottom="10px" paddingTop="5px" color="red">{errorMessage}</Typography> : <Box />}

          </CardContent>
        </Card>
      </Box>


      {/* List of lifts */}
      <Box padding="10px">
        {lifts.map((lift) => {
          return (
            <Box paddingBottom="20px">
              <Card key={lift.index}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {lift.exerciseName}
                  </Typography>

                  {lift.sets.map((set) => {
                    return (
                      <EditSet set={set} lift={lift} onSetChanged={onSetUpdated} />
                    );
                  })}

                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" onClick={() => addNewSet(lift)}>Add Set</Button>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>



      {/* Add new lift componet */}
      <Box padding="10px">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>

            <Typography variant="h5" component="div">
              Add Exercise
            </Typography>

            <SelectExercise onExerciseSelected={setSelectedExercise} />

            {selectedExerciseError ? <Typography paddingBottom="10px" paddingTop="5px" color="red">{selectedExerciseError}</Typography> : <Box />}
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" onClick={addNewLift}>Add</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

const EditSet: React.FC<{ onSetChanged: any, lift: Lift, set: WorkoutSet }> = ({ onSetChanged, lift, set }) => {

  const [reps, setReps] = React.useState(set.reps);
  const [weight, setWeight] = React.useState(set.weight);
  const [selectedExerciseError, setSelectedExerciseError] = React.useState<string>("");

  const onWeightChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setWeight(Number(ev.target.value));
    updateSet(reps);
  }

  const onRepsChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setReps(Number(ev.target.value));
    updateSet(Number(ev.target.value));
  }

  function updateSet(reps: number) {
    if (!reps) {
      setSelectedExerciseError("must set value for reps");
      return;
    }

    setSelectedExerciseError("");
    onSetChanged(lift, { reps, weight, index: set.index });
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography padding="5px">Set {(set?.index || 0) + 1}</Typography>
        <TextField type="number" margin="dense" size="small" value={weight} onChange={onWeightChanged} label="weight" style={{ paddingRight: "10px" }} />
        <TextField type="number" margin="dense" size="small" value={reps} onChange={onRepsChanged} label="reps" style={{ paddingRight: "10px" }} />
      </Box>
      {selectedExerciseError ? <Typography paddingBottom="10px" paddingTop="5px" color="red">{selectedExerciseError}</Typography> : <Box />}

    </Box>
  );
}

const SelectExercise: React.FC<{ onExerciseSelected: any }> = ({ onExerciseSelected }) => {
  const [exerciseName, setExerciseName] = React.useState("");
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  const fetchExercises = async () => {
    try {
      const exercises = await Api.exercise.getAll();
      setExercises(exercises);
    }
    catch (error) { }
  }

  React.useEffect(() => {
    fetchExercises();
  }, []);

  const onChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => { setExerciseName(ev.target.value); onExerciseSelected(ev.target.value) };

  return (
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
    </Box>
  );
}

export default NewWorkoutPlan