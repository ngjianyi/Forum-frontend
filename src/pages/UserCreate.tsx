import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Body = {
    username: string;
    password: string;
    password_confirmation: string;
};

const UserCreate: React.FC = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState<boolean>(false);
    const [alert_messsage, setAlertMessage] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password_confirmation, setPasswordConfirmation] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== password_confirmation) {
            setAlert(true);
            setAlertMessage("Passwords do not match");
            return;
        }

        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        let errorMessage = "";
        if (password.length < minLength) {
            errorMessage += `Password must be at least ${minLength} characters long. \n`;
        }
        if (!hasUpperCase) {
            errorMessage += "Password must contain at least one uppercase letter. \n";
        }
        if (!hasLowerCase) {
            errorMessage += "Password must contain at least one lowercase letter. \n";
        }
        if (!hasNumber) {
            errorMessage += "Password must contain at least one number. \n";
        }

        if (errorMessage) {
            setAlert(true);
            setAlertMessage(errorMessage);
        } else {
            const body: Body = {
                username: username,
                password: password,
                password_confirmation: password_confirmation,
            };
            await axios
                .post<Body>("/users", body)
                .then((res) => {
                    navigate("/login");
                    console.log(res);
                })
                .catch((error: Error | AxiosError) => {
                    setAlert(true);
                    setAlertMessage("Invalid username");
                    console.log(error);
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            {alert && <Alert severity="error">{alert_messsage}</Alert>}
            <Box>
                <Typography component="h1" variant="h5">
                    Create a profile
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
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password_confirmation"
                        label="Retype password"
                        type="password"
                        id="password_confirmation"
                        value={password_confirmation}
                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Create profile
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default UserCreate;
