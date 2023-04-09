import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import { ToastContainer } from 'react-toastify';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';


// ----------------------------------------------------------------------

export default function App() {
  return (
    
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <ToastContainer />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

// import { Routes, Route } from "react-router-dom";
// import UsersList from './views/user/UsersList';
// import AddUser from './views/user/AddUser';

// function App() {
//   return (
  
//     <div className="App">
      
//         <Routes>
//           <Route path="/admin/users" element={<UsersList />} exact="true" />
//           <Route path="/admin/users/new" element={<AddUser />} exact="true" />
          
//         </Routes>
       
//     </div>
//   );
// }

// export default App;