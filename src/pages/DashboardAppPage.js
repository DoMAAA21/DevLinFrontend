import React, { Fragment, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import {Link} from 'react-router-dom'
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useDispatch, useSelector } from 'react-redux'
import { userSales,allUsers } from '../actions/userActions'
import { monthlySalesChart, productSalesChart } from '../actions/chartActions'
import ProductSalesChart from '../views/charts/ProductSalesChart';
import MonthlySalesChart from '../views/charts/MonthlySalesChart';
import UserSalesChart from '../views/charts/UserSalesChart';
import { getAdminProducts } from '../actions/productActions'
import { allOrders } from '../actions/orderActions'

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const dispatch = useDispatch();
 
  const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
  const { productSales } = useSelector(state => state.productSales)
  const { salesPerMonth } = useSelector(state => state.salesPerMonth)
  const { customerSales } = useSelector(state => state.customerSales)
  // console.log(productSales)

  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(allOrders())
    dispatch(allUsers())
    dispatch(userSales())
    dispatch(monthlySalesChart())
    dispatch(productSalesChart())

}, [dispatch])

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Sales" total={totalAmount && totalAmount.toFixed(2)} icon={'ph:currency-circle-dollar-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <AppWidgetSummary title="Products" total={products && products.length} color="info" icon={'material-symbols:laptop-mac-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <AppWidgetSummary  title="Item Orders" total={orders && orders.length} color="warning" icon={'icon-park-solid:transaction'} />
          
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users" total={users && users.length} color="error" icon={'ph:users-four-fill'} />
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
          <ProductSalesChart data={productSales} />
          </Grid>
      
        
                         

          <Grid item xs={12} md={6} lg={5}>
           
          <UserSalesChart data={customerSales} />
    
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
          <MonthlySalesChart data={salesPerMonth} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
