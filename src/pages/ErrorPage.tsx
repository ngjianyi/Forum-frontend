import React from "react";
import { Link } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";

const ErrorPage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" component="h4">
                It seems the page you are looking for does not exist...
            </Typography>
            <Link to={"/"}>
                <Button variant="contained" color="primary">
                    Back to safety!
                </Button>
            </Link>
        </Container>
    );
};

export default ErrorPage;
