import { useEffect, useState } from "react";
import { Container, Box, Snackbar, Alert, Avatar, Typography, TextField, Grid, Skeleton } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ContactsRequest, Contactos, Notify } from "../../models";
import { AccountCircle } from '@mui/icons-material';
import { useParams, useNavigate  } from "react-router-dom";

type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
};

type IDContact = {
    id: string;
};

export const UpdateContact = () => {

    const { id } = useParams<IDContact>();
    const [data, setData] = useState<Contactos>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [notify, setNotify] = useState<Notify>({isOpen: false, message: "", severity: "success"})
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>({defaultValues:{firstName:'',lastName: '', email:'', phone:0}});
    const history = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        setLoading(true);

        const params: ContactsRequest = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone
        };

        postData(params, "https://bkbnchallenge.herokuapp.com/contacts/"+id);

        setLoading(false);

    }

    const postData = async (data: ContactsRequest, url: string) => {
        const settings = {
            method: 'PUT',
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
                    message: "Se ha actualizado con éxito el contacto",
                    severity: "success"
                });
                history("/");
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
                    setValue('firstName', json?.firstName ? json.firstName : '');
                    setValue('lastName', json?.lastName ? json.lastName : '');
                    setValue('email', json?.email ? json.email : '');
                    setValue('phone', json?.phone ? json.phone : 0);
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
                setLoading(false);
                setError(false);
            }
        }

        getData();

        return () => {
            abortController.abort();
        }

    },[id, setValue]);

    if(loading){
        return (
            <>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
            </>
        )
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
                <Snackbar open={notify.isOpen} autoHideDuration={10000} onClose={()=> setNotify({...notify, isOpen: false})}>
                    <Alert onClose={()=> setNotify({...notify, isOpen: false})} severity={notify.severity} sx={{ width: '100%' }}>
                        {notify.message}
                    </Alert>
                </Snackbar>
            }
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Actualizar el contacto: { data?.firstName }
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                    <TextField
                        focused
                        margin="normal"
                        required
                        fullWidth
                        error = {!!errors.firstName}
                        helperText={errors.firstName ? 'El nombre es requerido' : ''}
                        {...register("firstName", { required: true })}/>
                    <label>Apellido</label>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error = {!!errors.lastName}
                        helperText={errors.lastName ? 'El apellido es requerido' : ''}
                        {...register("lastName", { required: true })}
                        />
                    <label>Email</label>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error = {!!errors.email}
                        helperText={errors.email && errors.email.type === 'required' ? 'El Correo es requerido' : errors.email && errors.email.type === 'pattern' ? 'El correo no tiene un formato valido' : ''}
                        /* eslint-disable no-useless-escape */
                        {...register("email",{ required: true, pattern: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                        />
                    <label>Número telefonico</label>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        inputProps={{ type: 'number',pattern: '[0-9]*' }}
                        error = {!!errors.phone}
                        helperText={errors.phone && errors.phone.type === 'required'  ? 'El número telefonico es requerido' : errors.phone && errors.phone.type === 'maxLength' ? "El número telefonico no puede ser mayor a 10 números" : errors.phone && errors.phone.type === "minLength" ? 'El número telefonico debe tener 10 números' : ""}
                        {...register("phone",{ required: true, minLength: 10, maxLength: 10, pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/ })}
                        />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <LoadingButton
                                color="error"
                                startIcon={<CancelIcon />}
                                fullWidth
                                onClick={() => backHome()}
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Cancelar
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LoadingButton
                                disabled={error ? true: false}
                                color="primary"
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                type="submit"
                                >
                                Actualizar
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}