import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import SuggestByIngredients from "./SuggestByIngredients.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/suggest" element={<SuggestByIngredients />} />
    </Routes>
  </BrowserRouter>
);

