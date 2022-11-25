import { useEffect, useState } from "react";
import { Container,
        Box,
        Snackbar,
        Alert,
        Avatar,
        Typography,
        Grid,
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        Button,
        DialogContentText,
        CardContent,
        Card,
        CardActionArea,
        CardActions,
        CardHeader
    } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Contactos } from '../../interfaces/apiInterface';
import { Notify } from '../../interfaces/general';
import { useParams, useNavigate  } from "react-router-dom";

type IDContact = {
    id: string;
};

export const DeleteContact = () => {


    const { id } = useParams<IDContact>();
    const [data, setData] = useState<Contactos>();
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [notify, setNotify] = useState<Notify>({isOpen: false, message: "", severity: "success"})
    const history = useNavigate();

    const deleteContact = async () => {
        const settings = {
            method: 'DELETE'
        };
        try {
            const response = await fetch("https://bkbnchallenge.herokuapp.com/contacts/"+id, settings);
            if (response.ok) {
                const json = await response.json();
                setNotify({
                    isOpen: true,
                    message: "Se ha eliminado con éxito el contacto",
                    severity: "success"
                });
                setShowDialog(false);
                setError(true);
                return json;
            } else {
                const res = await response.json()
                setNotify({
                    isOpen: true,
                    message: res.message,
                    severity: "error"
                })
                return res;
            }

        } catch (e) {
            setNotify({
                isOpen: true,
                message: "Algo ha salido mal :o",
                severity: "error"
            })
            return e;
        }
    }

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
                <Dialog
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {"¿Deseas eliminar este Contacto?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta acción no se puede revertir.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDialog(false)}>Cancelar</Button>
                        <Button onClick={() => deleteContact()} color="error" autoFocus variant="contained">
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>

                <Typography component="h1" variant="h5">
                    Eliminar contacto.
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    startIcon={<ArrowBackIcon />}
                                    fullWidth
                                    onClick={() => backHome()}
                                    sx={{ mt: 3, mb: 2 }}>
                                    Volver
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    disabled={error ? true: false}
                                    color="error"
                                    endIcon={<DeleteIcon/>}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => setShowDialog(true)}>
                                    Eliminar
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    )
}
