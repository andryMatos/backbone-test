import { Button, Card, CardContent, CardMedia, Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createContactAdapter } from "../../adapters";
import useFetchAndLoad from "../../hooks/useFetch";
import { createContact, modifyContact } from "../../redux/state/contact";
import { AppStore } from "../../redux/store";
import { getContactById } from "../../services/service";
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { AccountCircle } from '@mui/icons-material';


export const ContactsTest = () => {

    const { isLoading, callEndpoint } = useFetchAndLoad();
    const dispatch = useDispatch();
    const contactsState = useSelector(( store: AppStore) => store.contact)

    const handleClick = async () => {
        const contacto = await callEndpoint(getContactById('6380868fef96270016c29ea2'));
        dispatch(createContact(createContactAdapter(contacto)))
    }

    const handleModify = () => {
        dispatch(modifyContact({id:'afafafasfas', name:'Andry', lastName: 'Matos Caamal'}))
    }

    return (
        <>
        {isLoading ? (
                <div>
                <h3>LOADING</h3>
                </div>
            ) : (
                <>
                <Button variant="text" onClick={handleClick}>
                    LOGIN
                </Button>
                <Button variant="text" onClick={handleModify}>
                    MODIFY
                </Button>
                <div>
                    <h3>{JSON.stringify(contactsState)}</h3>
                    <Card
                        variant="outlined"
                        style={{ display: "inline-block" }}
                        >
                        <CardMedia>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AccountCircle />
                            </Avatar>
                        </CardMedia>
                        <CardContent>
                            <Typography
                            color="textSecondary"
                            variant="h6"
                            align="center"
                            >
                                { contactsState.name } {contactsState.lastName}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="subtitle1"
                                align="center"
                                >
                                <AlternateEmailIcon fontSize="small" />
                                    { contactsState.email }
                                </Typography>{" "}
                            <Typography
                                color="textSecondary"
                                variant="subtitle1"
                                align="center"
                                >
                                <PhoneIcon  fontSize="small" />
                                { contactsState.phone }
                            </Typography>{" "}
                        </CardContent>
                        </Card>
                </div>
                </>
            )}
        </>
    )

}