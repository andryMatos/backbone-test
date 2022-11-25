import { configureStore } from "@reduxjs/toolkit";
import { contactSlice } from "./state/contact";

export interface AppStore {
    contact: any
}

export default configureStore<AppStore>({
    reducer: {
        contact: contactSlice.reducer
    }
})
