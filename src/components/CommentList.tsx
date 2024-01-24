import CommentItem from "./CommentItem";
import CommentCreate from "./CommentCreate";
import { getWithExpiry } from "../helpers/LocalStorage";
import Comment from "../types/Comment";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { Typography } from "@mui/material";

type full_comment = {
    comment: Comment;
    author: string;
};

const CommentList: React.FC = () => {
    const params = useParams();
    const stored_username = getWithExpiry("username");

    const [comments, setComments] = useState<never[]>([]);

    const updateComments = async () => {
        const url = params.id ? `/comments_filter_thread/${params.id}` : `/comments_filter_user/${params.username}`;
        await axios
            .get(url)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });
    };

    useEffect(() => {
        updateComments();
    }, [params.id, params.username]);

    const no_comments: JSX.Element = <Typography>No comments available</Typography>;
    const all_comments: JSX.Element[] = comments.map((full_comment: full_comment) => (
        <CommentItem full_comment={full_comment} updateComments={updateComments} key={full_comment.comment.id} />
    ));

    return (
        <>
            {comments.length > 0 ? all_comments : no_comments}
            {params.id ? (
                // Under thread page
                <>
                    {stored_username ? (
                        <CommentCreate updateComments={updateComments} thread_id={parseInt(params.id)} />
                    ) : (
                        <Typography>Log in to post a comment!</Typography>
                    )}
                </>
            ) : (
                // Under profile page
                <></>
            )}
        </>
    );
};

export default CommentList;
