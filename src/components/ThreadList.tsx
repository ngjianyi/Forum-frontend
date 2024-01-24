import ThreadItem from "./ThreadItem";
import Category from "../types/Category";
import Thread from "../types/Thread";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = {
    filtered_url: string | null;
};

type full_thread = { thread: Thread; author: string; category: string };

const ThreadList: React.FC<Props> = ({ filtered_url }) => {
    const [category_options, setCategoryOptions] = useState<never[]>([]);
    const [data, setData] = useState<full_thread[]>([]); // All threads

    const [category_label, setCategoryLabel] = useState<string>("Categories");
    const [threads, setThreads] = useState<full_thread[]>([]); // Filtered threads

    // Filters
    const [search, setSearch] = useState<string>("");
    const [selectedcategory, setSelectedCategory] = useState<number>(0);

    // Category menu logic
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const url: string = "/forum_threads";
    useEffect(() => {
        axios
            .get(filtered_url ? filtered_url : url)
            .then((response) => {
                setData(response.data);
                setThreads(response.data);
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });
    }, []);

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

    const handleFilter = (category_id: number, query: string) => {
        let filtered_threads = data;
        if (category_id) {
            filtered_threads = filtered_threads.filter(
                (thread: full_thread) => thread.thread.forum_category_id === category_id,
            );
        }
        if (query) {
            filtered_threads = filtered_threads.filter(
                (thread: full_thread) =>
                    thread.thread.title.includes(query.toLowerCase()) ||
                    thread.thread.content.includes(query.toLowerCase()),
            );
        }
        setThreads(filtered_threads);
    };

    const all_categories: JSX.Element[] = category_options.map((category: Category) => (
        <MenuItem
            key={category.id}
            onClick={() => {
                setSelectedCategory(category.id);
                setCategoryLabel(category.name);
                setAnchorEl(null);
                handleFilter(category.id, search);
            }}
            disableRipple
        >
            {category.name}
        </MenuItem>
    ));

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearch(event.target.value);
        handleFilter(selectedcategory, event.target.value);
    };

    const no_threads: JSX.Element = <Typography>No threads available</Typography>;

    return (
        <>
            <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {category_label}
            </Button>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        setSelectedCategory(0);
                        setCategoryLabel("Categories");
                        setAnchorEl(null);
                        handleFilter(0, search);
                    }}
                    disableRipple
                >
                    --
                </MenuItem>
                {all_categories}
            </Menu>
            <TextField
                margin="normal"
                fullWidth
                id="query"
                label="Search"
                name="search"
                value={search}
                onChange={handleChange}
            />
            {threads.length > 0 ? (
                <>
                    {threads.map((full_thread: full_thread) => (
                        <ThreadItem full_thread={full_thread} indivthread={false} key={full_thread.thread.id} />
                    ))}
                </>
            ) : (
                no_threads
            )}
        </>
    );
};

export default ThreadList;
