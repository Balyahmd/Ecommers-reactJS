import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    console.log("Sedang fetching");
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-project.amandemy.co.id/api/final/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      console.log("Fetching selesai");
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    } finally{
        setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        products: products,
        setProducts: setProducts,
        fetchProducts: fetchProducts,
        loading: loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
