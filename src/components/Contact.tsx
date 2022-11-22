import { useEffect, useState } from "react";
import { Container,
        Box,
        Snackbar,
        Alert,
        Avatar,
        Typography,
        Button,
        CardContent,
        Card,
        CardActionArea,
        CardActions,
        CardHeader
    } from "@mui/material"
import { Contactos } from '../interfaces/apiInterface';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Notify } from '../interfaces/general';
import { useParams, useNavigate  } from "react-router-dom";

type IDContact = {
  id: string;
};

export const ContactInfo = () => {

  const { id } = useParams<IDContact>();
  const [data, setData] = useState<Contactos>();
  const [error, setError] = useState<boolean>(false);
  const [notify, setNotify] = useState<Notify>({isOpen: false, message: "", severity: "success"})
  const history = useNavigate();

  const backHome = () => {
    history("/");
}

useEffect(() => {

    const abortController = new AbortController();
    const getData = async () => {
        const signal = abortController.signal;
        try{
            const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts/'+id, { method: 'GET', signal: signal });
            if (response.ok) {
                const json = await response.json();
                setData(json);
                return json;
            } else {
                const json = await response.text();
                setNotify({
                    isOpen: true,
                    message: json === 'Not Found' ? "No se ha encontrado el usuario": json,
                    severity: "error"
                });
                setError(true);
                return response;
            }
        }catch(error){
            setError(false);
        }
    }

    getData();

    return () => {
        abortController.abort();
    }

},[id])

return(
    <Container component="main" maxWidth="xs">
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        {
            <Snackbar open={notify.isOpen} autoHideDuration={10000} onClose={()=> setNotify({...notify, isOpen: false})}>
                <Alert onClose={()=> setNotify({...notify, isOpen: false})} severity={notify.severity} sx={{ width: '100%' }}>
                    {notify.message}
                </Alert>
            </Snackbar>
        }
            <Typography component="h1" variant="h5">
                Contacto.
            </Typography>
            <Card>
                <CardActionArea>
                    <CardHeader
                        avatar={<Avatar>N</Avatar>}
                        title={data?.firstName}
                        subheader={data?.lastName}
                    />
                    <CardContent>
                        <Typography>Email: {data?.email}</Typography>
                        <Typography>Phone: {data?.phone}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button disabled={error ? true: false}
                    startIcon={<ArrowBackIcon />}
                    fullWidth
                    onClick={() => backHome()}
                    sx={{ mt: 3, mb: 2 }}>
                    Volver
                  </Button>
                </CardActions>
            </Card>
        </Box>
    </Container>
  )
}
