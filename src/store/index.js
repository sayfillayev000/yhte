import { configureStore } from "@reduxjs/toolkit";
import testCount from "./testCount";


export const store = configureStore({
    reducer :{
        tests: testCount
    }
})