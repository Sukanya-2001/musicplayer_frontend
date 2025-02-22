'use client';

import Image from 'next/image';
import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import assest from '@/json/assest';

const Banner: React.FC = () => {
  return (
    <Box position="relative" width="100%" height={{ xs: 400, md: 500 }} display="flex" alignItems="center" bgcolor="black" color="white" overflow="hidden">
      {/* Background Image */}
      <Box position="absolute" top={0} left={0} width="100%" height="100%" zIndex={1}>
        <Image 
          src={assest?.banner_img}
          alt="Music Banner" 
          layout="fill" 
          objectFit="cover"
        />
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10}}>
        <Typography variant="h3" fontWeight="bold" fontSize={30}>
          All the <Box component="span" color="rgb(255 14 188)">Best Songs</Box> in One Place
        </Typography>
        <Typography variant="body1" color="gray" mt={2} sx={{maxWidth:"500px"}}>
          On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality and enjoy without interruptions.
        </Typography>
        <Box mt={4} display="flex" gap={2}>
          <CustomButtonPrimary variant="contained" color="primary" sx={{ px: 2, py: 1.5 }}>
            Discover Now
          </CustomButtonPrimary>
          <CustomButtonPrimary variant="outlined" color="primary" sx={{ px: 2, py: 1.5 }}>
            Create Playlist
          </CustomButtonPrimary>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
