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

export interface WorkoutPlan {
  _id?: string,
  workoutID?: string,
  email?: string,
  user?: User,
  
  name: string,
  sets: WorkoutSet[],
}

export class Plan implements WorkoutPlan {
  _id?: string | undefined;
  workoutID?: string | undefined;
  email?: string | undefined;
  user?: User | undefined;

  name: string;
  sets: WorkoutSet[];
  lifts: Lift[];

  constructor(workoutPlan: WorkoutPlan) {
    this.workoutID = workoutPlan.workoutID;
    this.email = workoutPlan.email;
    this.user = workoutPlan.user;
    this.name = workoutPlan.name;
    this.sets = workoutPlan.sets || [];
    this.lifts = [];

    const liftMap: any = {};
    const names: Set<string> = new Set();

    for (const set of this.sets) {
      if (!(set?.exerciseName)) return;
      liftMap[set.exerciseName] = liftMap[set.exerciseName] ?? [];
      liftMap[set.exerciseName].push(set);
      names.add(set.exerciseName);
    }

    for (const name of Array.from(names.values())) {
      // TODO: sort sets in  order if needed.
      const _lift = {
        index: this.lifts.length,
        exerciseName: name,
        sets: liftMap[name],
      }
      this.lifts.push(_lift);
    }
  }

}

export interface Lift {
  index: number,
  exerciseName: string,
  sets: WorkoutSet[],
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
