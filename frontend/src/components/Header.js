import React from 'react'
import { Link } from "react-router-dom"
import { Box, Stack } from '@mui/material';
// import UploadIcon from '@mui/icons-material/Upload';
import SearchBar from './SearchBar';
import UploadVideo from './UploadVideo';

const Header = ({ handleSearch, videoDetails }) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            p={2}
            sx={{ position: "sticky", backgroundColor: "#202020", top: 0, justifyContent: "space-between" }}
        >
            <Link to="/">
                <img src="/images/Logo.svg" alt="logo" height={45} />
            </Link>

            {!videoDetails &&
                <SearchBar handleSearch={handleSearch} />
            }


            {/* <Box sx={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#4ca3fc", padding: "8px 16px", cursor: "pointer" }}>
                <UploadIcon />
                <Typography variant="p">Upload</Typography>
            </Box> */}
            <Box>
                <UploadVideo />
            </Box>
        </Stack>
    )
}

export default Header