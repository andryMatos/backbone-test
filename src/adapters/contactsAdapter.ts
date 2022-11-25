export const createContactAdapter = (contact: any) => ({
    id: contact.data.id,
    name: contact.data.firstName,
    lastName: contact.data.lastName,
    email: contact.data.email,
    phone: contact.data.phone,
    createDate: contact.data.createdAt,
    updateDate: contact.data.updatedAt,
});
