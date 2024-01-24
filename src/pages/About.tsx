import React from "react";
import { Link } from "react-router-dom";

import { Button, Container, Typography } from "@mui/material";

const About: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" component="h4">
                {'Satoru (さとる, サトル) is a Japanese verb meaning "to know" or "understand"'}
            </Typography>
            <Link to={"/"}>
                <Button variant="contained" color="primary">
                    I understand now
                </Button>
            </Link>
        </Container>
    );
};

export default About;
