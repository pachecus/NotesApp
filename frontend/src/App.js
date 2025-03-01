import './App.css';
import { NotePage } from './pages/NotePage';
import { EditNotePage } from './pages/EditNotePage'; // Importamos la nueva página de edición
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambié Switch por Routes

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Ruta para la página principal de notas */}
          <Route path="/" element={<NotePage />} />
          
          {/* Ruta para la página de edición de notas, con el id como parámetro */}
          <Route path="/edit/:id" element={<EditNotePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
