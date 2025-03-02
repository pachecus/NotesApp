import './App.css';
import { NotePage } from './pages/NotePage';
import { EditNotePage } from './pages/EditNotePage'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

// Definition of which components have to be shown depending in which route is being used
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NotePage />} />          
          <Route path="/edit/:id" element={<EditNotePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
