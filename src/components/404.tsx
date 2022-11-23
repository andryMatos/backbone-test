import { Container, IconButton, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import error from '../img/error-404.webp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const NotFound = () => {

    return(
        <Container component="main">
            <Tooltip title="Regresar">
                <Link to={"/"}>
                    <IconButton color="primary" tabIndex={-1}>
                        <ArrowBackIcon />
                    </IconButton>
                    Volver al inicio
                </Link>
            </Tooltip>
            <img src={error} alt={'Not found'} className="not-found"/>
        </Container>
        );
}