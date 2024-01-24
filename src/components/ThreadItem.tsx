import Thread from "../types/Thread";
import React from "react";
import { Link } from "react-router-dom";

import { Box, Card, Divider, CardContent, Typography } from "@mui/material";

type Props = {
    full_thread: { thread: Thread; author: string; category: string };
    indivthread: boolean;
};

const ThreadItem: React.FC<Props> = ({ full_thread, indivthread }) => {
    const title = (
        <>
            <Typography variant="h5" component="h5">
                {full_thread.thread.title}
            </Typography>
        </>
    );

    return (
        <Card>
            <CardContent>
                {indivthread ? <>{title}</> : <Link to={`/thread/${full_thread.thread.id}`}>{title}</Link>}
                {indivthread && (
                    <Typography variant="h6" component="h6">
                        {full_thread.thread.content}
                    </Typography>
                )}
                <Divider />
                <Box>
                    <Typography>Under: {full_thread.category}</Typography>
                    {indivthread && (
                        <Typography>
                            By: <Link to={`/profile/${full_thread.author}`}>{full_thread.author}</Link>
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ThreadItem;
