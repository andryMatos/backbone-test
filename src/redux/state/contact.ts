import { Contacto } from "../../models";
import { createSlice } from '@reduxjs/toolkit';

export const ContactStateEmpty: Contacto = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
    createdAt: '',
    updatedAt: '',
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState: ContactStateEmpty,
    reducers: {
        createContact: (state, action) => action.payload,
        modifyContact: (state, action) => ({...state, ...action.payload}),
        resetContact: () => ContactStateEmpty
    }
});

export const { createContact, modifyContact, resetContact } = contactSlice.actions;

export default contactSlice.reducer;
