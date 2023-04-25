import React from "react";
import { Link,useNavigate  } from "react-router-dom";
import {  createTheme,Rating} from "@mui/material";
import { CardContent, Typography, Grid, Tooltip, Fab } from '@mui/material';
import { Stack } from '@mui/system';
import BlankCard from "./BlankCard";
import { IconBasket } from '@tabler/icons-react';

import { saddItemToCart } from "src/actions/cartActions";
import {toast} from 'react-toastify'
const notifys = (message = "") =>
toast.success(message, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});
const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

const Service = ({ service }) => {



 

    
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
    <Grid item sm={12} md={4} lg={3}>
    <BlankCard>
    <Typography component={Link} to={`/service/${service._id}`}>
        <img src={service.images[0].url} height="300px" alt="img" width="250px" />
    </Typography>
    <Tooltip title="View Details" component={Link} to={`/service/${service._id}`}>
        <Fab
            size="small"
            color="primary"
            sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
        >
            <IconBasket size="16" />
            {/* <i class="bi bi-basket2" size="16"></i> */}
        </Fab>
    </Tooltip>
    <CardContent sx={{ p: 3, pt: 2 }}>
        <Typography variant="h6">{service.name}</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
            <Stack direction="row" alignItems="center">
                <Typography variant="h6">${service.price}</Typography>
                <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                ${service.price + 20}
                </Typography>
            </Stack>
            {/* <Rating name="read-only" size="small" value={`${product.ratings/product.numOfReviews}`} readOnly /> */}
        </Stack>
    </CardContent>
</BlankCard>
</Grid>
</div>

  );
};
export default Service;
