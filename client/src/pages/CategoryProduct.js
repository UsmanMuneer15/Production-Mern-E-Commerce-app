import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

function CategoryProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);
  const getProductByCat = async () => {
    try {
      axios
        .get(
          `http://localhost:8000/api/v1/product/product-category/${params.slug}`
        )
        .then((data) => {
          console.log(data.data);
          setProducts(data.data?.products);
          setCategory(data.data?.category);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container text-center mt-3">
        <h4 className="text-center">{category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
      </div>
      <div className="container justify-content-center">
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <div className="card m-2 " style={{ width: "18rem" }}>
              <img
                style={{ height: "200px" }}
                src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text">$:{p.price}</p>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => navigate(`/details/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary "
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Cart Added Successfully");
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProduct;
