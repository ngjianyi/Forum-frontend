import { getWithExpiry } from "../helpers/LocalStorage";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
    const navigate = useNavigate();
    const stored_username = getWithExpiry("username");

    // Profile menu logic
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = async () => {
        await axios
            .get("/logout", { withCredentials: true })
            .then((res) => {
                localStorage.removeItem("username");
                console.log(res);
                handleMenuClose();
            })
            .catch((error: Error | AxiosError) => {
                console.log(error);
            });

        navigate("/");
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to={`/profile/${stored_username}`}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <>
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <Link to={`/profile/${stored_username}`}>
                    <MenuItem onClick={handleMobileMenuOpen}>
                        <IconButton
                            size="small"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="secondary"
                        >
                            <AccountCircle />
                        </IconButton>
                        <p>Profile</p>
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                    <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="primary"
                    >
                        <LogoutIcon />
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            </Menu>
        </>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={"/"}>
                        <Box>
                            <Typography sx={{ color: "#F2ECF8" }}>SATORU</Typography>
                        </Box>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <Link to={"/about"}>
                            <Box sx={{ mx: 1 }}>
                                <Typography sx={{ color: "#F2ECF8" }}>About</Typography>
                            </Box>
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        {stored_username ? (
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="secondary"
                            >
                                <AccountCircle />
                                <Typography sx={{ color: "white", mx: 0.5 }}>{stored_username}</Typography>
                            </IconButton>
                        ) : (
                            <Link to="/login">
                                <Button variant="contained" color="secondary">
                                    Log In
                                </Button>
                            </Link>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        {stored_username ? (
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="primary"
                            >
                                <MoreIcon />
                            </IconButton>
                        ) : (
                            <Link to="/login">
                                <Button variant="contained" color="secondary">
                                    Log In
                                </Button>
                            </Link>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default Header;
