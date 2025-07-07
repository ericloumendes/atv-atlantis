import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRouter from './routes/router';
import { initAcomodacoes } from './services/acomodacoesService';


function App() {
  useEffect(() => {
    initAcomodacoes();  // Initialize Acomodacoes only once when the app starts
}, []);

  return (
    <AppRouter />
  );
}

export default App;
