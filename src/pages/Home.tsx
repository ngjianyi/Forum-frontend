import { getWithExpiry } from "../helpers/LocalStorage";
import ThreadList from "../components/ThreadList";
import React from "react";
import { Link } from "react-router-dom";

import { Button, Container } from "@mui/material";

const Home: React.FC = () => {
    const stored_username = getWithExpiry("username");

    return (
        <Container>
            {stored_username && (
                <Link to={"/thread/create"}>
                    <Button variant="contained" color="primary">
                        Create a new thread
                    </Button>
                </Link>
            )}

            <ThreadList filtered_url={null} />
        </Container>
    );
};

export default Home;
