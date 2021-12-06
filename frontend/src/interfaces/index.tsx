// TODO WE LIFT MODELS
export interface User {
  email: string,
  fName: string,
  lName: string,
  password: string,
  dOB: Date,
  weight: Number,
  sex: string,
  rating: Number,
}

export interface Exercise {
  exerciseName: string,
  muscleGroup: string,
}

export interface Workout {
  workoutID: string,
  email: string,
}

export interface UserCreatedWorkout {
  workoutID: string,
}

export interface SuggestedWorkout {
  workoutID: string,
  intensity: string,
}

export interface CompletedWorkout {
  workoutID: string,
  dateCompleted: Date,
  email: string,
}

export interface OneRepMax {
  _id: string,

  oneRepMaxID?: string,
  email: string,
  exerciseName: string,
  weight: number,

  dateComplete: Date,
}

export interface WorkoutSet {
  setID?: string,
  workoutID?: string,
  exerciseName?: string,

  weight: number,
  reps: number,
  index?: number,
}

export interface Goal {
  _id: string,

  goalID?: string,
  setID?: string,
  email?: String,
  isComplete?: boolean,
  createdDate?: Date,

  exerciseName: string,
  set: WorkoutSet
}
