import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";
function ProductDetails() {
  const params = useParams();
  const [product, setProducts] = useState({});
  const [cart, setCart] = useCart();

  const [relatedproducts, setRelatedproducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get-product/${params.slug}`
      );
      setProducts(data?.product);
      // getSimilarProduct(data?.product._id, data?.product._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar products

  // const getSimilarProduct = async (pid, cid) => {
  //   console.log("params are: ", cid, pid);
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:8000/api/v1/product/related-product/${pid}/${cid}}`
  //     );
  //     setRelatedproducts(data?.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleAddCart = () => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Cart Added Successfully")
  };
  return (
    <Layout>
      <h1>details</h1>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6  product-details-info">
          <h1 className="text-center">Product details</h1>
          <h6>Name:{product.name}</h6>
          <h6>Description:{product.description}</h6>
          <h6>Price $:{product.price}</h6>
          <h6>Category:{product.category?.name}</h6>
          <button className="btn btn-secondary " onClick={handleAddCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
