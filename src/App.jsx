// Filename: App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './router/AppRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

export default App;