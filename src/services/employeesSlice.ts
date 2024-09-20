import { createSlice } from "@reduxjs/toolkit";
import { createLocalEmployee, db } from "./api";


const initialState = db

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    createEmployee : (state, action) => {
      createLocalEmployee(action.payload)
      return [...state, action.payload]
    },
    getEmployees: (state) => {
      return state
    },
  },
});

export const { createEmployee, getEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;