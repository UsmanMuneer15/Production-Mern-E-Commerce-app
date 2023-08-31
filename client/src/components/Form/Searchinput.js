import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Searchinput() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("./search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex" role="search" onSubmit={hanldeSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default Searchinput;
