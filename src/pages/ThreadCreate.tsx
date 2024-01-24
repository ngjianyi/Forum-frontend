import Category from "../types/Category";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

type Body = {
    title: string;
    content: string;
    forum_category_id: number;
};

const ThreadCreate: React.FC = () => {
    const navigate = useNavigate();

    const [categoryoptions, setCategoryOptions] = useState<never[]>([]);
    const [alert, setAlert] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [selectedcategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        axios
            .get("/forum_categories")
            .then((response) => {
                setCategoryOptions(response.data);
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });
    }, []);

    const all_categories: JSX.Element[] = categoryoptions.map((category: Category) => (
        <MenuItem value={category.id} key={category.id}>
            {category.name}
        </MenuItem>
    ));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body: Body = {
            title: title,
            content: content,
            forum_category_id: parseInt(selectedcategory),
        };

        await axios
            .post<Body>("/forum_threads", body)
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
        <Container component="main" maxWidth="xs">
            <Box>
                {alert && <Alert severity="error">Please fill up all the information</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        variant="filled"
                        required
                        fullWidth
                        id="content"
                        label="Content"
                        name="content"
                        value={content}
                        multiline
                        rows={5}
                        onChange={(event) => setContent(event.target.value)}
                    />
                    <FormControl required variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="forum_category_id"
                            name="forum_category_id"
                            value={selectedcategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                        >
                            {all_categories}
                        </Select>
                    </FormControl>
                    <Divider />
                    <Button type="submit" variant="contained">
                        Create new thread
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ThreadCreate;
