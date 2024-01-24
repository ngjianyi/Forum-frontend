import { getWithExpiry } from "../helpers/LocalStorage";
import Comment from "../types/Comment";
import React, { useState, MouseEvent } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Box, Card, CardContent, TextField, Typography, Button, Alert } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

type Props = {
    full_comment: { comment: Comment; author: string };
    updateComments: () => void;
};

type Body = {
    content: string;
};

const CommentItem: React.FC<Props> = ({ full_comment, updateComments }) => {
    const params = useParams();
    const stored_username = getWithExpiry("username");
    const [alert, setAlert] = useState<boolean>(false);
    const [editable, setEditable] = useState<boolean>(false);

    const [content, setContent] = useState<string>(full_comment.comment.content);

    // Edit/Delete menu logic
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        setEditable(!editable);
    };

    const url = `/forum_comments/${full_comment.comment.id}`;

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body: Body = {
            content: content,
        };

        await axios
            .patch(url, body)
            .then((res) => {
                console.log(res);
                updateComments();
                setEditable(false);
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
                setAlert(true);
                setEditable(false);
                handleClose();
            });
    };

    const handleDelete = async () => {
        await axios
            .delete(url)
            .then((res) => {
                console.log(res);
                updateComments();
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
                setAlert(true);
                handleClose();
            });
    };

    return (
        <Card>
            {params.id ? (
                // Under thread page
                <>
                    {alert && <Alert severity="error">You are not authorised to perform this action</Alert>}
                    {editable ? (
                        <Box component="form" onSubmit={handleUpdate} noValidate>
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
                                onChange={(event) => setContent(event.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Update comment
                            </Button>
                        </Box>
                    ) : (
                        <CardContent>
                            <Typography>{full_comment.comment.content}</Typography>

                            <Typography>
                                By: <Link to={`/profile/${full_comment.author}`}>{full_comment.author}</Link>
                            </Typography>
                        </CardContent>
                    )}

                    {!editable && stored_username === full_comment.author && (
                        <Button
                            id="more-actions-button"
                            aria-controls={open ? "more-actions-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            variant="text"
                            disableElevation
                            onClick={handleClick}
                        >
                            <MoreHorizIcon />
                        </Button>
                    )}
                    <Menu
                        id="more-actions-menu"
                        MenuListProps={{
                            "aria-labelledby": "more-actions-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleEdit}>
                            <EditIcon />
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                            <DeleteIcon />
                            Delete
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                // Under profile page
                <CardContent>
                    <Typography>{full_comment.comment.content}</Typography>
                    <Link to={`/thread/${full_comment.comment.forum_thread_id}`}>
                        <Button variant="contained">Go to thread</Button>
                    </Link>
                </CardContent>
            )}
        </Card>
    );
};

export default CommentItem;
