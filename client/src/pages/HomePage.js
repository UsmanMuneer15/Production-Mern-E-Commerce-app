import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import "../styles/homepage.css";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";

function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [radio, setRadio] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useCart();

  //get all categories

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        "http://localhost:8000/api/v1/product/get-product"
      );
      setLoading(false);
      setProducts(data.data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //filter by cate

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllCategories();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //filtered product

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <img src="/images/banner.png" className="banner-img" width={"100%"} >
      </img>
      <div className="container home-page">
        <div className="row mt-3">
          <div className="col-md-2 filters  ">
            <h4 >Filter by Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/* price filter */}
            {/* <h4 className="text-center mt-4">Filter by Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div> */}
            <div className=" flex-column">
              <button
                className="btn btn-outline-dark"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-10">
            <h1 className="text-center">All Products</h1>

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
                    <p className="card-text ">
                      {p.description.substring(0, 20)}
                    </p>
                    <p className=" card-title card-price ">$:{p.price}</p>
                    <div className="card-name-price">

                    <button
                      className="btn btn-primary m-2"
                      onClick={() => navigate(`/details/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary m-2"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Items Added To card");
                      }}
                    >
                      Add To Cart
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading...." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default HomePage;
