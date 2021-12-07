import axios from "axios";
import { Exercise, Goal, OneRepMax, User, WorkoutPlan, WorkoutSet } from "./interfaces";

axios.defaults.withCredentials = true;

const remoteURL = "http://localhost:5000/api";
const testingURL = "http://localhost:5000/api";
const TESTING = true;
const baseURL = TESTING ? testingURL : remoteURL;

const Api = {
  exercise: {
    getAll: async (): Promise<Exercise[]> => {
      const response = await axios.get(baseURL + "/exercise/all/");
      return response.data;
    },

    create: async (exercise: Exercise): Promise<Exercise[]> => {
      const response = await axios.post(baseURL + "/exercise/create/", exercise);
      return response.data;
    },

    deleteExercise: async (exercise: Exercise): Promise<Exercise[]> => {
      const response = await axios.delete(baseURL + "/exercise/delete/" + exercise.exerciseName);
      return response.data;
    },
  },

  user: {
    me: async (): Promise<User> => {
      const response = await axios.get(baseURL + "/user/me/");
      return response.data;
    },
  },

  auth: {
    login: async (email: string, password: string): Promise<User> => {
      const response = await axios.post(baseURL + "/auth/login/", { email, password });
      return response.data;
    },

    signup: async (fName: string, lName: string, email: string, password: string, dOB: Date, weight: number, sex: string): Promise<User> => {
      const response = await axios.post(
        baseURL + "/auth/signup/",
        {
          fName,
          lName,
          email,
          password,
          dOB,
          weight,
          sex,
        }
      );
      return response.data;
    },
  },

  goals: {
    getMyGoals: async (): Promise<Goal[]> => {
      const response = await axios.get(baseURL + "/goals/my-goals/");
      return response.data;
    },
 
    create: async (exerciseName: String, reps: Number, weight: Number): Promise<Goal> => {
      const response = await axios.post(baseURL + "/goals/create/", {exerciseName, reps, weight});
      return response.data;
    },

    delete: async (id: String): Promise<Goal> => {
      const response = await axios.delete(baseURL + "/goals/delete/"+id);
      return response.data;
    },
  },

  oneRepMax: {
    getMyOneRepMaxs: async (): Promise<OneRepMax[]> => {
      const response = await axios.get(baseURL + "/one-rep-max/my/");
      return response.data;
    },
 
    create: async (exerciseName: String, weight: Number): Promise<OneRepMax> => {
      const response = await axios.post(baseURL + "/one-rep-max/create/", {exerciseName, weight});
      return response.data;
    },

    delete: async (id: string): Promise<Goal> => {
      const response = await axios.delete(baseURL + "/one-rep-max/delete/"+id);
      return response.data;
    },
  },

  workout: {
    getMyWorkoutPlans: async (): Promise<WorkoutPlan[]> => {
      const response = await axios.get(baseURL + "/workout/my-plans/");
      return response.data;
    },
 
    createPlan: async (name: string, sets: WorkoutSet[]): Promise<WorkoutPlan> => {
      const response = await axios.post(baseURL + "/workout/create-plan/", {name, sets});
      return response.data;
    },

    deletePlan: async (id: String): Promise<WorkoutPlan> => {
      const response = await axios.delete(baseURL + "/workout/delete-plan/"+id);
      return response.data;
    },
  },

}

export default Api;