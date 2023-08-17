import './App.css';
import Nav from './components/nav_bar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/SignUp';
import Product from './components/Product';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import ProductList from './components/ProductList';
import UpdateProduct from './components/updateproduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav></Nav>
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path="" element={<ProductList/>}/>
      <Route path="/add" element={<Product />}/>
      <Route path="/update/:id" element={<UpdateProduct/>}/>
      <Route path="/logout" element={<h1>Logout Component</h1>}/>
      <Route path="/profile" element={<h1>Profile Component</h1>}/>
     </Route>

     <Route path="/signup" element={<SignUp/>}/>
     <Route path="/login" element={<Login/>}/>


    </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
