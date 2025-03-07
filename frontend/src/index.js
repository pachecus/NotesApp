import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NoteProvider } from './context/NoteContext';
import { CategoriesProvider } from './context/CategoriesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NoteProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </NoteProvider>
  </React.StrictMode>
);

