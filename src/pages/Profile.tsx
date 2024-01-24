import ThreadList from "../components/ThreadList";
import CommentList from "../components/CommentList";
import React from "react";
import { useParams } from "react-router-dom";

import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// Thread and comments tabs logic
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Profile: React.FC = () => {
    const params = useParams();

    // Tabs logic
    const [value, setValue] = React.useState(0);
    const handleChangetabs = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const profile_threads = <ThreadList filtered_url={`/threads_filter_user/${params.username}`} />;
    const profile_comments = <CommentList />;

    return (
        <Container>
            <Typography variant="h3">{params.username}</Typography>

            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChangetabs} aria-label="basic tabs example">
                        <Tab label="Threads" {...a11yProps(0)} />
                        <Tab label="Comments" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {profile_threads}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {profile_comments}
                </CustomTabPanel>
            </Box>
        </Container>
    );
};

export default Profile;
