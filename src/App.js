import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import Container from './components/layout/Container';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import NewProject from './components/pages/NewProjects';
import Project from './components/pages/Project';
import Products from './components/pages/Products';
import Contact from './components/pages/Contact';
import NewProduct from './components/pages/NewProduct';

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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
