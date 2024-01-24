import Category from "../types/Category";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

type Body = {
    title: string;
    content: string;
    forum_category_id: number;
};

const ThreadUpdate: React.FC = () => {
    const location = useLocation();
    const { thread } = location.state;
    const navigate = useNavigate();

    const [alert, setAlert] = useState<boolean>(false);
    const [categoryoptions, setCategoryOptions] = useState<never[]>([]);

    const [title, setTitle] = useState<string>(thread.title);
    const [content, setContent] = useState<string>(thread.content);
    const [selectedcategory, setSelectedCategory] = useState<string>(String(thread.forum_category_id));

    useEffect(() => {
        const url = "/forum_categories";
        axios
            .get(url)
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
        const url = `/forum_threads/${thread.id}`;
        const body: Body = {
            title: title,
            content: content,
            forum_category_id: parseInt(selectedcategory),
        };

        await axios
            .patch<Body>(url, body)
            .then((res) => {
                navigate("/");
                console.log(res);
            })
            .catch((error: Error | AxiosError) => {
                setAlert(true);
                console.log(error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box>
                {alert && <Alert severity="error">You are not authorised to update this thread</Alert>}
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
                    <FormControl required variant="filled" sx={{ m: 1, minWidth: 40 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            value={selectedcategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                        >
                            {all_categories}
                        </Select>
                    </FormControl>
                    <Divider />
                    <Button type="submit" variant="contained">
                        Update thread
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ThreadUpdate;
