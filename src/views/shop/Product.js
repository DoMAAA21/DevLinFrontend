import React from "react";
import { Link,useNavigate  } from "react-router-dom";
import {  createTheme,Rating} from "@mui/material";
import { CardContent, Typography, Grid, Tooltip, Fab } from '@mui/material';
import { Stack } from '@mui/system';
import BlankCard from "./BlankCard";
import { IconBasket } from '@tabler/icons-react';
// import { Button } from 'semantic-ui-react'

 
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
//   const [value, setValue] = React.useState<5 | null>(2);

//   let navigate = useNavigate();
const Product = ({ product }) => {

    // let navigate = useNavigate(); 
    // const routeChange = () =>{ 
    //   let path = `newPath`; 
    //   navigate(path);
    // }

    
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
    <Grid item sm={12} md={4} lg={3}>
    <BlankCard>
    <Typography component={Link} to={`/shop/${product._id}`}>
        <img src={product.images[0].url} height="300px" alt="img" width="250px" />
    </Typography>
    <Tooltip title="View Details  " component={Link} to={`/shop/${product._id}`}>
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
        <Typography variant="h6">{product.name}</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
            <Stack direction="row" alignItems="center">
                <Typography variant="h6">${product.price}</Typography>
                <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                ${product.price + 20}
                </Typography>
            </Stack>
            <Rating name="read-only" size="small" value={`${product.ratings/product.numOfReviews}`} readOnly />
        </Stack>
    </CardContent>
</BlankCard>
</Grid>
</div>

  );
};
export default Product;
