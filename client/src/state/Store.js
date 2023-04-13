import { configureStore } from "@reduxjs/toolkit";
import MoviesReducer from "./Reducer";

const Store=configureStore({reducer:MoviesReducer})

export default Store