import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../components/hooks/useCategory";
function Categories() {
  const categories = useCategory();
  return (
    <Layout>
      <div className="container">
        <div className="row mt-3">
          {categories?.map((c) => (
            <div className="col-md-6 " key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn cat-btn">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
