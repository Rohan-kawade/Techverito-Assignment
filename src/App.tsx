import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductListContainer from "./Components/ProductContainer/ProductsListContainer";
import Header from "./Components/Header/Header";

function App() {
  const DefaultView = () => {
    return (
      <>
        <h1>HELLO TECHVERITO</h1>
        <Link to={"products"}>See All Products</Link>
      </>
    );
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DefaultView />} />
        <Route path="/products" element={<ProductListContainer />} />
        {/* Inorder to use same context Provider doing this */}
        <Route path="/cart" element={<ProductListContainer />} />
      </Routes>
    </>
  );
}

export default App;
