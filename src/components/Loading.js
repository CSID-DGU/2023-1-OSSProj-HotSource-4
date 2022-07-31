import React from 'react';
import { Box, Typography } from '@mui/material';

const Loading = () => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Typography
                variant='h2'
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                Loading..
            </Typography>
        </Box>
    );
};

export default Loading;
