import { loadAbort } from '../utilities';
import axios from 'axios';
import { Contacto, ContactsResponse } from '../models';

export const getAllContacts = () => {
    const controller = loadAbort();
    return {
        call: axios.get<ContactsResponse>('https://bkbnchallenge.herokuapp.com/contacts?_sort=createdAt:DESC', {signal: controller.signal}),
        controller
    }
}

export const getContactById = (id: string | undefined) => {
    const controller = loadAbort();
    return {
        call: axios.get<Contacto>('https://bkbnchallenge.herokuapp.com/contacts/'+id, {signal: controller.signal}),
        controller
    }
}
