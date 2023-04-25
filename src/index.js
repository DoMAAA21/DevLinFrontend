import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import './App.css';
import store from "./store";
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_APP_API}>
    <Provider store={store}>

<App />
</Provider>
</GoogleOAuthProvider>
);

// serviceWorker.unregister();
// reportWebVitals();
