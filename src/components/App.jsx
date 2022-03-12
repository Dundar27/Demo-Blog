import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Header from './Header';
import NoPage from './NoPage';
import Blogs from './Blogs';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<div><Layout /><Header /><Blogs /></div>} />
            <Route path="*" element={<NoPage />} />
        </Routes> 
      </BrowserRouter>
  );
}
export default App;