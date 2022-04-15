import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material/styles';
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);