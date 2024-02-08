import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Shop from "./Pages/Shop";
import Footer from "./Components/Footer/Footer";
import aaleeyah_banner from './Components/Assets/Banner-AALEEYAH.png';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop/>} />
          <Route path="/khimar" element={<ShopCategory banner={aaleeyah_banner} category="khimar"/>} />
          <Route path="/product" element={<Product/>}>
            <Route path=':productId' element={<Product/>} />
          </Route>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<LoginSignup/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
