import { Skeleton, Typography, TablePagination, TableHead, Paper, Box, TableContainer, Table, TableBody, TableRow, TableCell, Tooltip, IconButton, InputBase } from "@mui/material"
import { useEffect, useState } from "react";
import { ContactsResponse } from "../../interfaces/apiInterface";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

export const Contacts = () => {

    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ContactsResponse>();
    const [total, setTotal] = useState<number>(10);
    const [inputSearch, setInputSearch] = useState<string>("");
    const skeletonArray = Array(10).fill('');


    const handleChangePage = (event: unknown, newPage: number) => {
        setLoading(true);

        setPage(newPage);
        const currentPage = page + 1;
        const request$ =
        fetch('https://bkbnchallenge.herokuapp.com/contacts?page='+ currentPage)

        request$
            .then(async(statusResponse) => {
                let response;
                if(statusResponse.ok){
                    try{
                        response = await statusResponse.clone().json();
                        setData(response);
                        return response;
                    }catch(error){
                        response = await statusResponse.text();
                        return response;
                    }
                }else{
                }
            })
            .then((res) =>{
                setTotal(res.count);
                setData(res);

            })
            .catch((error) => {
                setLoading(false);
            })
            .finally(() =>{
                setLoading(false);
            });
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setInputSearch(e.target.value);
    }

    const getContactByName = () => {
        const request$ =
        fetch('https://bkbnchallenge.herokuapp.com/contacts?firstName_contains='+ inputSearch)

        request$
            .then(async(statusResponse) => {
                let response;
                if(statusResponse.ok){
                    try{
                        response = await statusResponse.clone().json();
                        setData(response);
                        return response;
                    }catch(error){
                        response = await statusResponse.text();
                        return response;
                    }
                }else{
                }
            })
            .then((res) =>{
                setTotal(res.count);
                setData(res);

            })
            .catch((error) => {
                setLoading(false);
            })
            .finally(() =>{
                setLoading(false);
            });
    }

    useEffect(() => {
        setLoading(true);

        const abortController = new AbortController();
        const getData = async () => {
            const signal = abortController.signal;
            try{
                const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts?_sort=createdAt:DESC', { method: 'GET', signal: signal });
                if(response.ok){
                    try{
                        const json = await response.clone().json();
                        setData(json);
                        setTotal(json.count);
                        setLoading(false);
                        return json;
                    }catch(error){
                        const json = await response.text();
                        setLoading(false);
                        return json;
                    }                }
            }catch(error){
                setLoading(false);
            }
        }

        getData();

        return () => {
            abortController.abort();
        }

    },[])

    return(
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                        >
                        Lista de Contactos
                    </Typography>
                    <div className="search-input">
                        <Tooltip title="Agregar">
                            <Link to={"/contacts/create"}>
                                <IconButton size="large" color="warning" type="button" sx={{ p: '10px', mx: '10px' }} aria-label="add">
                                    <PersonAddIcon fontSize="inherit" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Paper
                            component="form"
                            elevation={3}
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 350 }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Buscar contactos por nombre"
                                inputProps={{ 'aria-label': 'Buscar contacto por nombre' }}
                                onChange={handleChangeSearch}
                            />
                            <IconButton onClick={() => getContactByName()} type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            stickyHeader
                        >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">
                                    Nombre
                                </TableCell>
                                <TableCell align="left">Apellido</TableCell>
                                <TableCell align="left">Correo</TableCell>
                                <TableCell align="left">Telefono</TableCell>
                                <TableCell align="left">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading && skeletonArray.map((item, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell align="right">
                                            <Skeleton/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Skeleton/>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                                {
                                    data?.results.map((row, index) => {
                                        return(
                                            <TableRow
                                                hover
                                                key={row.id}
                                            >
                                                <TableCell align="left">{row.firstName}</TableCell>
                                                <TableCell align="left">{row.lastName}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.phone}</TableCell>
                                                <TableCell align="left">
                                                    <Tooltip title="Detalles">
                                                        <Link to={"/contacts/"+ row.id}>
                                                            <IconButton color="primary" tabIndex={-1}>
                                                                <VisibilityIcon/>
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="Actualizar">
                                                        <Link to={"/contacts/" + row.id +"/update"}>
                                                            <IconButton color="success" tabIndex={-1}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="Eliminar">
                                                        <Link to={"/contacts/" + row.id +"/delete"}>
                                                            <IconButton color="error" tabIndex={-1}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={total}
                        rowsPerPage={10}
                        page={page}
                        onPageChange={handleChangePage}
                        />
                </Paper>
            </Box>
    )
}