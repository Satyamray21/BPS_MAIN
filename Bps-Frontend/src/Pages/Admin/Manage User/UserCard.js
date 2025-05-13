import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const cardData = [
  { title: 'Icon_Order', value: '0', subtitle: 'supervisor', duration: '30 days' },
  { title: 'Icon_Order', value: '0', subtitle: 'Deactive supervisor', duration: '30 days' },
  { title: 'Icon_Order', value: '0', subtitle: 'Blacklisted supervisor', duration: '30 days' },
  { title: 'Icon_Order', value: '0', subtitle: 'Admin', duration: '30 days' },
];

const UserCard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ minHeight: 140, display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', alignItems: 'center', 
              textAlign: 'center', p: 2 }}>
              <CardContent>
                <ShoppingCartIcon fontSize="large" color="primary" />
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="h4">{card.value}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>{card.subtitle}</Typography>
                <Typography variant="body2" color="text.secondary">({card.duration})</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserCard;
