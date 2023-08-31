import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
function Search() {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="conttainer">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found${values?.results.length}`}
          </h6>

          <div className="d-flex flex-wrap mt-4">
            {/* {JSON.stringify(radio, null, 4)} */}
            {values.results?.map((p) => (
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
                  <p className="card-text">${p.price}</p>
                  <button className="btn btn-primary m-2">More Details</button>
                  <button className="btn btn-secondary ">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
