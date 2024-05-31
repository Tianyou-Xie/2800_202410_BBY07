import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { App } from './app';

/**
 * Uses the ReactDOM render to render the React web app in the root
 * div element in the file index.html.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
