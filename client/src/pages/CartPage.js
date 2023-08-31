import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { token } from "morgan";

export const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  const [loading, setLoading] = useState(false);

  const [able, setAble] = useState(false);
  //totla price

  const [totalCartPrice, setTotalCartPrice] = useState(0); // State for total price

  // Function to calculate total price based on cart contents
  const calculateTotalPrice = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalCartPrice(calculatedTotalPrice);
  }, [cart]);

  //remove cartitem

  // const removeCartItem = (pid) => {
  //   try {
  //     const myCart = [...cart];
  //     let index = myCart.findIndex((item) => item._id === pid);
  //     myCart.splice(index, 1);
  //     setCart(myCart);
  //     localStorage.getItem("cart", JSON.stringify(myCart));
  //     toast.success("Cart deleted Successfully");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid); // Filter out the item to be removed
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage

      toast.success("Cart item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (!updatedCart.some((item) => item._id === productId)) {
      updatedCart.push({ _id: productId, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Function to decrease the quantity of a cart item
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    // Load cart from local storage when component mounts
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  //get payment gatewy token

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const hanldePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("auth")).token,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/create-order");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `you have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Plz Login to Checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row">
                <div className="col-md-4 ">
                  <img
                    style={{ height: "200px" }}
                    src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Price $: {p.price}</p>
                  <p>Total Price $:{p.price * p.quantity}</p>

                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => decreaseQuantity(p._id)}
                      disabled={p.quantity<=1}
                    >
                      -
                    </button>
                    <p>Quantity: {p.quantity}</p>
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => increaseQuantity(p._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger mb-2 "
                    onClick={() => removeCartItem(p._id)}
                    
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | CheckOut | Payment</p>
            <hr />
            <h4>Total:{calculateTotalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/create-profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/create-profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={hanldePayment}
                    disabled={!instance || !auth?.user?.address}
                  >
                    {loading ? "processing" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
