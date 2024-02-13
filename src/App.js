import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import Container from './components/layout/Container';
import Home from './components/pages/Home';
import Projects from './components/pages/projects/Projects';
import NewProject from './components/pages/projects/NewProjects';
import Project from './components/pages/projects/Project';
import Products from './components/pages/products/Products';
import Product from './components/pages/products/Product';
import Contact from './components/pages/Contact';
import NewProduct from './components/pages/products/NewProduct';

function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/products" element={<Products />} />
          <Route path="/newproduct" element={<NewProduct/>} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
