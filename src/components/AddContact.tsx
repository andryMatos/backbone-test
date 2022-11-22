import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AccountCircle } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ContactsRequest } from '../interfaces/apiInterface';
import { Alert, Button, Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Notify } from '../interfaces/general';
import { useNavigate } from 'react-router-dom';

type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
};

export const AddContact = () => {

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [notify, setNotify] = useState<Notify>({isOpen: false, message: "", severity: "success"})
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const history = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setShowAlert(true);
        setLoading(true);

        const params: ContactsRequest = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone
        };

        const response = postData(params, "https://bkbnchallenge.herokuapp.com/contacts");

        setLoading(false);

    }

    const postData = async (data: ContactsRequest, url: string) => {
        const settings = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await fetch(url, settings);
            if (response.ok) {
                const json = await response.json();
                setNotify({
                    isOpen: true,
                    message: "Se ha creado con éxito el contacto",
                    severity: "success"
                })
                reset();
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
                showAlert ?
                <div>
                <Snackbar open={notify.isOpen} autoHideDuration={6000} onClose={()=> setNotify({...notify, isOpen: false})}>
                    <Alert onClose={()=> setNotify({...notify, isOpen: false})} severity={notify.severity} sx={{ width: '100%' }}>
                        {notify.message}
                    </Alert>
                </Snackbar>
                </div>
                :
                <></>
            }
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registro de nuevo contacto
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        error = {!!errors.firstName}
                        helperText={errors.firstName ? 'El nombre es requerido' : ''}
                        {...register("firstName", { required: true })}
                        />
                    <TextField
                        margin="normal"
                        required
                        label="Apellido"
                        variant="outlined"
                        error = {!!errors.lastName}
                        fullWidth
                        helperText={errors.lastName ? 'El apellido es requerido' : ''}
                        {...register("lastName", { required: true })}
                        />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electronico"
                        error = {!!errors.email}
                        helperText={errors.email && errors.email.type === 'required' ? 'El Correo es requerido' : errors.email && errors.email.type === 'pattern' ? 'El correo no tiene un formato valido' : ''}
                        {...register("email",{ required: true, pattern: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                        />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Número telefonico"
                        inputProps={{ type: 'number',pattern: '[0-9]*' }}
                        error = {!!errors.phone}
                        helperText={errors.phone && errors.phone.type === 'required'  ? 'El número telefonico es requerido' : errors.phone && errors.phone.type === 'maxLength' ? "El número telefonico no puede ser mayor a 10 números" : errors.phone && errors.phone.type === "minLength" ? 'El número telefonico debe tener 10 números' : ""}
                        {...register("phone",{ required: true, minLength: 10, maxLength: 10, pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/ })}
                        />
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
                            <LoadingButton
                                color="success"
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                type="submit"
                                >
                                Guardar
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}