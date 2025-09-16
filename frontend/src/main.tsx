import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App.tsx';
import './index.css';
// // src/main.tsx or src/index.tsx
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min'; // includes Popper

// // If you're using DataTables:
// import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
