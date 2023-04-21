// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'userlist',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'order',
    path: '/dashboard/orders',
    icon: icon('ic_orders'),
  },
  {
    title: 'reviews',
    path: '/dashboard/reviews',
    icon: icon('ic_stars'),
  },
 
];

export default navConfig;
