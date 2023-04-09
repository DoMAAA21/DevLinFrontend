import React from "react";
import { Link,useNavigate  } from "react-router-dom";
import {  Button,createTheme,ThemeProvider,Rating} from "@mui/material";
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
      <div className="card p-3 rounded">
      <div class="badge bg-success text-white position-absolute" >Sale</div>
        <img className="card-img-top mx-auto" height="250px" width ="250px" src={product.images[0].url} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
        
            <a href={`/shop/${product._id}`}>{product.name}</a>
         
          </h5>
          {/* <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} reviews)</span>
          </div> */}
          {/* console.log(`${(product.ratings / 5) * 100}`) */}
          <Rating name="half-rating" defaultValue={`${product.ratings/product.numOfReviews}`} precision={2.5} readOnly/>
          <span id="no_of_reviews">({product.numOfReviews} reviews)</span>
          {/* <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /> */}
          <p className="card-text">${product.price}</p>
          
          <ThemeProvider theme={theme}>
           <Button variant="contained" 
           component={Link}
           color="primary"
           to={`/shop/${product._id}`}
           
           >
            View Details</Button>

            {/* <Button variant="contained" >Primary</Button>
      <Button color="secondary" variant="contained" >Secondary</Button> */}
            </ThemeProvider>


        
        </div>
      </div>
    </div>
  );
};
export default Product;
