import { setWithExpiry } from "../helpers/LocalStorage";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Body = {
    username: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const body: Body = {
            username: username,
            password: password,
        };

        await axios
            .post<Body>("/login", body)
            .then((res) => {
                setWithExpiry("username", res.data.username, 1);
                navigate("/");
                console.log(res);
            })
            .catch((error: Error | AxiosError) => {
                setAlert(true);
                console.log(error);
            });
    };

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <Box>
                {alert && <Alert severity="error">Invalid username/password</Alert>}
                <Typography component="h5" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        autoFocus
                        autoComplete="username"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                    />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </Box>
            </Box>
            <Typography>
                New to Saturo? <Link to="/user/create">Sign up</Link>
            </Typography>
        </Container>
    );
};

export default Login;
