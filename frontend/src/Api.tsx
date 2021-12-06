import axios from "axios";
import { Exercise, User } from "./interfaces";

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

    // getByMuscleGroup: async (muscleGroup: string): Promise<Exercise[]> => {
    //   const response = await axios.get(baseURL + "/exercise/muscle-group/" + muscleGroup);
    //   return response.data;
    // },

    // getByName: async (name: String): Promise<Exercise> => {
    //   const response = await axios.get(baseURL + "/exercise/name/" + name);
    //   return response.data;
    // }
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

  // oneRepMax: {
  //   getAll: async (): Promise<Exercise[]> => {
  //     const response = await axios.get(baseURL + "/one-rep-max/all/");
  //     return response.data;
  //   },
  //   getByExerciseName: async (exerciseName: string): Promise<Exercise[]> => {
  //     const response = await axios.get(baseURL + "/one-rep-max/exercise-name/" + exerciseName);
  //     return response.data;
  //   },
  // },

  // goals: {
  //   getAll: async (): Promise<Exercise[]> => {
  //     const response = await axios.get(baseURL + "/goals/all/");
  //     return response.data;
  //   },
  //   getByExerciseName: async (exerciseName: string): Promise<Exercise[]> => {
  //     const response = await axios.get(baseURL + "/goals/exercise-name/" + exerciseName);
  //     return response.data;
  //   },
  //   create: async (): Promise<Exercise[]> => {
  //     const response = await axios.get(baseURL + "/goals/create/");
  //     return response.data;
  //   },
  // },

}

export default Api;