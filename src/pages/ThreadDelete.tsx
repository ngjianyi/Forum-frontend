import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Box, Container, Button, Typography, Alert } from "@mui/material";

const ThreadDelete: React.FC = () => {
    const location = useLocation();
    const { thread } = location.state;
    const navigate = useNavigate();

    const [alert, setAlert] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await axios
            .delete(`/forum_threads/${thread.id}`)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
                setAlert(true);
            });
    };

    return (
        <Container component="main" maxWidth="md">
            <Box>
                {alert && <Alert severity="error">You are not authorised to delete this thread</Alert>}
                <Typography variant="h6" component="h6">
                    {"Are you sure you want to delete the thread: '" + thread.title + "' ?"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Button type="submit" variant="contained" color="error">
                        Delete thread
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ThreadDelete;
